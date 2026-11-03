/**
 * Schema resolution for Swagger 2.0 and OpenAPI 3.x documents.
 *
 * Operation files in reference/ are self-contained: every definition an
 * operation references is embedded in the same document, so only local
 * JSON-pointer references ("#/...") need to be supported.
 */

const MAX_MERGE_DEPTH = 16;

export function decodePointerToken(token) {
  let decoded = token;
  try {
    decoded = decodeURIComponent(token);
  } catch {
    // Keep the raw token when it is not valid percent-encoding.
  }
  return decoded.replace(/~1/g, "/").replace(/~0/g, "~");
}

/** Return the final segment of a reference, e.g. "EmailResponse". */
export function refName(ref) {
  if (typeof ref !== "string") return "";
  const tokens = ref.split("/");
  return decodePointerToken(tokens[tokens.length - 1] || "");
}

export function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function createResolver(doc) {
  const root = isPlainObject(doc) ? doc : {};

  function resolvePointer(ref) {
    if (typeof ref !== "string" || !ref.startsWith("#")) {
      throw new Error(`Only local references are supported: ${ref}`);
    }
    const tokens = ref.slice(1).split("/").slice(1).map(decodePointerToken);
    let current = root;
    for (const token of tokens) {
      if (!isPlainObject(current) && !Array.isArray(current)) {
        throw new Error(`Unresolvable reference: ${ref}`);
      }
      if (!(token in current)) {
        throw new Error(`Unresolvable reference: ${ref}`);
      }
      current = current[token];
    }
    return current;
  }

  /**
   * Follow $ref chains. Sibling keywords next to a $ref (description, example)
   * are kept and override the target, which matches how the generated
   * reference documents render them. The name of the first reference is
   * exposed as refName so callers can link to model pages.
   */
  function deref(schema, seen = new Set()) {
    if (!isPlainObject(schema) || typeof schema.$ref !== "string") {
      return schema;
    }
    if (seen.has(schema.$ref)) {
      return { refName: refName(schema.$ref), circular: true };
    }
    const nextSeen = new Set(seen).add(schema.$ref);
    const target = deref(resolvePointer(schema.$ref), nextSeen);
    const { $ref, ...siblings } = schema;
    return {
      ...(isPlainObject(target) ? target : {}),
      ...siblings,
      refName: refName($ref),
    };
  }

  /** Dereference and flatten allOf into a single schema. */
  function flatten(schema, depth = 0) {
    const resolved = deref(schema);
    if (!isPlainObject(resolved) || !Array.isArray(resolved.allOf) || depth > MAX_MERGE_DEPTH) {
      return resolved;
    }
    const { allOf, ...rest } = resolved;
    let merged = {};
    for (const part of allOf) {
      merged = mergeSchemas(merged, flatten(part, depth + 1));
    }
    const result = mergeSchemas(merged, rest);
    if (resolved.refName) result.refName = resolved.refName;
    return result;
  }

  return { root, resolvePointer, deref, flatten };
}

function mergeSchemas(base, extra) {
  if (!isPlainObject(extra)) return base;
  const merged = { ...base, ...extra };
  if (base.properties || extra.properties) {
    merged.properties = { ...(base.properties || {}), ...(extra.properties || {}) };
  }
  if (base.required || extra.required) {
    merged.required = [...new Set([...(base.required || []), ...(extra.required || [])])];
  }
  if (!merged.type && merged.properties) merged.type = "object";
  return merged;
}

/**
 * Descriptions marking a property as response-only, e.g. Marketo's `seq`
 * ("should only be part of responses and should not be submitted"), `reasons`
 * ("only present in API responses"), `reason` ("why an operation did not
 * succeed") and Lead `membership` ("Only returned via Get Leads By Program Id").
 */
const RESPONSE_ONLY = /should not be submitted|only present in api responses|should only be part of responses|did not succeed|only returned via/i;

export function isResponseOnly(schema) {
  return isPlainObject(schema) && RESPONSE_ONLY.test(schema.description || "");
}

/**
 * Whether an object schema is a response model reused for request input. Its
 * `required` list describes responses (e.g. CustomObject requires marketoGUID
 * and seq), so it is not enforced on requests.
 */
export function isResponseModel(schema, resolver) {
  const properties = isPlainObject(schema?.properties) ? schema.properties : {};
  return Object.values(properties).some((property) => isResponseOnly(property) || isResponseOnly(resolver ? resolver.deref(property) : property));
}

/** A short human-readable type label, e.g. "integer (int32)" or "array of string", matching the reference pages. */
export function describeType(schema, resolver) {
  const resolved = resolver ? resolver.flatten(schema) : schema;
  if (!isPlainObject(resolved)) return "any";
  if (resolved.refName && resolved.type !== "array") return resolved.refName;
  if (resolved.type === "array") {
    return `array of ${describeType(resolved.items || {}, resolver)}`;
  }
  const type = resolved.type || (resolved.properties ? "object" : "any");
  return resolved.format && resolved.format !== type ? `${type} (${resolved.format})` : type;
}
