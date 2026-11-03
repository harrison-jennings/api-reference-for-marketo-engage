/**
 * The model behind the Request Builder's Fields view: a tree of editable nodes
 * built from a schema and a value, which reads back as that value. It holds no
 * DOM, so it can be tested against every operation. Nothing is ever dropped: a
 * value that doesn't fit its schema is kept as a raw JSON node, and properties
 * the schema doesn't list are carried through untouched.
 */

import { isPlainObject, isResponseModel, isResponseOnly } from "./schema.js";

const MAX_DEPTH = 12;
const INTEGER = /^-?\d+$/;
const NUMBER = /^-?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/;

let nodeCounter = 0;

function typeOf(schema) {
  return schema.type || (schema.properties ? "object" : undefined);
}

/** Whether a schema is worth a form: an object with properties, or an array. */
export function supportsFields(schema, resolver) {
  const resolved = resolver.flatten(schema);
  if (!isPlainObject(resolved) || resolved.circular) return false;
  if (typeOf(resolved) === "object") return isPlainObject(resolved.properties) && Object.keys(resolved.properties).length > 0;
  return typeOf(resolved) === "array" && isPlainObject(resolved.items);
}

function scalarControl(schema) {
  if (Array.isArray(schema.enum) && schema.enum.length) return "enum";
  const type = typeOf(schema);
  return ["boolean", "integer", "number", "string"].includes(type) ? type : null;
}

function fitsScalar(value, schema) {
  if (value === undefined) return true;
  if (Array.isArray(schema.enum) && schema.enum.length) return schema.enum.includes(value);
  switch (typeOf(schema)) {
    case "boolean": return typeof value === "boolean";
    case "integer":
    case "number": return typeof value === "number";
    default: return typeof value === "string";
  }
}

function rawText(value) {
  return value === undefined ? "" : JSON.stringify(value, null, 2);
}

/**
 * @param schema the node's schema
 * @param resolver from createResolver
 * @param meta { name, required, item, root }
 * @param value current value, or undefined when not set
 */
export function buildNode(schema, resolver, meta = {}, value = undefined, depth = 0, stack = []) {
  const resolved = resolver.flatten(schema);
  const common = {
    id: (nodeCounter += 1),
    name: meta.name || "",
    required: Boolean(meta.required),
    item: Boolean(meta.item),
    root: Boolean(meta.root),
    schema: isPlainObject(resolved) ? resolved : {},
    source: schema,
  };
  const raw = () => ({ ...common, kind: "raw", text: rawText(value) });

  if (!isPlainObject(resolved) || resolved.circular || depth > MAX_DEPTH) return raw();
  if (resolved.refName && stack.includes(resolved.refName)) return raw();
  const nextStack = resolved.refName ? [...stack, resolved.refName] : stack;
  const type = typeOf(resolved);

  if (type === "object" && isPlainObject(resolved.properties) && Object.keys(resolved.properties).length) {
    if (value !== undefined && !isPlainObject(value)) return raw();
    const given = value || {};
    const enforce = !isResponseModel(resolved, resolver);
    const children = [];
    for (const [name, property] of Object.entries(resolved.properties)) {
      if (isResponseOnly(property) && !(name in given)) continue;
      const required = enforce && (resolved.required || []).includes(name) && !isResponseOnly(property);
      children.push(buildNode(property, resolver, { name, required }, given[name], depth + 1, nextStack));
    }
    const extras = Object.fromEntries(Object.entries(given).filter(([name]) => !(name in resolved.properties)));
    return { ...common, kind: "object", children, extras, keepEmpty: value !== undefined && Object.keys(value).length === 0 };
  }

  if (type === "array" && isPlainObject(resolved.items)) {
    if (value !== undefined && !Array.isArray(value)) return raw();
    const items = (value || []).map((item) => buildNode(resolved.items, resolver, { item: true }, item, depth + 1, nextStack));
    return { ...common, kind: "array", items, keepEmpty: Array.isArray(value) && value.length === 0, depth, stack: nextStack };
  }

  const control = scalarControl(resolved);
  if (control && fitsScalar(value, resolved)) {
    return { ...common, kind: "scalar", control, text: value === undefined ? "" : String(value), keepEmpty: value === "" };
  }
  return raw();
}

function readScalar(node) {
  const { text, control, schema } = node;
  if (text === "") return node.keepEmpty ? "" : undefined;
  const typed = text.trim();
  if (control === "enum") {
    const match = schema.enum.find((option) => String(option) === text);
    return match === undefined ? text : match;
  }
  if (control === "boolean") return typed === "true" ? true : typed === "false" ? false : text;
  if (control === "integer") return INTEGER.test(typed) && Number.isSafeInteger(Number(typed)) ? Number(typed) : text;
  if (control === "number") return NUMBER.test(typed) ? Number(typed) : text;
  return text;
}

function readRaw(node) {
  if (node.text.trim() === "") return undefined;
  try {
    return JSON.parse(node.text);
  } catch {
    // Kept as typed, so validation can report it and JSON view still shows it.
    return node.text;
  }
}

/** The node's value, or undefined when nothing is set. */
export function readNode(node) {
  if (node.kind === "scalar") return readScalar(node);
  if (node.kind === "raw") return readRaw(node);
  if (node.kind === "array") {
    const values = node.items.map(readNode).filter((value) => value !== undefined);
    return values.length || node.required || node.root || node.keepEmpty ? values : undefined;
  }
  const value = {};
  for (const child of node.children) {
    const childValue = readNode(child);
    if (childValue !== undefined) value[child.name] = childValue;
  }
  Object.assign(value, node.extras);
  return Object.keys(value).length || node.required || node.root || node.item || node.keepEmpty ? value : undefined;
}

export function setNodeText(node, text) {
  node.text = text;
  node.keepEmpty = false;
}

/** Add an empty item to an array node and return it. */
export function addItem(node, resolver) {
  const item = buildNode(node.schema.items, resolver, { item: true }, undefined, node.depth + 1, node.stack);
  node.items.push(item);
  return item;
}

export function removeItem(node, item) {
  node.items = node.items.filter((candidate) => candidate !== item);
  if (!node.items.length) node.keepEmpty = false;
}

/** Whether any value is set at or below this node. */
export function isSet(node) {
  return readNode(node) !== undefined && !(node.root && isEmpty(readNode(node)));
}

function isEmpty(value) {
  return Array.isArray(value) ? value.length === 0 : isPlainObject(value) && Object.keys(value).length === 0;
}

/**
 * Find the node a validation message is about. Messages start with the path
 * they describe, such as "body.input[0].leadId is required."
 */
export function nodeForMessage(root, message, rootLabel) {
  if (!message.startsWith(rootLabel)) return null;
  const rest = message.slice(rootLabel.length);
  const match = rest.match(/^((?:\.[^\s.[\]]+|\[\d+\])*)\s/);
  if (!match) return null;
  let node = root;
  for (const [, name, index] of match[1].matchAll(/\.([^\s.[\]]+)|\[(\d+)\]/g)) {
    if (name !== undefined) {
      if (node.kind !== "object") return null;
      node = node.children.find((child) => child.name === name);
    } else {
      if (node.kind !== "array") return null;
      node = node.items[Number(index)];
    }
    if (!node) return null;
  }
  return node;
}
