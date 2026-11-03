#!/usr/bin/env node
/**
 * Generate the Postman collection and environment template from reference/.
 *
 * Offline and deterministic: reads reference/manifest.json, the operation
 * files it lists, the model indexes and the site URL in web/site.json, and writes
 * the same bytes for the same inputs. Needs only Node.js 20 or later.
 *
 * Usage:
 *   node scripts/build_postman_collection.mjs [--output DIR] [--reference DIR]
 *
 * Writes DIR/marketo-engage.postman_collection.json and
 * DIR/marketo-engage.postman_environment.json (DIR defaults to postman/).
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { normaliseOperation } from "../web/builder/operation.js";
import { buildCollection, ingestionBaseUrl } from "./postman/collection.mjs";
import { buildEnvironment } from "./postman/environment.mjs";

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const COLLECTION_FILE = "marketo-engage.postman_collection.json";
export const ENVIRONMENT_FILE = "marketo-engage.postman_environment.json";

const MODEL_ROW = /^\|\s*\[([^\]]+)\]\(([^)]+\.md)\)\s*\|/gm;

/** The published site URL, from a committed file, so output never depends on the environment. */
export function readSiteUrl(path) {
  const { url } = JSON.parse(readFileSync(path, "utf8"));
  if (!url) throw new Error(`Could not find url in ${path}`);
  return url.endsWith("/") ? url : `${url}/`;
}

/** Model name → file name, from each section's models/README.md (as the site hook reads them). */
export function readModels(referenceDir, sections) {
  const models = {};
  for (const section of sections) {
    models[section] = {};
    let text = "";
    try {
      text = readFileSync(join(referenceDir, section, "models", "README.md"), "utf8");
    } catch {
      continue;
    }
    for (const [, name, file] of text.matchAll(MODEL_ROW)) models[section][name] = file;
  }
  return models;
}

export function serialise(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

/** Build both artifacts from a reference directory. */
export function generate({ referenceDir = join(REPO_ROOT, "reference"), sitePath = join(REPO_ROOT, "web", "site.json") } = {}) {
  const manifest = JSON.parse(readFileSync(join(referenceDir, "manifest.json"), "utf8"));
  const sections = [...new Set(manifest.operations.map((entry) => entry.section))].sort((a, b) => a.localeCompare(b));
  const siteUrl = readSiteUrl(sitePath);
  const loadOperation = (path) => JSON.parse(readFileSync(join(referenceDir, path), "utf8"));
  const collection = buildCollection(manifest, loadOperation, { siteUrl, models: readModels(referenceDir, sections) });
  const operations = manifest.operations.map((entry) => normaliseOperation(loadOperation(entry.json)));
  const environment = buildEnvironment({ ingestionBaseUrl: ingestionBaseUrl(operations) });
  return { manifest, collection, environment };
}

function main() {
  const { values } = parseArgs({
    options: {
      output: { type: "string", default: join(REPO_ROOT, "postman") },
      reference: { type: "string", default: join(REPO_ROOT, "reference") },
    },
  });
  const { manifest, collection, environment } = generate({ referenceDir: resolve(values.reference) });
  const output = resolve(values.output);
  mkdirSync(output, { recursive: true });
  writeFileSync(join(output, COLLECTION_FILE), serialise(collection));
  writeFileSync(join(output, ENVIRONMENT_FILE), serialise(environment));

  const requests = collection.item.flatMap((family) => family.item.flatMap((group) => group.item));
  const scripted = requests.filter((item) => item.event?.length).length;
  console.log(
    `Postman collection: ${requests.length} requests (${manifest.operations.length} operations in the manifest), ` +
      `${collection.item.length} API folders, ${scripted} with the Identity post-response script. ` +
      `Environment template: ${environment.values.length} variables.`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
