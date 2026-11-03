/**
 * Deterministic, schema-driven mock data.
 *
 * Values depend only on the schema and property names, never on randomness or
 * the clock, so the same operation always produces the same mock. Examples
 * and defaults from the specification take precedence over synthetic values.
 */

import { isPlainObject, isResponseOnly } from "./schema.js";

export const MOCK_DATE_TIME = "2026-01-15T10:30:00Z";
export const MOCK_DATE = "2026-01-15";
const MOCK_ID = 1234;

const DEFAULT_OPTIONS = {
  arrayItems: 2, // items in the outermost array
  nestedArrayItems: 1, // items in arrays nested inside another array
  maxDepth: 12,
  useExamples: true,
  forRequest: false, // omit response-only properties such as seq and reasons
};

function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

export function humanize(name) {
  return String(name)
    .replace(/[_\-.]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function singular(name) {
  return /[^s]s$/i.test(name) ? name.slice(0, -1) : name;
}

export function isIdName(name) {
  return /^id$/i.test(name) || /[a-z0-9]Id$/.test(name) || /_id$/i.test(name);
}

function clamp(value, schema) {
  let result = value;
  if (typeof schema.minimum === "number" && result < schema.minimum) result = schema.minimum;
  if (typeof schema.maximum === "number" && result > schema.maximum) result = schema.maximum;
  return result;
}

export function mockString(schema, name, index) {
  const suffix = index > 0 ? ` ${index + 1}` : "";
  switch (schema.format) {
    case "date-time": return MOCK_DATE_TIME;
    case "date": return MOCK_DATE;
    case "email": return index > 0 ? `example${index + 1}@example.com` : "example@example.com";
    case "uri":
    case "url": return "https://example.com";
    case "uuid": return "00000000-0000-4000-8000-000000000000";
    case "byte": return "ZXhhbXBsZQ==";
    case "binary": return "<binary content>";
    case "password": return "<PASSWORD>";
    default: break;
  }
  if (!name) return `Example value${suffix}`;
  if (/email/i.test(name)) return index > 0 ? `example${index + 1}@example.com` : "example@example.com";
  if (/(url|uri|href|link)$/i.test(name)) return "https://example.com";
  if (/^(date|time|timestamp)$/i.test(name) || /[a-z](At|Date|Time)$/.test(name) || /_(at|date|time)$/i.test(name)) {
    return MOCK_DATE_TIME;
  }
  if (name === "requestId") return "1a2b#3c4d5e6f7a8";
  if (isIdName(name)) return String(MOCK_ID + index);
  if (/token/i.test(name)) return "example-token";
  return `Example ${humanize(name)}${suffix}`;
}

function mockValue(schema, ctx) {
  const { resolver, options } = ctx;
  if (!isPlainObject(schema) || ctx.depth > options.maxDepth) return undefined;

  let refStack = ctx.refStack;
  if (typeof schema.$ref === "string") {
    if (refStack.includes(schema.$ref)) return undefined; // recursive model
    refStack = [...refStack, schema.$ref];
  }
  const resolved = resolver ? resolver.flatten(schema) : schema;
  if (!isPlainObject(resolved) || resolved.circular) return undefined;

  if (options.useExamples && resolved.example !== undefined) return clone(resolved.example);
  if (resolved.default !== undefined) return clone(resolved.default);
  if (Array.isArray(resolved.enum) && resolved.enum.length) return clone(resolved.enum[0]);

  const next = { ...ctx, refStack, depth: ctx.depth + 1 };
  const type = resolved.type
    || (resolved.properties || resolved.additionalProperties ? "object" : resolved.items ? "array" : undefined);

  switch (type) {
    case "object": {
      const result = {};
      for (const [property, propertySchema] of Object.entries(resolved.properties || {})) {
        if (options.forRequest && isResponseOnly(propertySchema)) continue;
        const value = mockValue(propertySchema, { ...next, name: property });
        if (value !== undefined) result[property] = value;
      }
      if (!resolved.properties && isPlainObject(resolved.additionalProperties)) {
        const value = mockValue(resolved.additionalProperties, { ...next, name: "additionalProp1" });
        if (value !== undefined) result.additionalProp1 = value;
      }
      return result;
    }
    case "array": {
      let count = ctx.arrayDepth === 0 ? options.arrayItems : options.nestedArrayItems;
      if (typeof resolved.minItems === "number") count = Math.max(count, resolved.minItems);
      if (typeof resolved.maxItems === "number") count = Math.min(count, resolved.maxItems);
      const items = [];
      for (let index = 0; index < count; index += 1) {
        const value = mockValue(resolved.items || {}, {
          ...next,
          name: ctx.name ? singular(ctx.name) : "",
          index,
          arrayDepth: ctx.arrayDepth + 1,
        });
        if (value !== undefined) items.push(value);
      }
      return items;
    }
    case "integer":
      return clamp(isIdName(ctx.name || "") ? MOCK_ID + ctx.index : 1, resolved);
    case "number":
      return clamp(1.5, resolved);
    case "boolean":
      return true;
    case "file":
      return "<binary file content>";
    case "string":
      return mockString(resolved, ctx.name, ctx.index);
    case "null":
      return null;
    default:
      return {};
  }
}

/**
 * Generate a mock value for any schema.
 * options.name: property name used for name-based values.
 * options.index: position within a list (IDs and labels count up from it).
 * options.arrayDepth: set to 1 when the value is already an array item, so
 * nested arrays use nestedArrayItems.
 */
export function generateMock(schema, resolver, options = {}) {
  return mockValue(schema, {
    resolver,
    options: { ...DEFAULT_OPTIONS, ...options },
    name: options.name || "",
    index: options.index || 0,
    depth: 0,
    arrayDepth: options.arrayDepth || 0,
    refStack: [],
  });
}

/**
 * Marketo REST responses share an envelope of requestId, success, result,
 * errors and warnings. The schema describes errors/warnings as arrays of
 * items, but a successful response carries none, so empty them for 2xx.
 */
function applySuccessEnvelope(value, schema, resolver) {
  const resolved = resolver ? resolver.flatten(schema) : schema;
  const properties = resolved?.properties || {};
  const flat = (name) => (properties[name] ? resolver.flatten(properties[name]) : null);
  if (!isPlainObject(value) || flat("success")?.type !== "boolean" || flat("errors")?.type !== "array") {
    return value;
  }
  const result = { ...value, success: true, errors: [] };
  if (flat("warnings")?.type === "array") result.warnings = [];
  return result;
}

/** Choose the response shown by default: the first documented 2xx, else the first. */
export function defaultResponseCode(operation) {
  const success = operation.responses.find((response) => /^2\d\d$/.test(response.code));
  return (success || operation.responses[0])?.code ?? null;
}

/**
 * Generate a mock response for one documented status code.
 * Returns { status, description, contentType, body, source }, where source is
 * "example" (documented example), "schema" (synthesised) or "none".
 */
export function generateResponseMock(operation, code, options = {}) {
  const response = operation.responses.find((candidate) => candidate.code === code);
  if (!response) throw new Error(`Response ${code} is not documented for this operation`);
  const base = { status: response.code, description: response.description, contentType: response.contentType || "application/json" };
  if (response.example !== undefined) {
    return { ...base, body: clone(response.example), source: "example" };
  }
  if (!response.schema) {
    return { ...base, body: undefined, source: "none" };
  }
  let body = generateMock(response.schema, operation.resolver, options);
  if (/^2\d\d$/.test(response.code)) body = applySuccessEnvelope(body, response.schema, operation.resolver);
  return { ...base, body, source: "schema" };
}
