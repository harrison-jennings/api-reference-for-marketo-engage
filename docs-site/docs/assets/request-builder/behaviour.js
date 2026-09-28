/**
 * Marketo-specific response behaviour.
 *
 * mock.js builds a response from the schema alone. Marketo's schemas describe
 * every property a record type can have in any context, and cannot list
 * instance-specific fields at all, so a schema-only mock differs from what a
 * real call returns. This module adjusts a successful mock to reflect the
 * request, using behaviour stated in the specification's own descriptions and
 * enums, and in Marketo's REST API documentation:
 *
 * 1. Record count: one record per `input` item for writes, per `filterValues`
 *    value, or per `id` in an id-list parameter; one record for operations on
 *    a single resource (lookups by path ID, bulk jobs, campaigns); capped by
 *    `batchSize`.
 * 2. Identity: records echo the IDs the request names (path parameters, `id`
 *    list, `input` item IDs, the `filterType` field) and `seq` is the position.
 * 3. Fields: reads with a `fields` parameter return the requested fields, or
 *    the documented default fields when none are requested. Custom fields
 *    work the same way.
 * 4. Context-only properties: `reason`/`reasons` are omitted from successful
 *    records ("why an operation did not succeed"), properties documented as
 *    "Only returned via <operation>" appear only on that operation, and reads
 *    omit the operation `status` that only write results carry.
 *    Asset API form writes (create, update, clone) return the one asset with
 *    the submitted values, e.g. name and folder.
 * 5. Status: write results use the status for the operation, e.g. `updated`
 *    for action=updateOnly, `deleted` for deletes, `added` for list additions,
 *    limited to the values the schema allows. Bulk jobs use the job status the
 *    description lists for the operation (`Queued` after enqueue).
 */

import { isPlainObject } from "./schema.js";
import { generateResponseMock, generateMock, isIdName, mockString } from "./mock.js";

/**
 * Default fields for record models whose read operations don't all document
 * them. Lead defaults are stated on Get Lead by Id and Get Leads By List Id,
 * and apply to every lead read.
 */
const MODEL_DEFAULT_FIELDS = {
  Lead: ["email", "updatedAt", "createdAt", "lastName", "firstName", "id"],
};

/** Placeholder names in default-field descriptions that are not field names. */
const NON_FIELD_TOKENS = new Set(["dedupefields"]);

const OPERATION_STATUSES = ["created", "updated", "deleted", "skipped", "added", "removed"];
const OPERATION_STATUS_DESCRIPTION = /status of the operation performed on the record/i;
const ONLY_RETURNED_VIA = /only returned via (.+?)\.?\s*$/i;
const FAILURE_ONLY = /did not succeed/i;

// ---------------------------------------------------------------------------
// Reading the request
// ---------------------------------------------------------------------------

/** Values of a query parameter, splitting comma-separated lists. */
export function queryList(request, name) {
  return request.query
    .filter(([key]) => key === name)
    .flatMap(([, value]) => String(value).split(","))
    .map((value) => value.trim())
    .filter(Boolean);
}

/** Field names requested through a "fields" query parameter, without duplicates. */
export function requestedFields(request) {
  return [...new Set(queryList(request, "fields"))];
}

function queryValue(request, name) {
  const pair = request.query.find(([key]) => key === name);
  return pair ? String(pair[1]) : null;
}

/** Documented default fields from a "fields" parameter description. */
export function documentedDefaultFields(description) {
  const text = String(description || "").replace(/\s+/g, " ");
  const match = text.match(/default fields will be returned:\s*(.+?)\.?$/i)
    || text.match(/if unset will return\s+(.+?)\.?$/i)
    || text.match(/if unset\s+(.+?)\s+will be returned/i);
  if (!match) return [];
  return match[1]
    .split(/\s*,\s*|\s+and\s+/)
    .map((name) => name.replace(/^and\s+/i, "").trim())
    .filter((name) => name && !NON_FIELD_TOKENS.has(name.toLowerCase()));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findKey(record, name) {
  const lower = name.toLowerCase();
  return Object.keys(record).find((key) => key.toLowerCase() === lower);
}

/** Convert a request value to the type the record schema declares. */
function typed(value, schema) {
  const type = schema?.type;
  if ((type === "integer" || type === "number") && /^-?\d+(\.\d+)?$/.test(String(value))) return Number(value);
  if (type === "string") return String(value);
  return value;
}

function mockFieldValue(name, index) {
  return isIdName(name) ? 1234 + index : mockString({}, name, index);
}

const PAGINATION_PARAMETERS = /^(batchSize|nextPageToken|offset|maxReturn)$/;
const CREATES_ONE_JOB = /\/(create|import)\.json$|^\/bulk\/v1\/leads\.json$/;
const DESCRIBE = /\/describe2?\.json$/;
const LOOKUP_BY_NAME = /\/byName\.json$/;
// Clones return a new asset: the path ID is the source, not the result.
const CLONE = /\/clone\.json$/;
// Is Member of List: Marketo documents the per-lead status as memberof or notmemberof.
const MEMBERSHIP_CHECK = /\/ismember\.json$/;

/** The record key a path parameter identifies: the same name, id, or name. */
function pathKey(parameter, properties) {
  if (parameter in properties) return parameter;
  if (isIdName(parameter) && "id" in properties) return "id";
  if (/name$/i.test(parameter) && "name" in properties) return "name";
  if (/name$/i.test(parameter) && "apiName" in properties) return "apiName";
  return null;
}

/**
 * Path parameters that identify the single record an operation returns, as
 * [parameter, record key] pairs: /lead/{leadId}.json, /leads/schema/fields/
 * {fieldApiName}.json, /bulk/v1/leads/export/{exportId}/status.json,
 * /campaigns/{campaignId}/trigger.json. Paginated operations return lists even
 * when their path has a parameter (Get Leads by Program Id), and so do
 * operations whose records don't carry the parameter (Get Dependent Assets).
 */
function singleRecordKeys(operation, properties) {
  if (operation.fields.some((field) => field.in === "query" && PAGINATION_PARAMETERS.test(field.name))) return [];
  return operation.fields
    .filter((field) => field.in === "path")
    .map((field) => [field.name, pathKey(field.name, properties)])
    .filter(([, key]) => key);
}

/** Scalar and JSON form values submitted with an Asset API form body. */
function submittedFormValues(request) {
  if (request.body?.kind !== "form" && request.body?.kind !== "multipart") return [];
  return request.body.fields
    .filter((field) => !field.file)
    .map((field) => {
      try {
        const parsed = JSON.parse(field.value);
        return [field.name, typeof parsed === "object" && parsed !== null ? parsed : field.value];
      } catch {
        return [field.name, field.value];
      }
    });
}

function inputItems(request) {
  const input = request.body?.kind === "json" && isPlainObject(request.body.value) ? request.body.value.input : undefined;
  return Array.isArray(input) ? input : null;
}

function isOperationStatus(schema) {
  return OPERATION_STATUS_DESCRIPTION.test(schema.description || "")
    || (Array.isArray(schema.enum) && schema.enum.length > 0 && schema.enum.every((value) => OPERATION_STATUSES.includes(value)));
}

/**
 * Bulk job status for job operations, from the values listed in the status
 * description: Status of the export job ("Created","Queued","Processing",...).
 */
function jobStatus(operation, description) {
  const values = [...String(description || "").matchAll(/"([A-Za-z]+)"/g)].map((match) => match[1]);
  if (values.length < 2) return null;
  const find = (prefix) => values.find((value) => value.toLowerCase().startsWith(prefix));
  if (/\/enqueue\.json$/.test(operation.path)) return find("queue");
  if (/\/cancel\.json$/.test(operation.path)) return find("cancel");
  return values[0];
}

/** Pick the operation status for a write, limited to the values the schema allows. */
function operationStatus(operation, request, inputItem, statusSchema) {
  const action = isPlainObject(request.body?.value) ? request.body.value.action : undefined;
  const text = `${operation.summary} ${operation.path}`.toLowerCase();
  const hasIdentity = isPlainObject(inputItem) && ["id", "marketoGUID", "leadId"].some((key) => inputItem[key] !== undefined);

  let candidates;
  if (operation.method === "DELETE" || /\bremove/.test(text)) candidates = ["removed", "deleted"];
  else if (/delete/.test(text)) candidates = ["deleted", "removed"];
  else if (action === "updateOnly") candidates = ["updated"];
  else if (action === "createOnly" || action === "createDuplicate") candidates = ["created"];
  else if (action === "createOrUpdate") candidates = hasIdentity ? ["updated", "created"] : ["created", "updated"];
  else if (/\badd\b|\/leads\.json$/.test(text) && /list/.test(text)) candidates = ["added"];
  else if (/\bupdate|status\.json$|partitions/.test(text)) candidates = ["updated"];
  else candidates = hasIdentity ? ["updated", "created"] : ["created", "updated"];

  const allowed = Array.isArray(statusSchema.enum) ? statusSchema.enum : OPERATION_STATUSES;
  return candidates.find((status) => allowed.includes(status));
}

// ---------------------------------------------------------------------------
// Record adjustments
// ---------------------------------------------------------------------------

function recordCount(context, defaultCount) {
  const { request, filterValues, idList, single } = context;
  const input = inputItems(request);
  let count = defaultCount;
  if (input) count = input.length;
  else if (single) count = 1;
  else if (filterValues.length) count = filterValues.length;
  else if (idList.length) count = idList.length;
  const batchSize = Number.parseInt(queryValue(request, "batchSize") ?? "", 10);
  return Number.isInteger(batchSize) && batchSize > 0 ? Math.min(count, batchSize) : count;
}

function adjustRecord(record, index, context) {
  const { operation, request, itemSchema, resolver, fieldsParameter, filterValues, idList, single, singleKeys, notes } = context;
  const properties = itemSchema.properties || {};
  const flat = (name) => resolver.flatten(properties[name] || {});
  const result = { ...record };
  const isRead = operation.method === "GET";

  // 4. Context-only properties.
  for (const name of Object.keys(properties)) {
    const schema = flat(name);
    const description = schema.description || properties[name].description || "";
    const onlyVia = description.match(ONLY_RETURNED_VIA);
    if (FAILURE_ONLY.test(description)) delete result[name];
    else if (onlyVia && onlyVia[1].toLowerCase() !== operation.summary.toLowerCase()) delete result[name];
    else if (name === "status" && isRead && isOperationStatus(schema) && !MEMBERSHIP_CHECK.test(operation.path)) delete result[name];
  }

  // 5. Operation status for writes, and bulk job status.
  if ("status" in result) {
    const schema = flat("status");
    if (MEMBERSHIP_CHECK.test(operation.path)) {
      result.status = "memberof";
    } else if (!isRead && isOperationStatus(schema)) {
      const status = operationStatus(operation, request, inputItems(request)?.[index], schema);
      if (status) result.status = status;
    } else {
      const status = jobStatus(operation, schema.description);
      if (status) result.status = status;
    }
  }

  // 3. Fields for reads.
  const recordHasFieldsList = "fields" in properties;
  if (fieldsParameter && recordHasFieldsList) {
    // Get Lead Changes: "fields" chooses which field changes are returned.
    const names = requestedFields(request);
    const changeSchema = flat("fields").items;
    if (names.length && changeSchema) {
      result.fields = names.map((name, changeIndex) => ({
        ...generateMock(changeSchema, resolver, { index: index + changeIndex, arrayDepth: 1 }),
        name,
      }));
    }
  } else if (fieldsParameter) {
    const requested = requestedFields(request);
    const defaults = documentedDefaultFields(fieldsParameter.description);
    const names = requested.length ? requested : defaults.length ? defaults : MODEL_DEFAULT_FIELDS[itemSchema.refName] || [];
    for (const name of names) {
      if (findKey(result, name)) continue;
      result[name] = mockFieldValue(name, index);
      if (requested.length) notes.requested.add(name);
      else notes.defaults.add(name);
    }
  }

  // 2. Identity.
  if ("seq" in result) result.seq = index;
  if (single) {
    if (!CLONE.test(operation.path)) {
      for (const [parameter, key] of singleKeys) {
        if (request.pathValues[parameter] !== undefined) result[key] = typed(request.pathValues[parameter], flat(key));
      }
    }
    const name = LOOKUP_BY_NAME.test(operation.path) ? queryValue(request, "name") : null;
    if (name !== null && "name" in result) result.name = name;
    for (const [field, value] of submittedFormValues(request)) {
      const key = findKey(result, field);
      if (!key) continue;
      const isObject = typeof value === "object";
      if (isObject === isPlainObject(result[key])) result[key] = isObject ? value : typed(value, flat(key));
    }
  }
  const input = inputItems(request)?.[index];
  if (isPlainObject(input)) {
    for (const key of ["id", "marketoGUID", "leadId"]) {
      if (input[key] !== undefined && key in result) result[key] = typed(input[key], flat(key));
    }
  }
  if (idList.length && idList[index] !== undefined && "id" in result) result.id = typed(idList[index], flat("id"));
  const filterType = queryValue(request, "filterType");
  if (filterType && filterValues[index] !== undefined) {
    const key = findKey(result, filterType);
    if (key) result[key] = typed(filterValues[index], flat(key));
  }
  return result;
}

/**
 * Generate a mock response that reflects the request.
 * Returns the generateResponseMock result plus `notes`: { requested, defaults }
 * listing field names added to records.
 */
export function generateRealisticResponse(operation, code, request) {
  const mock = generateResponseMock(operation, code);
  const notes = { requested: [], defaults: [] };
  const response = operation.responses.find((candidate) => candidate.code === code);
  const resolver = operation.resolver;
  if (mock.source !== "schema" || !/^2\d\d$/.test(code) || !isPlainObject(mock.body) || !Array.isArray(mock.body.result)) {
    return { ...mock, notes };
  }
  const resultSchema = resolver.flatten(resolver.flatten(response.schema).properties?.result || {});
  const itemSchema = resolver.flatten(resultSchema.items || {});
  if (!isPlainObject(itemSchema.properties)) return { ...mock, notes };

  const fieldsParameter = operation.fields.find((field) => field.in === "query" && field.name === "fields") || null;
  const filterValues = queryList(request, "filterValues");
  const idField = operation.fields.find((field) => field.in === "query" && field.name === "id" && field.schema.type === "array");
  const idList = idField ? queryList(request, "id") : [];
  const singleKeys = singleRecordKeys(operation, itemSchema.properties);
  const listInput = inputItems(request) || filterValues.length || idList.length;
  // Object describes (Describe Company, Describe Custom Object) return one
  // object with its fields; Describe Lead returns one record per field.
  const describesOneObject = DESCRIBE.test(operation.path) && ("fields" in itemSchema.properties || "dedupeFields" in itemSchema.properties);
  const formWrite = operation.method === "POST" && (operation.body?.kind === "form" || operation.body?.kind === "multipart");
  const single = !listInput && (singleKeys.length > 0 || describesOneObject || formWrite
    || (operation.method === "GET" && LOOKUP_BY_NAME.test(operation.path))
    || (operation.method === "POST" && CREATES_ONE_JOB.test(operation.path)));

  const collected = { requested: new Set(), defaults: new Set() };
  const context = { operation, request, itemSchema, resolver, fieldsParameter, filterValues, idList, single, singleKeys, notes: collected };
  const count = recordCount(context, mock.body.result.length);
  const result = Array.from({ length: count }, (_, index) => {
    const record = generateMock(resultSchema.items, resolver, { index, arrayDepth: 1 });
    return adjustRecord(isPlainObject(record) ? record : {}, index, context);
  });

  return {
    ...mock,
    body: { ...mock.body, result },
    notes: { requested: [...collected.requested], defaults: [...collected.defaults] },
  };
}
