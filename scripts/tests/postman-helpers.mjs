/**
 * Shared helpers for the Postman export tests. The tests read the committed
 * files in postman/, so they check what users actually download.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { COLLECTION_FILE, ENVIRONMENT_FILE, REPO_ROOT, generate } from "../build_postman_collection.mjs";

export { REPO_ROOT };
export const POSTMAN_DIR = join(REPO_ROOT, "postman");

export function readText(...segments) {
  return readFileSync(join(REPO_ROOT, ...segments), "utf8");
}

export function readJson(...segments) {
  return JSON.parse(readText(...segments));
}

export const manifest = readJson("reference", "manifest.json");
export const collectionText = readText("postman", COLLECTION_FILE);
export const environmentText = readText("postman", ENVIRONMENT_FILE);
export const collection = JSON.parse(collectionText);
export const environment = JSON.parse(environmentText);

let fresh;
/** A fresh in-memory build from reference/, generated once per test file. */
export function freshBuild() {
  fresh ??= generate();
  return fresh;
}

/** Every request item with its folder trail: [{ item, folders: [familyFolder, groupFolder] }]. */
export function requestItems(root = collection) {
  const results = [];
  const visit = (node, folders) => {
    for (const child of node.item || []) {
      if (child.request) results.push({ item: child, folders });
      else visit(child, [...folders, child]);
    }
  };
  visit(root, []);
  return results;
}

export function folders(root = collection) {
  const results = [];
  const visit = (node) => {
    for (const child of node.item || []) {
      if (!child.request) {
        results.push(child);
        visit(child);
      }
    }
  };
  visit(root);
  return results;
}

/** The item generated for a manifest entry; ids are derived from section, method and path. */
export function itemsByOperation(stableId) {
  const byId = new Map(requestItems().map((entry) => [entry.item.id, entry]));
  return (entry) => byId.get(stableId("request", entry.section, entry.method, entry.path));
}

// ---------------------------------------------------------------------------
// Independent reading of the source operation documents
// ---------------------------------------------------------------------------

export function pointerToken(token) {
  return String(token).replace(/~/g, "~0").replace(/\//g, "~1");
}

export function resolvePointer(document, ref) {
  let target = document;
  for (const token of ref.replace(/^#\//, "").split("/")) {
    target = target?.[token.replace(/~1/g, "/").replace(/~0/g, "~")];
  }
  if (target === undefined) throw new Error(`Unresolvable reference ${ref}`);
  return target;
}

/** Follow $ref chains, returning the target and the JSON pointer it was found at. */
export function deref(document, node, pointer) {
  let current = node;
  let at = pointer;
  const seen = new Set();
  while (current && typeof current === "object" && typeof current.$ref === "string" && !seen.has(current.$ref)) {
    seen.add(current.$ref);
    at = current.$ref;
    const { $ref, ...siblings } = current;
    current = { ...resolvePointer(document, $ref), ...siblings };
  }
  return { node: current, pointer: at };
}

/** The operation object in a single-operation reference document. */
export function sourceOperation(document, entry) {
  const pathItem = document.paths[entry.path];
  const method = entry.method.toLowerCase();
  return { pathItem, operation: pathItem[method], pointer: `#/paths/${pointerToken(entry.path)}/${method}` };
}

/** Path-level and operation-level parameters, operation level overriding, with source pointers. */
export function sourceParameters(document, entry) {
  const { pathItem, operation, pointer } = sourceOperation(document, entry);
  const pathPointer = `#/paths/${pointerToken(entry.path)}`;
  const merged = new Map();
  const add = (list, base) => (list || []).forEach((raw, index) => {
    const { node } = deref(document, raw, `${base}/parameters/${index}`);
    if (node?.name && node?.in) merged.set(`${node.in}:${node.name}`, { parameter: node, pointer: `${base}/parameters/${index}` });
  });
  add(pathItem.parameters, pathPointer);
  add(operation.parameters, pointer);
  return [...merged.values()];
}

/** The line documenting a body property, e.g. "- `input[].email` · string · …", in a request description. */
export function propertyLine(description, path) {
  const body = description.split("### Request body")[1]?.split(/\n### /)[0] || "";
  const marker = `- \`${path}\` · `;
  return body.split("\n").find((line) => line.startsWith(marker)) || null;
}
