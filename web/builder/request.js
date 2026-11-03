/**
 * Build a request description from a normalised operation and the current
 * builder state. The result is plain data: it is rendered as a preview and
 * turned into code samples, but never sent anywhere.
 */

import { parseBaseUrl, parseField, validateValue } from "./validate.js";

const PLACEHOLDER = /^<[A-Z][A-Z0-9_]*>$/;
const ARRAY_SEPARATORS = { csv: ",", ssv: " ", tsv: "\t", pipes: "|" };

/**
 * Percent-encode a query component, leaving credential placeholders readable.
 * Commas are valid in query strings and keep lists such as
 * fields=firstName,lastName in the form Marketo documents.
 */
export function encodeQueryComponent(value) {
  const text = String(value);
  return PLACEHOLDER.test(text) ? text : encodeURIComponent(text).replace(/%2C/g, ",");
}

export function substitutePath(path, values) {
  return path.replace(/\{([^}]+)\}/g, (match, name) => {
    const value = values[name];
    return value === undefined || value === "" ? match : encodeURIComponent(String(value));
  });
}

export function buildQueryString(pairs) {
  return pairs.map(([name, value]) => `${encodeQueryComponent(name)}=${encodeQueryComponent(value)}`).join("&");
}

/** Starter content for a JSON body: the documented example, else a schema mock. */
export function initialBodyValue(operation, mock) {
  const body = operation.body;
  if (!body || body.kind !== "json") return undefined;
  if (body.example !== undefined) return body.example;
  return mock ? mock(body.schema, operation.resolver, { forRequest: true }) : {};
}

/**
 * @param operation normalised operation
 * @param state { baseUrl, values: { [fieldKey]: raw }, bodyText }
 */
export function buildRequest(operation, state = {}) {
  const values = state.values || {};
  const errors = [];
  const addErrors = (key, messages) => messages.forEach((message) => errors.push({ key, message }));

  const base = parseBaseUrl(state.baseUrl, operation.defaultBaseUrl);
  addErrors("baseUrl", base.errors);

  const auth = operation.authentication;
  const parsed = new Map();
  for (const field of operation.fields) {
    const result = parseField(field, values[field.key], operation.resolver);
    parsed.set(field.key, result);
    addErrors(field.key, result.errors);
  }

  const pathValues = {};
  for (const field of operation.fields.filter((item) => item.in === "path")) {
    const result = parsed.get(field.key);
    if (result.present && !result.errors.length) pathValues[field.name] = result.text;
  }
  const path = substitutePath(operation.path, pathValues);

  const query = [];
  for (const field of operation.fields.filter((item) => item.in === "query")) {
    // Bearer-authenticated operations send the token in the Authorization
    // header, so an access_token query parameter is not repeated in the URL.
    if (field.credential && auth.type !== "client-credentials") continue;
    const result = parsed.get(field.key);
    if (!result.present || result.errors.length) continue;
    if (Array.isArray(result.text)) {
      if (field.arrayStyle === "multi") {
        result.text.forEach((item) => query.push([field.name, item]));
      } else {
        query.push([field.name, result.text.join(ARRAY_SEPARATORS[field.arrayStyle] ?? ",")]);
      }
    } else {
      query.push([field.name, result.text]);
    }
  }

  const headers = [];
  if (auth.type === "bearer") headers.push(auth.header);
  for (const field of operation.fields.filter((item) => item.in === "header")) {
    const result = parsed.get(field.key);
    if (result.present && !result.errors.length) headers.push([field.name, result.text]);
  }

  let body = null;
  if (operation.body) {
    body = buildBody(operation, state, parsed, addErrors);
    if (body.contentType && body.kind !== "form" && body.kind !== "multipart") {
      headers.push(["Content-Type", body.contentType]);
    }
  }

  const queryString = buildQueryString(query);
  const url = `${base.value}${path}${queryString ? `?${queryString}` : ""}`;
  return {
    method: operation.method,
    baseUrl: base.value,
    baseUrlNotes: base.notes,
    pathValues,
    path,
    urlWithoutQuery: `${base.value}${path}`,
    url,
    query,
    headers,
    body,
    errors,
    valid: errors.length === 0,
  };
}

function buildBody(operation, state, parsed, addErrors) {
  const { kind, contentType, fields: fieldDefinitions, required, schema } = operation.body;

  if (kind === "form" || kind === "multipart") {
    const fields = [];
    for (const field of fieldDefinitions || []) {
      const result = parseField(field, state.values?.[field.key], operation.resolver);
      parsed.set(field.key, result);
      addErrors(field.key, result.errors);
      if (!result.present || result.errors.length) continue;
      fields.push({ name: field.name, value: result.text, file: Boolean(result.file) });
    }
    return { kind, contentType, fields };
  }

  const text = state.bodyText;
  if (text === undefined || text.trim() === "") {
    const alternative = operation.body.alternativeTo && parsed.get(operation.body.alternativeTo);
    if (alternative) {
      if (!alternative.present) addErrors("body", [`Provide ${operation.body.alternativeTo.split(":")[1]} values or a request body.`]);
    } else if (required) {
      addErrors("body", ["Request body is required."]);
    }
    return { kind, contentType, text: "", value: undefined };
  }
  if (kind === "raw") return { kind, contentType, text, value: text };
  try {
    const value = JSON.parse(text);
    addErrors("body", validateValue(value, schema, operation.resolver, "body"));
    return { kind, contentType, text, value };
  } catch (error) {
    addErrors("body", [`Request body is not valid JSON: ${error.message}`]);
    return { kind, contentType, text, value: undefined };
  }
}
