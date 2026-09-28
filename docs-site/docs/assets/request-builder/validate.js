/**
 * Client-side validation derived strictly from constraints present in the
 * source specification: required, type, enum, numeric/length bounds, and
 * pattern. No rules are invented beyond what the schema states.
 */

import { isPlainObject, isResponseModel, isResponseOnly } from "./schema.js";
import { PLACEHOLDERS } from "./operation.js";

const INTEGER = /^-?\d+$/;
const NUMBER = /^-?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/;
const MAX_DEPTH = 12;

/** Which kind of control a field needs. Shared by the UI and the parser. */
export function controlFor(field) {
  const schema = field.schema || {};
  if (field.credential) return "credential";
  if (schema.type === "file") return "file";
  if (field.in === "form" && (schema.type === "object" || schema.type === "array" || schema.properties)) return "json";
  if (schema.type === "array") return "list";
  if (schema.type === "object" || schema.properties) return "json";
  if (Array.isArray(schema.enum) && schema.enum.length) return "enum";
  if (schema.type === "boolean") return "boolean";
  if (schema.type === "integer") return "integer";
  if (schema.type === "number") return "number";
  return "text";
}

/**
 * Compile a specification regex. Patterns are often written for other engines
 * (Adobe's email pattern escapes a quote as \', which is invalid with the
 * JavaScript "u" flag), so retry without the flag before giving up.
 */
function compilePattern(pattern) {
  for (const flags of ["u", ""]) {
    try {
      return new RegExp(pattern, flags);
    } catch {
      // Try the next set of flags.
    }
  }
  return null;
}

/**
 * Constraints the schema states for an already-typed value: enum, numeric
 * bounds (including exclusive bounds in both the boolean and numeric forms),
 * string length and pattern, and array item counts. Shared by parameter and
 * form controls and by JSON bodies, so every value gets the same checks.
 */
export function constraintErrors(value, schema, label) {
  const errors = [];
  if (!isPlainObject(schema)) return errors;
  if (Array.isArray(schema.enum) && schema.enum.length && !schema.enum.some((option) => String(option) === String(value))) {
    errors.push(`${label} must be one of: ${schema.enum.join(", ")}.`);
  }
  if (typeof value === "number") {
    const { minimum, maximum, exclusiveMinimum, exclusiveMaximum } = schema;
    if (typeof minimum === "number" && (exclusiveMinimum === true ? value <= minimum : value < minimum)) {
      errors.push(`${label} must be ${exclusiveMinimum === true ? "greater than" : "at least"} ${minimum}.`);
    }
    if (typeof exclusiveMinimum === "number" && value <= exclusiveMinimum) errors.push(`${label} must be greater than ${exclusiveMinimum}.`);
    if (typeof maximum === "number" && (exclusiveMaximum === true ? value >= maximum : value > maximum)) {
      errors.push(`${label} must be ${exclusiveMaximum === true ? "less than" : "at most"} ${maximum}.`);
    }
    if (typeof exclusiveMaximum === "number" && value >= exclusiveMaximum) errors.push(`${label} must be less than ${exclusiveMaximum}.`);
  }
  if (typeof value === "string") {
    const length = [...value].length; // characters, not UTF-16 code units
    if (typeof schema.minLength === "number" && length < schema.minLength) {
      errors.push(`${label} must be at least ${schema.minLength} characters.`);
    }
    if (typeof schema.maxLength === "number" && length > schema.maxLength) {
      errors.push(`${label} must be at most ${schema.maxLength} characters.`);
    }
    if (typeof schema.pattern === "string") {
      const pattern = compilePattern(schema.pattern);
      // Patterns no JavaScript engine can compile are skipped rather than blocking input.
      if (pattern && !pattern.test(value)) errors.push(`${label} must match the pattern ${schema.pattern}.`);
    }
  }
  if (Array.isArray(value)) {
    if (typeof schema.minItems === "number" && value.length < schema.minItems) {
      errors.push(`${label} needs at least ${schema.minItems} items.`);
    }
    if (typeof schema.maxItems === "number" && value.length > schema.maxItems) {
      errors.push(`${label} allows at most ${schema.maxItems} items.`);
    }
  }
  return errors;
}

/** Parse a raw control value into its schema type, then apply the schema's constraints. */
function checkScalar(text, schema, label) {
  const type = schema.type;
  let value = text;
  if (type === "integer") {
    if (!INTEGER.test(text)) return { errors: [`${label} must be a whole number.`] };
    value = Number(text);
  } else if (type === "number") {
    if (!NUMBER.test(text)) return { errors: [`${label} must be a number.`] };
    value = Number(text);
  } else if (type === "boolean") {
    if (text !== "true" && text !== "false") return { errors: [`${label} must be true or false.`] };
    value = text === "true";
  }
  return { value, errors: constraintErrors(value, schema, label) };
}

/**
 * Parse a raw UI value for a field.
 * Returns { present, value, text, errors } where text is the URL/form
 * representation and value is the typed JSON representation. Pass the
 * operation resolver so nested $ref schemas in JSON fields are validated.
 */
export function parseField(field, raw, resolver = null) {
  const control = controlFor(field);
  const label = field.name;
  if (control === "credential") {
    return { present: true, value: field.credential, text: field.credential, errors: [] };
  }

  const input = raw === undefined || raw === null ? "" : String(raw);
  if (input.trim() === "") {
    return {
      present: false,
      errors: field.required ? [`${label} is required.`] : [],
    };
  }

  if (control === "file") {
    return { present: true, value: input.trim(), text: input.trim(), file: true, errors: [] };
  }

  if (control === "json") {
    try {
      const value = JSON.parse(input);
      const errors = validateValue(value, field.schema, resolver, label);
      return { present: true, value, text: JSON.stringify(value), errors };
    } catch {
      return { present: true, errors: [`${label} must be valid JSON.`] };
    }
  }

  if (control === "list") {
    const items = input.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const itemSchema = field.schema.items || {};
    const errors = [];
    const values = [];
    items.forEach((item, index) => {
      const result = checkScalar(item, itemSchema, `${label} item ${index + 1}`);
      errors.push(...result.errors);
      values.push(result.value);
    });
    if (field.required && !items.length) errors.push(`${label} is required.`);
    errors.push(...constraintErrors(items, field.schema, label));
    return { present: items.length > 0, value: values, text: items, errors };
  }

  const result = checkScalar(control === "text" ? input : input.trim(), field.schema || {}, label);
  return { present: true, value: result.value, text: control === "text" ? input : input.trim(), errors: result.errors };
}

function typeMatches(value, type) {
  switch (type) {
    case "object": return isPlainObject(value);
    case "array": return Array.isArray(value);
    case "string": return typeof value === "string";
    case "integer": return Number.isInteger(value);
    case "number": return typeof value === "number" && Number.isFinite(value);
    case "boolean": return typeof value === "boolean";
    default: return true;
  }
}

/** Validate a parsed JSON value against a schema. */
export function validateValue(value, schema, resolver, label = "body", depth = 0) {
  if (depth > MAX_DEPTH || !schema) return [];
  const resolved = resolver ? resolver.flatten(schema) : schema;
  if (!isPlainObject(resolved) || resolved.circular) return [];
  if (value === null) return resolved.nullable || resolved["x-nullable"] ? [] : [`${label} must not be null.`];

  const type = resolved.type || (resolved.properties ? "object" : undefined);
  if (type && !typeMatches(value, type)) {
    return [`${label} must be ${type === "integer" || type === "array" || type === "object" ? "an" : "a"} ${type}.`];
  }
  const errors = constraintErrors(value, resolved, label);
  if (isPlainObject(value) && isPlainObject(resolved.properties)) {
    const enforceRequired = !isResponseModel(resolved, resolver);
    for (const name of enforceRequired ? resolved.required || [] : []) {
      if (!(name in value) && !isResponseOnly(resolved.properties[name])) errors.push(`${label}.${name} is required.`);
    }
    for (const [name, propertySchema] of Object.entries(resolved.properties)) {
      if (name in value) {
        errors.push(...validateValue(value[name], propertySchema, resolver, `${label}.${name}`, depth + 1));
      }
    }
  }
  if (Array.isArray(value) && resolved.items) {
    value.forEach((item, index) => {
      errors.push(...validateValue(item, resolved.items, resolver, `${label}[${index}]`, depth + 1));
    });
  }
  return errors;
}

/** Normalise and validate an optional base URL. Credentials in URLs are rejected. */
export function parseBaseUrl(raw, fallback) {
  const input = String(raw || "").trim();
  if (!input) return { value: fallback || PLACEHOLDERS.baseUrl, errors: [], notes: [] };
  let url;
  try {
    url = new URL(input);
  } catch {
    return { value: fallback || PLACEHOLDERS.baseUrl, errors: ["Base URL must be a full URL, for example https://123-ABC-456.mktorest.com."], notes: [] };
  }
  const errors = [];
  if (url.protocol !== "https:" && url.protocol !== "http:") errors.push("Base URL must use https://.");
  if (url.username || url.password) errors.push("Base URL must not contain credentials.");
  if (url.search || url.hash) errors.push("Base URL must not contain a query string or fragment.");
  if (errors.length) return { value: fallback || PLACEHOLDERS.baseUrl, errors, notes: [] };
  // Keep the casing the user typed (URL() lowercases hosts such as 123-ABC-456).
  let value = input.replace(/\/+$/, "");
  const notes = [];
  // Admin > Web Services shows the REST endpoint as https://<instance>/rest and
  // the identity endpoint as https://<instance>/identity. Operation paths
  // already start with those segments, so drop them to avoid /rest/rest/...
  const service = value.match(/\/(rest|identity)$/i);
  if (service && url.pathname.replace(/\/+$/, "").toLowerCase() === `/${service[1].toLowerCase()}`) {
    value = value.slice(0, -service[0].length);
    notes.push(`Using ${value}: operation paths already include /${service[1]}.`);
  }
  return { value, errors: [], notes };
}
