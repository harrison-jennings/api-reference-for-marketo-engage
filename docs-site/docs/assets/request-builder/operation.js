/**
 * Normalise a Swagger 2.0 or OpenAPI 3.x operation document into a single
 * format-independent shape consumed by the validator, request builder, code
 * generators, mock generator, and UI.
 */

import { createResolver, isPlainObject } from "./schema.js";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "head", "options", "trace"];

export const PLACEHOLDERS = Object.freeze({
  baseUrl: "<MARKETO_BASE_URL>",
  accessToken: "<ACCESS_TOKEN>",
  clientId: "<CLIENT_ID>",
  clientSecret: "<CLIENT_SECRET>",
  filePath: "<FILE_PATH>",
});

/**
 * Parameters that carry credentials. These are never rendered as editable
 * inputs; code samples always use placeholders instead.
 */
const CREDENTIAL_PARAMETERS = {
  query: {
    access_token: PLACEHOLDERS.accessToken,
    client_id: PLACEHOLDERS.clientId,
    client_secret: PLACEHOLDERS.clientSecret,
  },
  header: {
    authorization: `Bearer ${PLACEHOLDERS.accessToken}`,
    "x-mkto-user-token": PLACEHOLDERS.accessToken,
  },
};

const JSON_TYPES = /^application\/(.+\+)?json\b/i;

export function credentialPlaceholder(location, name) {
  const table = CREDENTIAL_PARAMETERS[location];
  return table ? table[String(name).toLowerCase()] || null : null;
}

export function bodyKindFor(contentType) {
  if (!contentType) return "json";
  if (JSON_TYPES.test(contentType)) return "json";
  if (/^application\/x-www-form-urlencoded\b/i.test(contentType)) return "form";
  if (/^multipart\/form-data\b/i.test(contentType)) return "multipart";
  return "raw";
}

export function detectFormat(doc) {
  if (isPlainObject(doc) && typeof doc.openapi === "string" && doc.openapi.startsWith("3")) {
    return "openapi3";
  }
  if (isPlainObject(doc) && String(doc.swagger || "").startsWith("2")) {
    return "swagger2";
  }
  throw new Error("Unsupported document: expected Swagger 2.0 or OpenAPI 3.x");
}

/** Locate the (single) operation in a document, or a specific path + method. */
export function findOperation(doc, { path, method } = {}) {
  const paths = isPlainObject(doc.paths) ? doc.paths : {};
  for (const [candidatePath, pathItem] of Object.entries(paths)) {
    if (path && candidatePath !== path) continue;
    for (const candidateMethod of HTTP_METHODS) {
      if (method && candidateMethod !== method.toLowerCase()) continue;
      if (isPlainObject(pathItem[candidateMethod])) {
        return { path: candidatePath, method: candidateMethod, pathItem, operation: pathItem[candidateMethod] };
      }
    }
  }
  throw new Error("No operation found in document");
}

function parameterKey(parameter) {
  return `${parameter.in}:${parameter.name}`;
}

function mergeParameters(resolver, pathLevel = [], operationLevel = []) {
  const merged = new Map();
  for (const raw of [...pathLevel, ...operationLevel]) {
    const parameter = resolver.deref(raw);
    if (isPlainObject(parameter) && parameter.name && parameter.in) {
      merged.set(parameterKey(parameter), parameter);
    }
  }
  return [...merged.values()];
}

/** Swagger 2 keeps type information on the parameter; OpenAPI 3 nests it in schema. */
function parameterSchema(parameter, format) {
  if (format === "openapi3" || (parameter.schema && parameter.in !== "body")) {
    return parameter.schema || {};
  }
  const keys = [
    "type", "format", "items", "enum", "default", "example", "minimum", "maximum",
    "minLength", "maxLength", "pattern", "minItems", "maxItems",
  ];
  const schema = {};
  for (const key of keys) {
    if (key in parameter) schema[key] = parameter[key];
  }
  return schema;
}

/**
 * Marketo's Lead Database and Bulk APIs declare query arrays with
 * collectionFormat "multi" (repeated keys), but they take comma-separated
 * lists (e.g. fields=firstName,lastName), as the parameter descriptions and
 * Marketo's documentation state. Asset API v2 parameters without such a
 * description keep the declared format.
 */
function isCommaSeparatedList(parameter, path) {
  return /comma[\s-]separated/i.test(parameter.description || "") || /^\/(rest|bulk)\/v1\//.test(path);
}

/** How array values are serialised in the query string. */
function arrayStyle(parameter, format, path) {
  if (parameter.in === "query" && isCommaSeparatedList(parameter, path)) return "csv";
  if (format === "openapi3") {
    const style = parameter.style || "form";
    const explode = parameter.explode ?? style === "form";
    if (explode) return "multi";
    return { spaceDelimited: "ssv", pipeDelimited: "pipes" }[style] || "csv";
  }
  return parameter.collectionFormat || "csv";
}

function normaliseField(parameter, format, resolver, path = "") {
  const schema = resolver.flatten(parameterSchema(parameter, format));
  const credential = credentialPlaceholder(parameter.in, parameter.name);
  return {
    key: parameterKey(parameter),
    name: parameter.name,
    in: parameter.in,
    required: parameter.in === "path" ? true : Boolean(parameter.required),
    description: parameter.description || schema.description || "",
    schema,
    arrayStyle: schema.type === "array" ? arrayStyle(parameter, format, path) : null,
    credential,
    example: parameter.example ?? schema.example,
  };
}

function fieldsFromObjectSchema(schema, resolver, location) {
  const resolved = resolver.flatten(schema);
  if (!isPlainObject(resolved) || !isPlainObject(resolved.properties)) return null;
  const required = new Set(resolved.required || []);
  return Object.entries(resolved.properties).map(([name, propertySchema]) => {
    const flattened = resolver.flatten(propertySchema);
    return {
      key: `${location}:${name}`,
      name,
      in: location,
      required: required.has(name),
      description: flattened.description || "",
      schema: flattened,
      arrayStyle: null,
      credential: null,
      example: flattened.example,
    };
  });
}

function swagger2Body(operation, parameters, doc, resolver) {
  const consumes = operation.consumes || doc.consumes || [];
  const bodyParameter = parameters.find((parameter) => parameter.in === "body");
  const formParameters = parameters.filter((parameter) => parameter.in === "formData");

  if (bodyParameter) {
    const preferred = bodyParameter["x-selected-content-type"];
    const contentTypes = preferred ? [preferred] : consumes.length ? [...consumes] : ["application/json"];
    const contentType = contentTypes[0];
    const kind = bodyKindFor(contentType);
    const schema = bodyParameter.schema || {};
    const resolved = resolver.flatten(schema);
    let fields = null;
    if (kind === "form" || kind === "multipart") {
      fields = fieldsFromObjectSchema(schema, resolver, "form") || [
        normaliseField({ ...bodyParameter, in: "form", schema: undefined, ...resolved }, "swagger2", resolver),
      ];
    }
    return {
      name: bodyParameter.name,
      required: Boolean(bodyParameter.required),
      description: bodyParameter.description || "",
      contentTypes,
      contentType,
      kind,
      schema,
      refName: resolved.refName || null,
      example: schema.example ?? resolved.example,
      fields,
    };
  }

  if (formParameters.length) {
    const hasFile = formParameters.some((parameter) => parameter.type === "file");
    const contentTypes = consumes.length ? [...consumes] : [hasFile ? "multipart/form-data" : "application/x-www-form-urlencoded"];
    const contentType = hasFile ? "multipart/form-data" : contentTypes[0];
    return {
      name: null,
      required: formParameters.some((parameter) => parameter.required),
      description: "",
      contentTypes,
      contentType,
      kind: bodyKindFor(contentType) === "json" ? "form" : bodyKindFor(contentType),
      schema: null,
      refName: null,
      example: undefined,
      fields: formParameters.map((parameter) =>
        normaliseField({ ...parameter, in: "form" }, "swagger2", resolver),
      ),
    };
  }
  return null;
}

function openapi3Body(operation, resolver) {
  const requestBody = resolver.deref(operation.requestBody);
  if (!isPlainObject(requestBody) || !isPlainObject(requestBody.content)) return null;
  const contentTypes = Object.keys(requestBody.content);
  if (!contentTypes.length) return null;
  const contentType = contentTypes.find((type) => JSON_TYPES.test(type)) || contentTypes[0];
  const media = requestBody.content[contentType] || {};
  const schema = media.schema || {};
  const resolved = resolver.flatten(schema);
  const kind = bodyKindFor(contentType);
  let example = media.example;
  if (example === undefined && isPlainObject(media.examples)) {
    const first = Object.values(media.examples).map((entry) => resolver.deref(entry))[0];
    example = first?.value;
  }
  return {
    name: null,
    required: Boolean(requestBody.required),
    description: requestBody.description || "",
    contentTypes,
    contentType,
    kind,
    schema,
    refName: resolved.refName || null,
    example: example ?? schema.example ?? resolved.example,
    fields: kind === "form" || kind === "multipart" ? fieldsFromObjectSchema(schema, resolver, "form") || [] : null,
    media: requestBody.content,
  };
}

function responseSort(a, b) {
  const rank = (code) => (code === "default" ? 1000 : Number.parseInt(code, 10) || 999);
  return rank(a.code) - rank(b.code);
}

function normaliseResponses(operation, format, resolver) {
  const responses = isPlainObject(operation.responses) ? operation.responses : {};
  return Object.entries(responses)
    .map(([code, raw]) => {
      const response = resolver.deref(raw) || {};
      let schema = null;
      let example;
      let contentType = null;
      if (format === "openapi3") {
        const content = isPlainObject(response.content) ? response.content : {};
        contentType = Object.keys(content).find((type) => JSON_TYPES.test(type)) || Object.keys(content)[0] || null;
        const media = contentType ? content[contentType] : null;
        schema = media?.schema || null;
        example = media?.example;
        if (example === undefined && isPlainObject(media?.examples)) {
          example = resolver.deref(Object.values(media.examples)[0])?.value;
        }
      } else {
        schema = response.schema || null;
        if (isPlainObject(response.examples)) {
          contentType = Object.keys(response.examples).find((type) => JSON_TYPES.test(type)) || null;
          example = contentType ? response.examples[contentType] : undefined;
        }
      }
      const resolved = schema ? resolver.flatten(schema) : null;
      return {
        code,
        description: response.description || "",
        schema,
        refName: resolved?.refName || (resolved?.type === "array" ? resolver.flatten(resolved.items || {}).refName || null : null),
        example,
        contentType,
      };
    })
    .sort(responseSort);
}

function defaultBaseUrl(doc, format) {
  if (format === "openapi3") {
    const url = Array.isArray(doc.servers) && doc.servers[0]?.url;
    return url && /^https?:\/\//i.test(url) ? url.replace(/\/+$/, "") : null;
  }
  const host = doc.host;
  // The Marketo REST specifications use a localhost placeholder host; each
  // subscription has its own instance URL, so fall back to a placeholder.
  if (!host || /^localhost(:\d+)?$/i.test(host)) return null;
  const scheme = (doc.schemes || ["https"]).includes("https") ? "https" : doc.schemes[0];
  const basePath = (doc.basePath || "").replace(/\/+$/, "");
  return `${scheme}://${host}${basePath}`;
}

/**
 * How the request authenticates. Explicit credential parameters in the
 * specification take precedence; otherwise Marketo REST APIs use a bearer
 * token in the Authorization header.
 */
function authenticationFor(fields) {
  const credentialFields = fields.filter((field) => field.credential);
  const usesClientCredentials = credentialFields.some((field) => field.credential === PLACEHOLDERS.clientSecret);
  if (usesClientCredentials) {
    return { type: "client-credentials", header: null };
  }
  const tokenHeader = credentialFields.find((field) => field.in === "header");
  if (tokenHeader) {
    return { type: "header", header: [tokenHeader.name, tokenHeader.credential] };
  }
  return { type: "bearer", header: ["Authorization", `Bearer ${PLACEHOLDERS.accessToken}`] };
}

export function normaliseOperation(doc, selector = {}) {
  const format = detectFormat(doc);
  const resolver = createResolver(doc);
  const { path, method, pathItem, operation } = findOperation(doc, selector);
  const rawParameters = mergeParameters(resolver, pathItem.parameters, operation.parameters);

  const fields = rawParameters
    .filter((parameter) => ["path", "query", "header"].includes(parameter.in))
    .map((parameter) => normaliseField(parameter, format, resolver, path));

  const body = format === "openapi3" ? openapi3Body(operation, resolver) : swagger2Body(operation, rawParameters, doc, resolver);

  // Marketo list and lead operations accept record IDs either in an `id` query
  // list or in the JSON body ("Parameter can be specified if the request body
  // is empty"), so neither is required on its own; one of them is.
  const idList = fields.find((field) => field.in === "query" && field.name === "id" && field.schema.type === "array");
  if (idList && body?.kind === "json") {
    idList.required = false;
    body.required = false;
    body.alternativeTo = idList.key;
  }
  const produces = format === "openapi3" ? null : operation.produces || doc.produces || [];

  return {
    format,
    resolver,
    method: method.toUpperCase(),
    path,
    operationId: operation.operationId || "",
    summary: operation.summary || "",
    description: operation.description || "",
    deprecated: Boolean(operation.deprecated),
    tags: operation.tags || [],
    defaultBaseUrl: defaultBaseUrl(doc, format),
    fields,
    body,
    produces,
    responses: normaliseResponses(operation, format, resolver),
    authentication: authenticationFor(fields),
  };
}
