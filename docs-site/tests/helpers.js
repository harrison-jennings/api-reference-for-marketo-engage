import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const REFERENCE_DIR = join(REPO_ROOT, "reference");

export function readJson(...segments) {
  return JSON.parse(readFileSync(join(REPO_ROOT, ...segments), "utf8"));
}

/** Load a generated operation document by its reference/ path without the suffix. */
export function loadOperation(id) {
  return readJson("reference", `${id}.operation.json`);
}

/**
 * Build a single-operation OpenAPI 3 document straight from the source
 * Data Ingestion specification, keeping the complete components object.
 */
export function loadOpenApi3Operation(path) {
  const spec = readJson("specs", "swagger-data-ingestion.json");
  return { ...spec, paths: { [path]: spec.paths[path] } };
}

export function allOperationFiles(directory = REFERENCE_DIR) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...allOperationFiles(path));
    else if (entry.name.endsWith(".operation.json")) files.push(relative(REFERENCE_DIR, path));
  }
  return files.sort();
}
