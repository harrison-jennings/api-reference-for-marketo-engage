/**
 * Reads the generated reference at build time. reference/ stays the single
 * source of truth and stays readable on GitHub; nothing here writes to it.
 */
import fs from "node:fs";
import path from "node:path";

export const REPO = path.resolve(process.cwd(), "..");
export const REFERENCE = path.join(REPO, "reference");

export const SECTIONS = {
  asset: { title: "Asset API", short: "Asset", summary: "Emails, templates, forms, landing pages, programs, smart campaigns, smart lists, files, folders, snippets and tokens." },
  core: { title: "Core API", short: "Core", summary: "Leads, activities, campaigns, companies, custom objects, opportunities, lists, bulk jobs and usage." },
  "data-ingestion": { title: "Data Ingestion API", short: "Data Ingestion", summary: "High-volume, asynchronous ingestion of persons, companies, custom objects and memberships." },
  identity: { title: "Identity API", short: "Identity", summary: "OAuth client-credentials token issuance." },
  "user-management": { title: "User Management API", short: "User Management", summary: "Users, invitations, roles and workspaces." },
};
export const SECTION_ORDER = Object.keys(SECTIONS);

const UPSTREAM_DOCS_ORIGIN = "https://developers.marketo.com";

export const manifest = JSON.parse(fs.readFileSync(path.join(REFERENCE, "manifest.json"), "utf8"));
export const operations = manifest.operations.map((entry) => {
  const [section, group] = entry.markdown.split("/");
  const slug = path.basename(entry.markdown, ".md");
  return { ...entry, group, slug, id: entry.json.replace(/\.operation\.json$/, ""), route: `/reference/${section}/${group}/${slug}/` };
});

const sortByName = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

/** Endpoint groups of one API, sorted by name. */
export function groupsOf(section) {
  const groups = new Map();
  for (const operation of operations.filter((item) => item.section === section)) {
    if (!groups.has(operation.tag)) groups.set(operation.tag, { tag: operation.tag, slug: operation.group, section, route: `/reference/${section}/${operation.group}/`, operations: [] });
    groups.get(operation.tag).operations.push(operation);
  }
  return [...groups.values()].sort((a, b) => sortByName(a.tag, b.tag));
}

export const specification = (section) => manifest.specifications.find((item) => item.section === section);

const operationDocuments = new Map();
export function operationDocument(operation) {
  if (!operationDocuments.has(operation.json)) operationDocuments.set(operation.json, JSON.parse(fs.readFileSync(path.join(REFERENCE, operation.json), "utf8")));
  return operationDocuments.get(operation.json);
}

export const definitionsOf = (document) => document.definitions || document.components?.schemas || {};
export const refName = (ref) => String(ref || "").split("/").pop();

// --- models -----------------------------------------------------------------

const MODEL_ROW = /^\|\s*\[([^\]]+)\]\(([^)]+)\.md\)\s*\|/gm;

function specificationDefinitions(section) {
  const document = JSON.parse(fs.readFileSync(path.join(REPO, "specs", specification(section).source), "utf8"));
  return definitionsOf(document);
}

const modelIndex = new Map();
function buildModels(section) {
  const definitions = { ...specificationDefinitions(section) };
  const users = new Map();
  for (const operation of operations.filter((item) => item.section === section)) {
    for (const [name, schema] of Object.entries(definitionsOf(operationDocument(operation)))) {
      definitions[name] = schema;
      if (!users.has(name)) users.set(name, []);
      users.get(name).push(operation);
    }
  }
  const readme = fs.readFileSync(path.join(REFERENCE, section, "models", "README.md"), "utf8");
  const models = [...readme.matchAll(MODEL_ROW)].map(([, name, slug]) => ({
    name, slug, section, route: `/reference/${section}/models/${slug}/`, users: users.get(name) || [],
    properties: Object.keys(definitions[name]?.properties || {}).length,
    kind: name.startsWith("ResponseOf") ? "Response wrapper" : name.endsWith("Request") ? "Request" : "Object",
  }));
  return { definitions, models, byName: new Map(models.map((model) => [model.name, model])) };
}
export function modelsIn(section) {
  if (!modelIndex.has(section)) modelIndex.set(section, buildModels(section));
  return modelIndex.get(section);
}
export const allModels = () => SECTION_ORDER.flatMap((section) => modelsIn(section).models);
export const modelMarkdown = (model) => fs.readFileSync(path.join(REFERENCE, model.section, "models", `${model.slug}.md`), "utf8");

// --- text -------------------------------------------------------------------

export const escapeHtml = (text) => String(text ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const decodeEntities = (text) => text.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
export const plainText = (text) => decodeEntities(String(text ?? "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/**
 * Long names stay whole in the HTML, because Pagefind treats a <wbr> as a word
 * boundary and would no longer find an exact operation ID. site.js adds the
 * break opportunities in the browser; CSS wraps them anywhere without it.
 */
export const breakable = (text) => escapeHtml(text);

export function pathHtml(value) {
  return String(value).split(/(\{[^}]+\})/).map((part) => (part.startsWith("{") ? `<span class="pv">${escapeHtml(part)}</span>` : escapeHtml(part))).join("");
}

/** Upstream HTML reduced to escaped text, keeping only links and inline code. */
export function richText(html) {
  const parts = String(html ?? "").split(/(<a\s[^>]*href="[^"]*"[^>]*>.*?<\/a>|<code>.*?<\/code>)/is);
  return parts.map((part) => {
    const link = part.match(/^<a\s[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>$/is);
    if (link) {
      const href = link[1].startsWith("/") ? UPSTREAM_DOCS_ORIGIN + link[1] : link[1];
      return /^https?:\/\//.test(href) ? `<a class="ln" href="${escapeHtml(href)}">${escapeHtml(plainText(link[2]))}</a>` : escapeHtml(plainText(link[2]));
    }
    const code = part.match(/^<code>(.*?)<\/code>$/is);
    if (code) return `<code class="ic">${escapeHtml(decodeEntities(code[1]))}</code>`;
    return escapeHtml(plainText(part));
  }).join(" ").replace(/\s+([.,;:])/g, "$1").trim();
}

const PERMISSIONS = /Required Permissions?:\s*([^<\n]+)/i;
export function permissionsOf(description) {
  const match = String(description ?? "").match(PERMISSIONS);
  return match ? match[1].split(/,| and /).map((item) => item.trim().replace(/\.$/, "")).filter(Boolean) : [];
}

/** Description paragraphs without the permissions sentence; whole-code paragraphs become blocks. */
export function descriptionBlocks(description) {
  const text = String(description ?? "").replace(PERMISSIONS, "");
  return text.split(/(?:<br\s*\/?>\s*){2,}|\n\n/).map((part) => part.trim()).filter(Boolean).map((part) => {
    const codes = [...part.matchAll(/<code>(.*?)<\/code>/gis)].map((match) => decodeEntities(match[1]));
    if (codes.length && !plainText(part.replace(/<code>.*?<\/code>/gis, ""))) return { code: codes.join("\n") };
    return { html: richText(part) };
  }).filter((block) => block.code || block.html);
}

// --- operation pages --------------------------------------------------------

export function typeLabel(schema) {
  if (schema.$ref) return { text: "", ref: refName(schema.$ref) };
  if (schema.type === "array" || schema.items) {
    const items = schema.items || {};
    return items.$ref ? { text: "array of ", ref: refName(items.$ref) } : { text: `array of ${items.type || "value"}`, ref: null };
  }
  const base = schema.type || "object";
  return { text: schema.format ? `${base} (${schema.format})` : base, ref: null };
}

export const childRef = (schema) => (schema.$ref ? refName(schema.$ref) : schema.items?.$ref ? refName(schema.items.$ref) : null);

export function propertiesOf(name, definitions) {
  const schema = definitions[name];
  if (!schema) return { properties: {}, required: [] };
  const merged = { properties: { ...(schema.properties || {}) }, required: [...(schema.required || [])] };
  for (const part of schema.allOf || []) {
    const inner = part.$ref ? propertiesOf(refName(part.$ref), definitions) : { properties: part.properties || {}, required: part.required || [] };
    Object.assign(merged.properties, inner.properties);
    merged.required.push(...inner.required);
  }
  return merged;
}

export function countProperties(name, definitions, stack = []) {
  let count = 0;
  for (const schema of Object.values(propertiesOf(name, definitions).properties)) {
    count += 1;
    const child = childRef(schema);
    if (child && child !== name && !stack.includes(child)) count += countProperties(child, definitions, [...stack, name]);
  }
  return count;
}

/** Generated examples and the source link, parsed from the operation's Markdown. */
export function markdownExtras(markdownPath) {
  const text = fs.readFileSync(path.join(REFERENCE, markdownPath), "utf8");
  const examples = {};
  for (const match of text.matchAll(/^### (\S+) — [^\n]*\n([\s\S]*?)(?=^### |^## |(?![\s\S]))/gm)) {
    const code = match[2].match(/```json\n([\s\S]*?)\n```/);
    if (code) examples[match[1]] = code[1];
  }
  const source = text.match(/Generated from \[`([^`]+)`\]\(([^)]+)\)/);
  return { examples, source: source ? { name: source[1], url: source[2] } : null };
}

// --- search engine titles and descriptions ----------------------------------

const clip = (text, limit = 155) => {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), limit - 30))}…`;
};
const firstSentence = (text) => (text.match(/^.+?[.!?](?=\s|$)/) || [text])[0];

/** Says "for", as the site's own name does, so results don't read as Adobe's own documentation. */
const apiName = (section) => `${SECTIONS[section].short} API for Marketo Engage`;
export const modelTitle = (model) => `${model.name} model | ${apiName(model.section)}`;
export const groupTitle = (group, section) => `${group.tag} operations | ${apiName(section)}`;
export const sectionTitle = (section) => `${SECTIONS[section].short} API reference for Marketo Engage`;
export function groupDescription(group, section, useful) {
  const count = `${group.operations.length} ${group.operations.length === 1 ? "operation" : "operations"} in the Marketo Engage ${SECTIONS[section].short} API.`;
  return useful ? `${clip(firstSentence(useful), 155 - count.length - 1)} ${count}` : `${group.tag}: ${count} Methods, paths and parameters for each one.`;
}

/** Unique page titles: the group or method only appears where a title would otherwise repeat. */
const titleUse = new Map();
const countUse = (key) => titleUse.set(key, (titleUse.get(key) || 0) + 1);
for (const operation of operations) {
  countUse(`${operation.section}|${operation.title}`);
  countUse(`${operation.section}|${operation.title}|${operation.tag}`);
}
export function operationTitle(operation) {
  const api = apiName(operation.section);
  if (titleUse.get(`${operation.section}|${operation.title}`) === 1) return `${operation.title} | ${api}`;
  if (titleUse.get(`${operation.section}|${operation.title}|${operation.tag}`) === 1) return `${operation.title} (${operation.tag}) | ${api}`;
  return `${operation.title}, ${operation.method} ${operation.path} | ${SECTIONS[operation.section].short} API`;
}
export function operationDescription(operation, node) {
  const summary = plainText(descriptionBlocks(node.description).find((block) => block.html)?.html || "");
  const call = `${operation.method} ${operation.path}`;
  const where = `in the Marketo Engage ${SECTIONS[operation.section].short} API.`;
  if (!summary) return `Parameters, responses and a request builder for ${call} ${where}`;
  const sentence = firstSentence(summary);
  const full = `${sentence} ${call} ${where}`;
  return full.length <= 158 ? full : `${clip(sentence, Math.max(70, 157 - call.length))} ${call}.`;
}
export function modelDescription(model) {
  const used = model.users.length ? `Used by ${model.users.length} ${model.users.length === 1 ? "operation" : "operations"}.` : "";
  return `The ${model.name} schema in the Marketo Engage ${SECTIONS[model.section].short} API: ${model.properties} ${model.properties === 1 ? "property" : "properties"}, with types and a generated example. ${used}`.trim();
}
