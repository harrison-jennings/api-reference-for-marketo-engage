/**
 * Copies what the site serves as static files, and generates its data files.
 * Run before every build. reference/, postman/ and docs-site/ are only read.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(WEB, "..");
const REFERENCE = path.join(REPO, "reference");
const PUBLIC = path.join(WEB, "public");

const SECTIONS = { asset: "Asset API", core: "Core API", "data-ingestion": "Data Ingestion API", identity: "Identity API", "user-management": "User Management API" };
const short = (section) => SECTIONS[section].replace(/ API$/, "");
const plural = (count, noun) => `${count} ${noun}${count === 1 ? "" : "s"}`;

for (const folder of ["reference", "downloads", "assets/data", "assets/request-builder"]) fs.rmSync(path.join(PUBLIC, folder), { recursive: true, force: true });

// Request Builder: it resolves its data relative to assets/request-builder/index.js.
fs.cpSync(path.join(REPO, "docs-site/docs/assets/request-builder"), path.join(PUBLIC, "assets/request-builder"), { recursive: true });

// Postman downloads.
fs.mkdirSync(path.join(PUBLIC, "downloads"), { recursive: true });
for (const file of ["marketo-engage.postman_collection.json", "marketo-engage.postman_environment.json"]) fs.copyFileSync(path.join(REPO, "postman", file), path.join(PUBLIC, "downloads", file));

const manifest = JSON.parse(fs.readFileSync(path.join(REFERENCE, "manifest.json"), "utf8"));
fs.mkdirSync(path.join(PUBLIC, "reference"), { recursive: true });
fs.copyFileSync(path.join(REFERENCE, "manifest.json"), path.join(PUBLIC, "reference/manifest.json"));

const operations = manifest.operations.map((entry) => {
  const destination = path.join(PUBLIC, "reference", entry.json);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(REFERENCE, entry.json), destination);
  return {
    id: entry.json.replace(/\.operation\.json$/, ""),
    section: entry.section,
    tag: entry.tag,
    method: entry.method.toUpperCase(),
    path: entry.path,
    title: entry.title,
    operationId: entry.operationId,
    page: `reference/${entry.markdown.replace(/\.md$/, "/")}`,
    json: `reference/${entry.json}`,
  };
});

const sections = Object.keys(SECTIONS).filter((section) => operations.some((operation) => operation.section === section));
const models = {};
for (const section of sections) {
  const readme = fs.readFileSync(path.join(REFERENCE, section, "models/README.md"), "utf8");
  models[section] = Object.fromEntries([...readme.matchAll(/^\|\s*\[([^\]]+)\]\(([^)]+)\.md\)\s*\|/gm)].map(([, name, slug]) => [name, `reference/${section}/models/${slug}/`]));
}

fs.mkdirSync(path.join(PUBLIC, "assets/data"), { recursive: true });

// The Request Builder's index: the same shape the MkDocs hook writes.
fs.writeFileSync(path.join(PUBLIC, "assets/data/site-index.json"), JSON.stringify({
  summary: manifest.summary,
  sections: sections.map((id) => ({ id, title: SECTIONS[id], page: `reference/${id}/`, operations: operations.filter((operation) => operation.section === id).length, models: Object.keys(models[id]).length })),
  operations,
  models,
}));

// The jump bar's index: names only, so exact matches are instant.
const entries = operations.map((operation) => ({ k: "op", m: operation.method, t: operation.title, i: operation.operationId, p: operation.path, g: `${short(operation.section)} · ${operation.tag}`, u: `/${operation.page}` }));
const groups = new Map();
for (const operation of operations) {
  const key = `${operation.section}/${operation.tag}`;
  if (!groups.has(key)) groups.set(key, { ...operation, count: 0 });
  groups.get(key).count += 1;
}
for (const group of groups.values()) {
  entries.push({ k: "group", t: group.tag, i: group.tag.replace(/\s+/g, ""), g: `${short(group.section)} · ${plural(group.count, "operation")}`, u: `/${group.page.split("/").slice(0, 3).join("/")}/` });
}
for (const section of sections) for (const [name, page] of Object.entries(models[section])) entries.push({ k: "model", t: name, g: `${short(section)} models`, u: `/${page}` });
const parameters = new Map();
for (const entry of manifest.operations) {
  const document = JSON.parse(fs.readFileSync(path.join(REFERENCE, entry.json), "utf8"));
  const node = Object.values(document.paths)[0][entry.method.toLowerCase()];
  for (const parameter of node.parameters || []) if (parameter.in !== "body" && parameter.name) parameters.set(parameter.name, (parameters.get(parameter.name) || 0) + 1);
}
for (const [name, count] of [...parameters].sort(([a], [b]) => a.localeCompare(b))) entries.push({ k: "param", t: name, g: `Parameter in ${plural(count, "operation")}`, u: `/search/?q=${encodeURIComponent(name)}` });
fs.writeFileSync(path.join(PUBLIC, "assets/data/jump-index.json"), JSON.stringify(entries));

console.log(`Prepared ${operations.length} operations, ${entries.length} jump entries.`);
