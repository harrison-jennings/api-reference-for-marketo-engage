/**
 * A small JSON Schema (draft-04) validator for the pinned Postman Collection
 * v2.1.0 schema, so that validation needs no npm packages.
 *
 * It implements every validation keyword that schema uses and refuses schemas
 * with any other keyword, so a schema update cannot silently weaken
 * validation: add support for the new keyword first.
 */

const ANNOTATIONS = new Set(["$schema", "id", "title", "description", "default", "definitions", "examples"]);
const SUPPORTED = new Set(["type", "$ref", "properties", "required", "items", "oneOf", "anyOf", "enum", "minimum", "maxLength"]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function typeMatches(value, type) {
  switch (type) {
    case "null":
      return value === null;
    case "array":
      return Array.isArray(value);
    case "object":
      return isObject(value);
    case "integer":
      return Number.isInteger(value);
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    default:
      return typeof value === type;
  }
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/** Check that a schema only uses keywords this validator implements. */
export function assertSupportedSchema(root) {
  const unsupported = new Set();
  const visit = (schema) => {
    if (!isObject(schema)) return;
    for (const [key, value] of Object.entries(schema)) {
      if (!SUPPORTED.has(key) && !ANNOTATIONS.has(key)) unsupported.add(key);
      if (key === "properties" || key === "definitions") Object.values(value).forEach(visit);
      else if (key === "items" && Array.isArray(value)) value.forEach(visit);
      else if (key === "items") visit(value);
      else if (key === "oneOf" || key === "anyOf") value.forEach(visit);
    }
  };
  visit(root);
  if (unsupported.size) throw new Error(`Unsupported JSON Schema keywords: ${[...unsupported].sort().join(", ")}`);
}

export function createValidator(root) {
  assertSupportedSchema(root);

  function resolve(ref) {
    if (!ref.startsWith("#/")) throw new Error(`Only local references are supported: ${ref}`);
    let target = root;
    for (const token of ref.slice(2).split("/")) {
      target = target?.[token.replace(/~1/g, "/").replace(/~0/g, "~")];
    }
    if (target === undefined) throw new Error(`Unresolvable reference: ${ref}`);
    return target;
  }

  function validate(value, schema, path, errors) {
    if (!isObject(schema)) return;
    if (schema.$ref) {
      // In draft-04, $ref replaces the rest of the schema.
      validate(value, resolve(schema.$ref), path, errors);
      return;
    }
    if (schema.type !== undefined) {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];
      if (!types.some((type) => typeMatches(value, type))) {
        errors.push(`${path}: expected ${types.join(" or ")}`);
        return;
      }
    }
    if (schema.enum && !schema.enum.some((option) => deepEqual(option, value))) {
      errors.push(`${path}: must be one of ${JSON.stringify(schema.enum)}`);
    }
    if (schema.minimum !== undefined && typeof value === "number" && value < schema.minimum) {
      errors.push(`${path}: must be at least ${schema.minimum}`);
    }
    if (schema.maxLength !== undefined && typeof value === "string" && [...value].length > schema.maxLength) {
      errors.push(`${path}: must be at most ${schema.maxLength} characters`);
    }
    if (isObject(value)) {
      for (const name of schema.required || []) {
        if (!(name in value)) errors.push(`${path}: missing required property "${name}"`);
      }
      for (const [name, propertySchema] of Object.entries(schema.properties || {})) {
        if (name in value) validate(value[name], propertySchema, `${path}.${name}`, errors);
      }
    }
    if (Array.isArray(value) && schema.items) {
      value.forEach((item, index) => {
        const itemSchema = Array.isArray(schema.items) ? schema.items[index] : schema.items;
        if (itemSchema) validate(item, itemSchema, `${path}[${index}]`, errors);
      });
    }
    if (schema.anyOf) {
      const results = schema.anyOf.map((option) => check(value, option, path));
      if (!results.some((result) => result.length === 0)) errors.push(`${path}: does not match any allowed form (${closest(results)})`);
    }
    if (schema.oneOf) {
      const results = schema.oneOf.map((option) => check(value, option, path));
      const matches = results.filter((result) => result.length === 0).length;
      if (matches === 0) errors.push(`${path}: does not match any allowed form (${closest(results)})`);
      else if (matches > 1) errors.push(`${path}: matches ${matches} of the allowed forms; expected exactly 1`);
    }
  }

  /** The most specific error of the branch that came closest to matching. */
  function closest(results) {
    const best = results.reduce((a, b) => (b.length < a.length ? b : a));
    return best.reduce((a, b) => (b.split(/[.[]/).length > a.split(/[.[]/).length ? b : a));
  }

  function check(value, schema = root, path = "$") {
    const errors = [];
    validate(value, schema, path, errors);
    return errors;
  }

  return check;
}
