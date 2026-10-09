/**
 * Build the Postman collection from reference/manifest.json and the
 * *.operation.json files it lists.
 *
 * Operations are normalised with the Request Builder's own normaliser
 * (docs-site/docs/assets/request-builder/operation.js), so the collection and
 * the documentation site interpret the specifications the same way. The
 * output is plain data with a fixed key order and no timestamps or random
 * identifiers: the same reference always produces the same collection.
 */

import { createHash } from "node:crypto";

import { normaliseOperation } from "../../docs-site/docs/assets/request-builder/operation.js";
import { describeType, isPlainObject, isResponseModel, isResponseOnly } from "../../docs-site/docs/assets/request-builder/schema.js";
import { identityTokenEvent, TOKEN_VARIABLE } from "./identity-script.mjs";
import { code, htmlToMarkdown, inlineMarkdown } from "./markdown.mjs";

export const COLLECTION_NAME = "Marketo Engage API Reference (Unofficial)";
export const COLLECTION_SCHEMA = "https://schema.getpostman.com/json/collection/v2.1.0/collection.json";
export const NOT_DOCUMENTED = "Not documented in the source specification.";
const REPOSITORY_URL = "https://github.com/harrison-jennings/api-reference-for-marketo-engage";
const ID_NAMESPACE = "api-reference-for-marketo-engage/postman";

/** The API families, in collection order: Identity first, because every other request needs its token. */
export const FAMILIES = [
  {
    section: "identity",
    title: "Identity API",
    summary: "OAuth 2.0 client-credentials token issuance. Send a request in this folder to get an access token for every other API.",
  },
  {
    section: "asset",
    title: "Asset API",
    summary: "Emails, templates, forms, landing pages, programs, smart campaigns, smart lists, files, folders, snippets and tokens.",
  },
  {
    section: "core",
    title: "Core API",
    summary: "Leads, activities, campaigns, companies, custom objects, opportunities, lists, bulk import and export jobs, and usage.",
  },
  {
    section: "user-management",
    title: "User Management API",
    summary: "Users, invitations, roles and workspaces.",
  },
  {
    section: "data-ingestion",
    title: "Data Ingestion API",
    summary: "High-volume, asynchronous ingestion of persons, companies, custom objects, list memberships and program members.",
  },
];

/**
 * Environment variables the collection refers to. A path parameter with the
 * same name (munchkinId) takes its value from the environment.
 */
export const VARIABLES = {
  marketoBaseUrl: "marketoBaseUrl",
  ingestionBaseUrl: "ingestionBaseUrl",
  munchkinId: "munchkinId",
  clientId: "clientId",
  clientSecret: "clientSecret",
  accessToken: TOKEN_VARIABLE,
};

const CREDENTIAL_QUERY_VALUES = { client_id: `{{${VARIABLES.clientId}}}`, client_secret: `{{${VARIABLES.clientSecret}}}` };
const ENVIRONMENT_PATH_PARAMETERS = new Set([VARIABLES.munchkinId]);
const MUNCHKIN_ID = /\b\d{3}-[A-Za-z]{3}-\d{3}\b/;
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

/**
 * Short factual notes for operations that change data, keyed by the first
 * word of the source operation summary. They describe what the operation does;
 * they do not block or gate anything. Read operations (Get, List, Describe…)
 * have no entry.
 */
export const CONSEQUENCES = {
  Activate: "activates an asset or rule in the Marketo instance it is sent to",
  Add: "adds records or associations in the Marketo instance it is sent to",
  Approve: "approves an asset in the Marketo instance it is sent to",
  Associate: "associates records in the Marketo instance it is sent to",
  Cancel: "cancels a job in the Marketo instance it is sent to",
  Change: "changes data in the Marketo instance it is sent to",
  Clone: "creates a copy of an asset in the Marketo instance it is sent to",
  Create: "creates data in the Marketo instance it is sent to",
  Deactivate: "deactivates an asset or rule in the Marketo instance it is sent to",
  Delete: "deletes data in the Marketo instance it is sent to",
  Discard: "discards a draft in the Marketo instance it is sent to",
  Duplicate: "creates a copy of an asset in the Marketo instance it is sent to",
  Enqueue: "queues a bulk export job for processing in the Marketo instance it is sent to",
  Import: "imports records into the Marketo instance it is sent to",
  Invite: "sends a user invitation from the Marketo instance it is sent to",
  Merge: "merges records in the Marketo instance it is sent to",
  Push: "creates or updates records in the Marketo instance it is sent to",
  Rearrange: "changes the arrangement of an asset in the Marketo instance it is sent to",
  Remove: "removes records or associations in the Marketo instance it is sent to",
  Rename: "renames data in the Marketo instance it is sent to",
  Reorder: "changes the order of items in the Marketo instance it is sent to",
  Request: "triggers smart campaign processing in the Marketo instance it is sent to",
  Schedule: "schedules a smart campaign to run in the Marketo instance it is sent to",
  Send: "sends an email from the Marketo instance it is sent to",
  Submit: "submits data to the Marketo instance it is sent to",
  Sync: "creates or updates records in the Marketo instance it is sent to",
  Unapprove: "unapproves an asset in the Marketo instance it is sent to",
  Update: "changes data in the Marketo instance it is sent to",
};
export const READ_VERBS = new Set(["Get", "List", "Describe", "Member", "Identity"]);

// ---------------------------------------------------------------------------
// Identifiers and links
// ---------------------------------------------------------------------------

/**
 * A stable UUID-formatted identifier derived from its parts (name-based, like
 * UUID v5). SHA-1 only makes identifiers repeatable; it protects nothing.
 */
export function stableId(...parts) {
  const hex = createHash("sha1").update([ID_NAMESPACE, ...parts].join("\u0000")).digest("hex");
  const variant = ((Number.parseInt(hex[16], 16) & 0x3) | 0x8).toString(16);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-${variant}${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

function pageUrl(siteUrl, markdownPath) {
  const withoutExtension = markdownPath.replace(/\.md$/, "");
  const page = withoutExtension.endsWith("README") ? withoutExtension.slice(0, -"README".length) : `${withoutExtension}/`;
  return `${siteUrl}reference/${page}`;
}

function link(text, url) {
  return `[${text.replace(/[\\[\]]/g, "\\$&")}](${url})`;
}

// ---------------------------------------------------------------------------
// Schema descriptions
// ---------------------------------------------------------------------------

function exampleText(value) {
  if (value === undefined || value === null || typeof value === "boolean") return null;
  if (typeof value === "object") return null;
  const text = String(value);
  // Never republish identifiers that look like a real subscription or person.
  if (MUNCHKIN_ID.test(text) || EMAIL.test(text)) return null;
  return code(text);
}

function valueList(values) {
  return values.map((value) => code(typeof value === "string" ? value : JSON.stringify(value))).join(", ");
}

/** Source facts about a schema: allowed values, default, limits and example. */
export function schemaFacts(schema, resolver) {
  const resolved = isPlainObject(schema) ? schema : {};
  const facts = [];
  const items = resolved.type === "array" && resolved.items ? resolver.flatten(resolved.items) : null;
  if (Array.isArray(resolved.enum) && resolved.enum.length) facts.push(`Allowed values: ${valueList(resolved.enum)}`);
  if (items && Array.isArray(items.enum) && items.enum.length) facts.push(`Allowed item values: ${valueList(items.enum)}`);
  if (resolved.default !== undefined) facts.push(`Default: ${code(typeof resolved.default === "string" ? resolved.default : JSON.stringify(resolved.default))}`);
  const limits = [
    ["minimum", "Minimum"], ["maximum", "Maximum"], ["exclusiveMinimum", "Exclusive minimum"], ["exclusiveMaximum", "Exclusive maximum"],
    ["minLength", "Minimum length"], ["maxLength", "Maximum length"], ["pattern", "Pattern"],
    ["minItems", "Minimum items"], ["maxItems", "Maximum items"], ["multipleOf", "Multiple of"],
  ];
  for (const [key, label] of limits) {
    if (resolved[key] !== undefined && typeof resolved[key] !== "boolean") facts.push(`${label}: ${code(resolved[key])}`);
  }
  if (resolved.uniqueItems === true) facts.push("Items must be unique");
  if (resolved.readOnly === true) facts.push("Read-only");
  if (resolved.deprecated === true) facts.push("Deprecated");
  const example = exampleText(resolved.example);
  if (example) facts.push(`Example: ${example}`);
  return facts;
}

function typeLabel(schema, resolver) {
  return describeType(schema, resolver);
}

// ---------------------------------------------------------------------------
// Field descriptions for native Params, Headers, path variables and form rows
// ---------------------------------------------------------------------------

/** Plain-text form of a Markdown string, for Postman's single-line row descriptions. */
export function plainText(markdown) {
  return markdown
    .replace(/\[([^\]]*)\]\(([^)]*)\)/g, "$1 ($2)")
    .replace(/\*\*/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const ARRAY_STYLES = {
  csv: "Comma-separated list in a single value, e.g. a,b,c.",
  ssv: "Space-separated list in a single value.",
  tsv: "Tab-separated list in a single value.",
  pipes: "Pipe-separated list in a single value, e.g. a|b|c.",
  multi: "Repeat the parameter once per value: add another row with the same key for each additional value.",
};

/** End a source sentence with a full stop so that appended facts read as separate sentences. */
export function sentence(text) {
  const trimmed = text.trim();
  return /[.!?:)`]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function fieldDescription(field, resolver, { extra = [], requirement = null } = {}) {
  const description = inlineMarkdown(field.description) || NOT_DOCUMENTED;
  const parts = [sentence(plainText(description))];
  const meta = [requirement || (field.required ? "Required" : "Optional"), typeLabel(field.schema, resolver)];
  parts.push(`${meta.join(", ")}.`);
  if (field.arrayStyle && ARRAY_STYLES[field.arrayStyle]) parts.push(ARRAY_STYLES[field.arrayStyle]);
  const facts = schemaFacts(field.schema, resolver);
  if (facts.length) parts.push(`${plainText(facts.join(". "))}.`);
  parts.push(...extra);
  return parts.join(" ");
}

function defaultValue(field) {
  const schema = field.schema || {};
  let value = schema.default;
  if (value === undefined && Array.isArray(schema.enum) && schema.enum.length === 1) value = schema.enum[0];
  if (value === undefined) return "";
  if (Array.isArray(value)) return value.map(String).join(",");
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

// ---------------------------------------------------------------------------
// Request body: minimal starter and property reference
// ---------------------------------------------------------------------------

const MAX_SKELETON_DEPTH = 6;

/**
 * The smallest honest structure for a JSON body: required properties only,
 * with null wherever a value must be supplied. Single-value enums are filled
 * because they have no alternative; nothing else is invented.
 */
export function bodySkeleton(schema, resolver, depth = 0, seen = new Set()) {
  const resolved = resolver.flatten(schema);
  if (!isPlainObject(resolved) || resolved.circular || depth > MAX_SKELETON_DEPTH) return null;
  if (resolved.refName && seen.has(resolved.refName)) return null;
  const nextSeen = resolved.refName ? new Set(seen).add(resolved.refName) : seen;

  if (resolved.type === "object" || isPlainObject(resolved.properties)) {
    const properties = isPlainObject(resolved.properties) ? resolved.properties : {};
    const required = new Set(isResponseModel(resolved, resolver) ? [] : resolved.required || []);
    const result = {};
    for (const [name, property] of Object.entries(properties)) {
      if (!required.has(name) || isResponseOnly(resolver.flatten(property))) continue;
      result[name] = bodySkeleton(property, resolver, depth + 1, nextSeen);
    }
    return result;
  }
  if (resolved.type === "array") {
    const items = resolver.flatten(resolved.items || {});
    const element = isPlainObject(items) && (items.type === "object" || items.properties) ? bodySkeleton(items, resolver, depth + 1, nextSeen) : null;
    return element && Object.keys(element).length ? [element] : [];
  }
  if (Array.isArray(resolved.enum) && resolved.enum.length === 1) return resolved.enum[0];
  return null;
}

/**
 * Flatten a body schema into one entry per property, e.g. input[].email.
 * Recursion stops at a model that is already being expanded; that entry links
 * to the model page instead.
 */
export function bodyProperties(schema, resolver, prefix = "", seen = new Set(), entries = [], pointer = "") {
  const resolved = resolver.flatten(schema);
  if (!isPlainObject(resolved)) return entries;
  if (resolved.type === "array" || resolved.items) {
    return bodyProperties(resolved.items || {}, resolver, `${prefix}[]`, seen, entries, `${pointer}/items`);
  }
  const properties = isPlainObject(resolved.properties) ? resolved.properties : {};
  const required = new Set(isResponseModel(resolved, resolver) ? [] : resolved.required || []);
  const nextSeen = resolved.refName ? new Set(seen).add(resolved.refName) : seen;
  for (const [name, property] of Object.entries(properties)) {
    const flattened = resolver.flatten(property);
    const path = prefix ? `${prefix}.${name}` : name;
    const target = flattened.type === "array" ? resolver.flatten(flattened.items || {}) : flattened;
    const recursive = Boolean(target?.refName && nextSeen.has(target.refName));
    entries.push({
      path,
      name,
      schema: flattened,
      required: required.has(name),
      responseOnly: isResponseOnly(flattened),
      description: flattened.description || "",
      recursiveModel: recursive ? target.refName : null,
      pointer: `${pointer}/properties/${name}`,
    });
    if (!recursive) bodyProperties(property, resolver, path, nextSeen, entries, `${pointer}/properties/${name}`);
  }
  if (isPlainObject(resolved.additionalProperties)) {
    bodyProperties(resolved.additionalProperties, resolver, `${prefix}.*`, nextSeen, entries, `${pointer}/additionalProperties`);
  }
  return entries;
}

// ---------------------------------------------------------------------------
// One request
// ---------------------------------------------------------------------------

function postmanPath(path) {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      const match = /^\{([^}]+)\}(\.[A-Za-z0-9]+)?$/.exec(segment);
      if (match) return `:${match[1]}${match[2] || ""}`;
      if (/[{}]/.test(segment)) throw new Error(`Unsupported path segment "${segment}" in ${path}`);
      return segment;
    });
}

/** The Data Ingestion API host: the only specification that declares a real server. */
export function ingestionBaseUrl(operations) {
  const urls = [...new Set(operations.map((op) => op.defaultBaseUrl).filter(Boolean))];
  if (urls.length > 1) throw new Error(`Expected one declared server, found ${urls.join(", ")}`);
  return urls[0] || null;
}

function hostVariable(op, context) {
  if (!op.defaultBaseUrl) return VARIABLES.marketoBaseUrl;
  if (op.defaultBaseUrl === context.ingestionBaseUrl) return VARIABLES.ingestionBaseUrl;
  throw new Error(`${op.method} ${op.path}: unrecognised server ${op.defaultBaseUrl}; add an environment variable for it`);
}

function encodeQueryKey(text) {
  return String(text).replace(/[&=#\s]/g, encodeURIComponent);
}

function rawUrl(host, segments, query) {
  const enabled = query.filter((row) => !row.disabled);
  const search = enabled.map((row) => `${encodeQueryKey(row.key)}=${row.value}`).join("&");
  return `{{${host}}}/${segments.join("/")}${search ? `?${search}` : ""}`;
}

function modelLink(context, section, name) {
  const page = context.models[section]?.[name];
  return page ? link(name, `${context.siteUrl}reference/${section}/models/${page.replace(/\.md$/, "")}/`) : code(name);
}

function consequence(entry) {
  const words = entry.title.split(/\s+/);
  const verb = words[0] === "Bulk" ? words[1] : words[0];
  return CONSEQUENCES[verb] || null;
}

function isDeprecated(op) {
  return op.deprecated || /\b(deprecated|superseded)\b/i.test(op.description);
}

// Activity endpoints document that their first token comes from the "Get Paging Token" endpoint.
const GET_PAGING_TOKEN = /\bget paging token\b/i;

function paginationNotes(op, entry, context) {
  const names = new Set(op.fields.map((field) => field.name));
  const success = op.responses.find((response) => /^2/.test(response.code));
  const responseSchema = success?.schema ? op.resolver.flatten(success.schema) : null;
  const responseProperties = isPlainObject(responseSchema?.properties) ? responseSchema.properties : {};
  const notes = [];

  if (names.has("nextPageToken")) {
    const token = op.fields.find((field) => field.name === "nextPageToken");
    const fromPagingToken = token.required && GET_PAGING_TOKEN.test(token.description);
    const steps = [];
    if (fromPagingToken && context.pagingTokenRequest) {
      steps.push(`Send ${code(context.pagingTokenRequest)} first, and copy the ${code("nextPageToken")} from its response into this request's ${code("nextPageToken")} param.`);
    }
    steps.push(`Send this request. ${"moreResult" in responseProperties ? `If the response has ${code("moreResult")} set to ${code("true")}, copy` : "To get the next page, copy"} the ${code("nextPageToken")} from the response into the ${code("nextPageToken")} param, and send the request again.`);
    if ("moreResult" in responseProperties) steps.push(`Stop when ${code("moreResult")} is ${code("false")}.`);
    if (names.has("batchSize")) steps.push(`${code("batchSize")} sets the maximum number of records per response.`);
    notes.push(...steps.map((step, index) => `${index + 1}. ${step}`));
  } else if (names.has("offset") && names.has("maxReturn")) {
    notes.push(
      `${code("offset")} is the number of records to skip, not a page number. To get the next page, add the ${code("maxReturn")} value you used to ${code("offset")} and send the request again.`,
      "",
      `Continue until a response returns no more records. The source specification does not say that a page with fewer than ${code("maxReturn")} records is the last one.`,
    );
  } else if (["pageOffset", "pageIndex", "offset"].some((name) => names.has(name))) {
    const present = ["pageOffset", "pageIndex", "offset", "pageSize", "maxReturn"].filter((name) => names.has(name)).map(code).join(", ");
    notes.push(`This request pages with ${present}. The source specification does not define whether the offset counts records or pages; see the ${link("reference page", pageUrl(context.siteUrl, entry.markdown))} and send each page as a separate request.`);
  }

  if (!names.has("nextPageToken") && "nextPageToken" in responseProperties && context.pagingTokenConsumers.has(entry.json)) {
    const consumers = context.pagingTokenConsumers.get(entry.json);
    notes.push(`Use the ${code("nextPageToken")} from this response as the ${code("nextPageToken")} param of: ${consumers.map(code).join(", ")}.`);
  }
  if (!notes.length) return [];
  return [
    "### Pagination",
    "",
    ...notes,
    "",
    "Each page is a separate request that you send yourself. The collection does not capture tokens or fetch pages automatically; you can paste values, or use Postman's **Set as variable** on a response value.",
  ];
}

function authDescription(op) {
  switch (op.authentication.type) {
    case "client-credentials":
      return `None. This request sends ${code("client_id")}, ${code("client_secret")} and ${code("grant_type")} as query parameters, from the ${code(`{{${VARIABLES.clientId}}}`)} and ${code(`{{${VARIABLES.clientSecret}}}`)} variables.`;
    case "header":
      return `${code(op.authentication.header[0])} header from ${code(`{{${VARIABLES.accessToken}}}`)}, set on this request's **Authorization** tab (API Key).`;
    default:
      return `Bearer token from ${code(`{{${VARIABLES.accessToken}}}`)}, inherited from the collection's **Authorization** tab.`;
  }
}

function requestAuth(op) {
  if (op.authentication.type === "client-credentials") return { type: "noauth" };
  if (op.authentication.type === "header") {
    return {
      type: "apikey",
      apikey: [
        { key: "key", value: op.authentication.header[0], type: "string" },
        { key: "value", value: `{{${VARIABLES.accessToken}}}`, type: "string" },
        { key: "in", value: "header", type: "string" },
      ],
    };
  }
  return null; // Inherit the collection's bearer authorisation.
}

// Postman's runtime drops bodies on these methods unless body pruning is disabled.
const PRUNED_BODY_METHODS = new Set(["GET", "HEAD", "COPY", "PURGE", "UNLOCK"]);
// Postman sets this Content-Type itself for raw JSON bodies, so it is not repeated as a header row.
const POSTMAN_JSON_CONTENT_TYPE = "application/json";

function buildBody(op, context, entry) {
  const body = op.body;
  const description = [];
  if (!body) return { body: null, headers: [], description, protocolProfileBehavior: null };
  const protocolProfileBehavior = PRUNED_BODY_METHODS.has(op.method) ? { disableBodyPruning: true } : null;

  const model = body.refName ? ` · model ${modelLink(context, entry.section, body.refName)}` : "";
  description.push("### Request body", "");
  description.push(`${code(body.contentType)}${body.contentTypes.length > 1 ? ` (also accepts ${body.contentTypes.slice(1).map(code).join(", ")})` : ""} · ${body.required ? "required" : "optional"}${model}`);
  // Swagger 2 body parameters often repeat their own name as the description; that adds nothing.
  if (body.description && body.description.trim().toLowerCase() !== String(body.name).toLowerCase()) {
    description.push("", htmlToMarkdown(body.description));
  }
  if (body.alternativeTo) {
    description.push("", `Send either ${code(body.alternativeTo.split(":")[1])} values in the query string or a request body.`);
  }

  if (body.kind === "form" || body.kind === "multipart") {
    const rows = [];
    const nested = [];
    for (const field of body.fields || []) {
      const isFile = body.kind === "multipart" && (field.schema.type === "file" || field.schema.format === "binary" || /multipart file/i.test(field.description));
      const objectValued = field.schema.type === "object" || field.schema.type === "array";
      const extra = [];
      if (objectValued) extra.push("Send the value as JSON text; its properties are listed in the request description.");
      if (isFile) extra.push("Select a file in the Body tab before sending.");
      const row = { key: field.name };
      if (isFile) {
        row.type = "file";
      } else {
        row.value = defaultValue(field);
        row.type = "text";
      }
      row.description = fieldDescription(field, op.resolver, { extra });
      if (!field.required) row.disabled = true;
      rows.push(row);
      if (objectValued) nested.push(...bodyProperties(field.schema, op.resolver, field.name));
    }
    description.push(
      "",
      body.kind === "multipart"
        ? "Each form field is a row in the **Body** tab (form-data), with its description. Required fields are enabled; optional fields are disabled until you enable them. File fields have no file selected."
        : "Each form field is a row in the **Body** tab (x-www-form-urlencoded), with its description. Required fields are enabled; optional fields are disabled until you enable them.",
    );
    if (nested.length) description.push("", "**Properties of JSON-valued fields**", "", ...propertyLines(nested, op.resolver, context, entry.section));
    return {
      body: body.kind === "multipart" ? { mode: "formdata", formdata: rows } : { mode: "urlencoded", urlencoded: rows },
      headers: [],
      description,
      protocolProfileBehavior,
    };
  }

  const headers = body.kind === "json" && body.contentType.toLowerCase() === POSTMAN_JSON_CONTENT_TYPE
    ? []
    : [{ key: "Content-Type", value: body.contentType, type: "text" }];
  if (body.kind !== "json") {
    description.push("", "The body is empty: enter content in the format the operation documents.");
    return { body: { mode: "raw", raw: "", options: { raw: { language: "text" } } }, headers, description, protocolProfileBehavior };
  }
  if (protocolProfileBehavior && !body.required) {
    // An optional body on a GET-like request is an alternative form of the request; it starts empty.
    description.push("", `This body is optional and starts empty, so the request is sent without one. If you add a body, Postman sends it with this ${op.method} request (body pruning is disabled for it).`);
    const properties = bodyProperties(body.schema || {}, op.resolver);
    if (properties.length) description.push("", "**Properties**", "", ...propertyLines(properties, op.resolver, context, entry.section));
    return { body: { mode: "raw", raw: "", options: { raw: { language: "json" } } }, headers: [], description, protocolProfileBehavior };
  }

  const resolvedSchema = op.resolver.flatten(body.schema || {});
  const skeleton = isPlainObject(resolvedSchema) && (resolvedSchema.type || resolvedSchema.properties || resolvedSchema.items)
    ? bodySkeleton(body.schema, op.resolver)
    : null;
  const usable = skeleton !== null && typeof skeleton === "object";
  const raw = usable ? `${JSON.stringify(skeleton, null, 2)}\n` : "";
  if (body.example !== undefined) {
    description.push("", `The source specification includes a request example; it is shown on the ${link("reference page", pageUrl(context.siteUrl, entry.markdown))} and not copied here, because it contains sample records.`);
  }
  if (!usable) {
    description.push("", "The body is empty: the schema has no structure that can be started without inventing values. Use the properties below.");
  } else if (raw.includes("null")) {
    description.push("", `The body starts with the required properties only, set to ${code("null")}. Replace each ${code("null")} with a value, and add any optional properties you need.`);
  } else {
    description.push("", "The body starts with the required structure only. Add the properties you need.");
  }
  const properties = bodyProperties(body.schema || {}, op.resolver);
  if (properties.length) description.push("", "**Properties**", "", ...propertyLines(properties, op.resolver, context, entry.section));
  return { body: { mode: "raw", raw, options: { raw: { language: "json" } } }, headers, description, protocolProfileBehavior };
}

function propertyLines(properties, resolver, context, section) {
  return properties.map((property) => {
    const facts = [typeLabel(property.schema, resolver), property.required ? "required" : "optional"];
    if (property.responseOnly) facts.push("returned in responses; do not send");
    const details = schemaFacts(property.schema, resolver);
    const description = sentence(inlineMarkdown(property.description) || NOT_DOCUMENTED);
    const recursive = property.recursiveModel ? ` Its properties are those of ${modelLink(context, section, property.recursiveModel)}, listed above.` : "";
    const extra = details.length ? ` ${details.join(". ")}.` : "";
    return `- ${code(property.path)} · ${facts.join(" · ")} — ${description}${extra}${recursive}`;
  });
}

function parameterLines(op, notes) {
  const lines = [];
  for (const field of op.fields) {
    let where = { path: "path variable", query: "query param", header: "header" }[field.in] || field.in;
    if (field.credential) {
      if (field.in === "query" && field.name === "access_token") {
        notes.push(`The source specification also lists an ${code("access_token")} query parameter. This collection sends the token in the ${code("Authorization")} header instead, so it is never added to URLs.`);
        where = "not sent; see notes";
      } else if (field.in === "header") {
        where = "header, set by the Authorization tab";
      }
    }
    const facts = schemaFacts(field.schema, op.resolver);
    // Inputs without a row of their own keep their source description here.
    const description = field.credential && !CREDENTIAL_QUERY_VALUES[field.name] ? ` — ${sentence(inlineMarkdown(field.description) || NOT_DOCUMENTED)}` : "";
    const requirement = op.body?.alternativeTo === field.key ? "required unless you send a request body" : field.required ? "required" : "optional";
    lines.push(`- ${code(field.name)} · ${where} · ${typeLabel(field.schema, op.resolver)} · ${requirement}${facts.length ? ` · ${facts.join(" · ")}` : ""}${description}`);
  }
  return lines;
}

function requestDescription(op, entry, context, bodyDescription) {
  const lines = [];
  if (isDeprecated(op)) {
    lines.push(`> **Deprecated or superseded.** ${op.deprecated ? "The source specification marks this operation as deprecated." : "The source description says this operation is deprecated or superseded; see below."}`, "");
  }
  const effect = consequence(entry);
  if (effect) {
    lines.push(`> **Changes data.** Sending this request ${effect}. Use credentials with the least privilege you need, and a sandbox instance when testing.`, "");
  }
  lines.push(htmlToMarkdown(op.description) || htmlToMarkdown(op.summary) || `_${NOT_DOCUMENTED}_`, "");

  const family = context.families.get(entry.section);
  lines.push(
    `- **Endpoint:** ${code(`${op.method} ${op.path}`)}`,
    `- **Operation ID:** ${op.operationId ? code(op.operationId) : `_${NOT_DOCUMENTED}_`}`,
    `- **API:** ${family.title} · ${entry.tag}`,
    `- **Authentication:** ${authDescription(op)}`,
    `- **Reference:** ${link(`${entry.title} on the documentation site`, pageUrl(context.siteUrl, entry.markdown))}`,
    "",
  );

  const notes = [];
  if (op.fields.length) {
    lines.push("### Parameters", "", ...parameterLines(op, notes), "");
    lines.push("Each parameter's description is on its row in the **Params** and **Headers** tabs. Optional parameters are disabled until you enable them; required ones are enabled and must have a value.", "");
  }
  if (bodyDescription.length) lines.push(...bodyDescription, "");

  if (op.responses.length) {
    lines.push("### Responses", "");
    for (const response of op.responses) {
      const model = response.refName ? ` · ${modelLink(context, entry.section, response.refName)}` : "";
      lines.push(`- ${code(response.code)} — ${inlineMarkdown(response.description) || NOT_DOCUMENTED}${model}`);
    }
    if (op.produces?.length) lines.push("", `Declared response media type: ${op.produces.map(code).join(", ")}.`);
    lines.push("");
  }

  const pagination = paginationNotes(op, entry, context);
  if (pagination.length) lines.push(...pagination, "");

  if (op.authentication.type === "client-credentials") {
    notes.push(
      `As documented, ${code("client_id")} and ${code("client_secret")} are sent in the URL query string. URLs can appear in Postman's history and console, and in proxy or server logs: keep these values in your environment's local (current) values or Postman Vault, and don't share or sync them.`,
      `After you send this request, its post-response script saves ${code("access_token")} to ${code(`{{${VARIABLES.accessToken}}}`)} and the expiry time (epoch milliseconds) to ${code("{{accessTokenExpiresAt}}")} in the selected environment. Nothing renews the token automatically: send this request again when it expires.`,
    );
  }
  if (notes.length) lines.push("### Notes", "", ...notes.map((note) => `- ${note}`), "");
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function buildRequestItem(op, entry, context) {
  const host = hostVariable(op, context);
  const segments = postmanPath(op.path);
  const query = [];
  const headers = [];
  const variables = [];

  for (const field of op.fields) {
    if (field.in === "path") {
      variables.push({
        key: field.name,
        value: ENVIRONMENT_PATH_PARAMETERS.has(field.name) ? `{{${field.name}}}` : "",
        description: fieldDescription(field, op.resolver, {
          extra: ENVIRONMENT_PATH_PARAMETERS.has(field.name) ? [`Set from the {{${field.name}}} environment variable.`] : [],
        }),
      });
    } else if (field.in === "query") {
      if (field.credential && !CREDENTIAL_QUERY_VALUES[field.name]) continue; // access_token: sent in the Authorization header.
      // Marketo takes record IDs either in an `id` query list or in the JSON body, so neither is required on its own.
      const alternative = op.body?.alternativeTo === field.key ? "Required unless you send a request body" : null;
      const row = { key: field.name, value: CREDENTIAL_QUERY_VALUES[field.name] || defaultValue(field), description: fieldDescription(field, op.resolver, { requirement: alternative }) };
      if (!field.required) row.disabled = true;
      query.push(row);
    } else if (field.in === "header") {
      if (field.credential) continue; // Set by the request's API Key authorisation.
      if (/^(authorization|content-type)$/i.test(field.name)) throw new Error(`${op.method} ${op.path}: header ${field.name} conflicts with generated headers`);
      const row = { key: field.name, value: defaultValue(field), type: "text", description: fieldDescription(field, op.resolver) };
      if (!field.required) row.disabled = true;
      headers.push(row);
    }
  }

  const bodyResult = buildBody(op, context, entry);
  const request = {
    method: op.method,
    header: [...headers, ...bodyResult.headers],
  };
  if (bodyResult.body) request.body = bodyResult.body;
  request.url = {
    raw: rawUrl(host, segments, query),
    host: [`{{${host}}}`],
    path: segments,
  };
  if (query.length) request.url.query = query;
  if (variables.length) request.url.variable = variables;
  const auth = requestAuth(op);
  if (auth) request.auth = auth;
  request.description = requestDescription(op, entry, context, bodyResult.description);

  const item = { id: stableId("request", entry.section, entry.method, entry.path), name: `${entry.method} · ${entry.title}` };
  if (op.authentication.type === "client-credentials") item.event = [identityTokenEvent()];
  if (bodyResult.protocolProfileBehavior) item.protocolProfileBehavior = bodyResult.protocolProfileBehavior;
  item.request = request;
  return item;
}

// ---------------------------------------------------------------------------
// The collection
// ---------------------------------------------------------------------------

function familyFor(section) {
  return FAMILIES.find((family) => family.section === section) || {
    section,
    title: `${section.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())} API`,
    summary: "",
  };
}

function familyDescription(family, operations, context) {
  const hosts = new Set(operations.map(({ op }) => hostVariable(op, context)));
  const auth = new Set(operations.map(({ op }) => authDescription(op)));
  return [
    ...(family.summary ? [family.summary, ""] : []),
    `- **Base URL:** ${[...hosts].map((host) => code(`{{${host}}}`)).join(", ")}`,
    `- **Authentication:** ${[...auth].join(" ")}`,
    `- **Reference:** ${link(`${family.title} on the documentation site`, pageUrl(context.siteUrl, `${family.section}/README.md`))}`,
    "",
    "Requests run only when you send them, or when you select them for a Postman run.",
  ].join("\n");
}

function collectionDescription(context) {
  return [
    "An unofficial Postman collection for the Adobe Marketo Engage REST, Identity, User Management and Data Ingestion APIs, with one request for every operation in Adobe's published specifications.",
    "",
    "> THIS COLLECTION IS NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF ADOBE MARKETO ENGAGE. Adobe, Marketo and Marketo Engage are either registered trademarks or trademarks of Adobe in the United States and/or other countries.",
    "",
    "## Set up",
    "",
    `1. Import the **Marketo Engage (template)** environment, select it, and set ${code(VARIABLES.marketoBaseUrl)} (your REST API endpoint origin, such as ${code("https://<your-instance>.mktorest.com")}, without ${code("/rest")} or ${code("/identity")}), ${code(VARIABLES.clientId)} and ${code(VARIABLES.clientSecret)}. For the Data Ingestion API, also set ${code(VARIABLES.munchkinId)}.`,
    `2. Send **Identity API › Identity › GET · Identity** (or the POST version). Its post-response script saves the token to ${code(VARIABLES.accessToken)} and its expiry time, in epoch milliseconds, to ${code("accessTokenExpiresAt")}.`,
    "3. Open any other request, fill in its parameters and body, and send it. Every request uses the token; when it expires, send the Identity request again.",
    "",
    "## How this collection behaves",
    "",
    "- Requests run only when you send them. There are no pre-request scripts, no automatic token refresh, no retries, no request chaining and no automatic pagination. The only script is on the Identity requests, and it only saves the token and its expiry time.",
    "- Required parameters are enabled and empty unless the source specification gives a default; optional parameters are disabled until you enable them.",
    `- JSON bodies start with required properties only, set to ${code("null")} where you must supply a value. Request descriptions list every documented property.`,
    "- Paging is manual: request descriptions explain each operation's paging parameters, and you send each page yourself.",
    "- The collection includes operations that create, change, delete, send or trigger things. Their descriptions say so. **Don't run the whole collection or a folder with the Collection Runner:** it sends every selected request, including destructive ones. Use credentials with the least privilege you need, and a sandbox instance when testing.",
    "",
    "## Source and licence",
    "",
    `Generated from Adobe's Marketo Engage API specifications (${link("AdobeDocs/marketo-apis", "https://github.com/AdobeDocs/marketo-apis")}), © Adobe, licensed under the Apache License 2.0. Use of the Marketo APIs is subject to Adobe's ${link("API License Agreement", "https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/api-license")}.`,
    "",
    `Full reference: ${link("API Reference for Marketo Engage", context.siteUrl)}. Source, licence and notices: ${link("harrison-jennings/api-reference-for-marketo-engage", REPOSITORY_URL)}.`,
  ].join("\n");
}

/**
 * @param manifest reference/manifest.json
 * @param loadOperation (jsonPath) => operation document
 * @param options { siteUrl, models: { section: { ModelName: "file.md" } } }
 */
export function buildCollection(manifest, loadOperation, { siteUrl, models }) {
  if (!/^https:\/\/.+\/$/.test(siteUrl)) throw new Error(`siteUrl must be an https URL ending in "/": ${siteUrl}`);
  const operations = manifest.operations.map((entry) => ({ entry, op: normaliseOperation(loadOperation(entry.json)) }));

  const seen = new Set();
  for (const { entry, op } of operations) {
    if (op.method !== entry.method.toUpperCase() || op.path !== entry.path) {
      throw new Error(`${entry.json}: manifest lists ${entry.method} ${entry.path} but the operation is ${op.method} ${op.path}`);
    }
    const key = `${entry.section} ${entry.method} ${entry.path}`;
    if (seen.has(key)) throw new Error(`Duplicate operation ${key}`);
    seen.add(key);
  }

  const pagingToken = operations.find(({ entry }) => /^get paging token$/i.test(entry.title));
  const pagingTokenConsumers = new Map();
  if (pagingToken) {
    const consumers = operations
      .filter(({ op }) => op.fields.some((field) => field.name === "nextPageToken" && field.required && GET_PAGING_TOKEN.test(field.description)))
      .map(({ entry }) => `${entry.method} · ${entry.title}`);
    if (consumers.length) pagingTokenConsumers.set(pagingToken.entry.json, consumers);
  }
  const context = {
    siteUrl,
    models,
    ingestionBaseUrl: ingestionBaseUrl(operations.map(({ op }) => op)),
    pagingTokenRequest: pagingToken ? `${pagingToken.entry.method} · ${pagingToken.entry.title}` : null,
    pagingTokenConsumers,
    families: new Map(),
  };

  const sections = [...new Set(operations.map(({ entry }) => entry.section))];
  const order = (section) => {
    const index = FAMILIES.findIndex((family) => family.section === section);
    return index === -1 ? FAMILIES.length : index;
  };
  sections.sort((a, b) => order(a) - order(b) || a.localeCompare(b));
  for (const section of sections) context.families.set(section, familyFor(section));

  const item = sections.map((section) => {
    const family = context.families.get(section);
    const inSection = operations.filter(({ entry }) => entry.section === section);
    const groups = new Map();
    for (const operation of inSection) {
      const group = operation.entry.markdown.split("/")[1];
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(operation);
    }
    const groupItems = [...groups.entries()]
      .sort(([, a], [, b]) => a[0].entry.tag.toLowerCase().localeCompare(b[0].entry.tag.toLowerCase()) || a[0].entry.tag.localeCompare(b[0].entry.tag))
      .map(([group, members]) => {
        const tag = members[0].entry.tag;
        const requests = members.map(({ entry, op }) => buildRequestItem(op, entry, context));
        // Distinguish requests that share a method and title, e.g. two paths for the same operation.
        const counts = new Map();
        for (const request of requests) counts.set(request.name, (counts.get(request.name) || 0) + 1);
        members.forEach(({ entry }, index) => {
          if (counts.get(requests[index].name) > 1) requests[index].name = `${requests[index].name} (${entry.path})`;
        });
        return {
          id: stableId("folder", section, group),
          name: tag,
          description: `${tag} operations in the ${family.title}. Reference: ${link(`${tag}`, pageUrl(siteUrl, `${section}/${group}/README.md`))}.`,
          item: requests,
        };
      });
    return {
      id: stableId("folder", section),
      name: family.title,
      description: familyDescription(family, inSection, context),
      item: groupItems,
    };
  });

  return {
    info: {
      _postman_id: stableId("collection"),
      name: COLLECTION_NAME,
      description: collectionDescription(context),
      schema: COLLECTION_SCHEMA,
    },
    item,
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: `{{${VARIABLES.accessToken}}}`, type: "string" }],
    },
  };
}
