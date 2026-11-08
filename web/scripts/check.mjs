/**
 * Validates a built site before it's published:
 * - every current reference URL exists, every operation has a Request Builder
 *   and a parseable operation file, and internal links resolve;
 * - every page carries Adobe's required disclaimer and a CSP that blocks
 *   connections to other hosts and allows scripts only from the site and
 *   Cloudflare's analytics beacon, and _headers serves the same policy;
 * - the files fit Cloudflare's limits for static assets;
 * - no private files or secret-looking values are published, and the Postman
 *   downloads match the reviewed files, with a template holding no values but
 *   the public Data Ingestion API host;
 * - what search engines rely on: unique titles and descriptions, canonical
 *   links, one h1, valid structured data, and a sitemap and robots.txt that
 *   match the indexable pages.
 */
import fs from "node:fs";
import path from "node:path";
import config from "../site.json" with { type: "json" };
import { headerPolicy, inlineScriptHashes, metaPolicy } from "./headers.mjs";

const root = path.resolve(process.argv[2] || "dist");
const REPO = path.resolve(import.meta.dirname, "..", "..");
const REFERENCE = path.join(REPO, "reference");
const DISCLAIMER = "THIS SITE IS NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF ADOBE MARKETO ENGAGE.";

const errors = [];
const BEACON = "https://static.cloudflareinsights.com";
const directive = (policy, name) => policy.split("; ").find((item) => item.startsWith(`${name} `))?.split(" ").slice(1);
const policies = new Set();
const scriptHashes = new Set();
const long = [];
const pages = fs.readdirSync(root, { recursive: true }).filter((file) => file.endsWith("index.html") || file === "404.html");

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
for (const file of walk(REFERENCE).filter((item) => item.endsWith(".md") && !item.endsWith("validation-report.md"))) {
  const route = path.relative(REFERENCE, file).replace(/(^|\/)README\.md$/, "$1").replace(/\.md$/, "/");
  if (!fs.existsSync(path.join(root, "reference", route, "index.html"))) errors.push(`missing page: /reference/${route}`);
}

const site = config.url.replace(/\/$/, "");
const titles = new Map();
const descriptions = new Map();
const indexable = new Set();
let links = 0;
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  const route = page === "404.html" ? "/404.html" : `/${page.replace(/index\.html$/, "")}`;
  const head = html.slice(0, html.indexOf("</head>"));
  const noindex = /<meta name="robots" content="noindex/.test(head);
  if (!html.includes(DISCLAIMER)) errors.push(`${page}: no disclaimer`);
  const csp = metaPolicy(html);
  if (!csp) errors.push(`${page}: no CSP`);
  else {
    policies.add(csp);
    if (directive(csp, "connect-src")?.join(" ") !== "'self'") errors.push(`${page}: CSP allows connections to other hosts`);
    const scripts = directive(csp, "script-src") || [];
    for (const hash of inlineScriptHashes(html)) scriptHashes.add(hash);
    if (scripts.some((source) => !["'self'", "'wasm-unsafe-eval'", BEACON].includes(source) && !/^'sha(256|384|512)-/.test(source))) errors.push(`${page}: CSP allows scripts from elsewhere: script-src ${scripts.join(" ")}`);
  }
  if (/fonts\.(googleapis|gstatic)\.com/.test(html)) errors.push(`${page}: requests Google Fonts`);
  if (!/<html lang="en-AU"/.test(html)) errors.push(`${page}: no language`);

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${page}: ${h1s} h1 elements`);
  const title = head.match(/<title>([^<]*)<\/title>/)?.[1];
  const description = head.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) errors.push(`${page}: no title`);
  if (!description) errors.push(`${page}: no description`);
  for (const [, data] of head.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(data); } catch { errors.push(`${page}: invalid structured data`); }
  }
  if (noindex) {
    if (/rel="canonical"/.test(head)) errors.push(`${page}: canonical on a noindex page`);
  } else {
    indexable.add(route);
    const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    if (canonical !== `${site}${route}`) errors.push(`${page}: canonical is ${canonical}`);
    if (!/property="og:image"/.test(head)) errors.push(`${page}: no social image`);
    if (titles.has(title)) errors.push(`duplicate title "${title}": ${page} and ${titles.get(title)}`);
    titles.set(title, page);
    if (descriptions.has(description)) errors.push(`duplicate description: ${page} and ${descriptions.get(description)}`);
    descriptions.set(description, page);
    if (title && title.length > 70) long.push(`${title.length} ${title}`);
  }
  for (const [, href] of html.matchAll(/href="([^"#?]*)(?:[#?][^"]*)?"/g)) {
    if (!href || /^(https?:|mailto:|data:)/.test(href)) continue;
    links += 1;
    const target = href.startsWith("/") ? path.join(root, href) : path.join(root, path.dirname(page), href);
    if (!fs.existsSync(target) || (fs.statSync(target).isDirectory() && !fs.existsSync(path.join(target, "index.html")))) errors.push(`${page}: broken link ${href}`);
  }
}

// Cloudflare serves the same policy as a header, for every file.
const headersFile = fs.existsSync(path.join(root, "_headers")) ? fs.readFileSync(path.join(root, "_headers"), "utf8") : "";
const served = headersFile.match(/^\/\*\n(?:  .*\n)*?  Content-Security-Policy: (.*)$/m)?.[1];
if (!served) errors.push("_headers has no Content-Security-Policy for /*");
else if (policies.size === 1 && served !== headerPolicy([...policies][0], [...scriptHashes])) errors.push("_headers serves a different CSP from the pages, or misses an inline script");
if (policies.size > 1) errors.push(`pages have ${policies.size} different CSPs`);

// Cloudflare's limits for static assets on the free plan.
const MAX_FILES = 20000;
const MAX_FILE_BYTES = 25 * 1024 * 1024;
const files = walk(root);
if (files.length > MAX_FILES) errors.push(`${files.length} files: Cloudflare's free plan takes ${MAX_FILES}`);
for (const file of files) if (fs.statSync(file).size > MAX_FILE_BYTES) errors.push(`${path.relative(root, file)} is over Cloudflare's 25 MiB limit for a file`);

// The sitemap lists every indexable page and nothing else.
const sitemap = fs.existsSync(path.join(root, "sitemap.xml")) ? fs.readFileSync(path.join(root, "sitemap.xml"), "utf8") : "";
const listed = new Set([...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, url]) => url.replace(site, "")));
for (const route of indexable) if (!listed.has(route)) errors.push(`missing from sitemap: ${route}`);
for (const route of listed) if (!indexable.has(route)) errors.push(`in sitemap but not indexable: ${route}`);
const robots = fs.existsSync(path.join(root, "robots.txt")) ? fs.readFileSync(path.join(root, "robots.txt"), "utf8") : "";
if (!robots.includes(`Sitemap: ${site}/sitemap.xml`)) errors.push("robots.txt does not name the sitemap");
if (/^Disallow: \/$/m.test(robots)) errors.push("robots.txt blocks the whole site");

// Every operation has a builder, and a file for it to read.
const manifest = JSON.parse(fs.readFileSync(path.join(REFERENCE, "manifest.json"), "utf8"));
for (const operation of manifest.operations) {
  const route = operation.markdown.replace(/\.md$/, "/");
  const pageFile = path.join(root, "reference", route, "index.html");
  if (fs.existsSync(pageFile) && !fs.readFileSync(pageFile, "utf8").includes("data-request-builder")) errors.push(`${route}: no Request Builder`);
  const data = path.join(root, "reference", operation.json);
  try { JSON.parse(fs.readFileSync(data, "utf8")); } catch { errors.push(`${operation.json}: missing or not valid JSON`); }
}

// Nothing private is published.
const FORBIDDEN_FILES = [/(^|\/)\.env(\..+)?$/, /(^|\/)\.git(\/|$)/, /\.(pem|key|p12|pfx)$/];
const SECRETS = {
  "private key": /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  "GitHub token": /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{40,}\b/,
  "AWS access key": /\bAKIA[0-9A-Z]{16}\b/,
  "bearer token": /Bearer\s+(?!<ACCESS_TOKEN>|\{\{)[A-Za-z0-9\-_.~+/]{20,}=*/,
  "credential value": /(client_secret|client_id|access_token)(=|"\s*:\s*")(?!<|\{\{|\$\{|example)[A-Za-z0-9\-_.]{16,}/i,
  "local path": /(\/Users\/[A-Za-z0-9._-]+\/|\/home\/runner\/|C:\\\\Users\\\\)/,
  "Marketo instance": /\b(?!123-ABC-456\.)\d{3}-[A-Za-z]{3}-\d{3}\.mktorest\.com\b/i,
};
const ENVIRONMENT = "downloads/marketo-engage.postman_environment.json";
const TEXT = /\.(html|js|json|css|xml|txt|map)$/;
for (const file of files) {
  const relative = path.relative(root, file);
  const postmanEnvironment = /\.postman_environment\.json$/.test(relative) && relative !== ENVIRONMENT;
  if (postmanEnvironment || FORBIDDEN_FILES.some((pattern) => pattern.test(relative))) errors.push(`private file published: ${relative}`);
  if (!TEXT.test(relative) || relative.startsWith("pagefind/")) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const [name, pattern] of Object.entries(SECRETS)) if (pattern.test(text)) errors.push(`${relative}: looks like a ${name}`);
}

// The Postman downloads are the reviewed files, and the template holds no values but a public host.
for (const name of ["marketo-engage.postman_collection.json", "marketo-engage.postman_environment.json"]) {
  const published = path.join(root, "downloads", name);
  if (!fs.existsSync(published) || !fs.readFileSync(published).equals(fs.readFileSync(path.join(REPO, "postman", name)))) errors.push(`downloads/${name} differs from postman/`);
}
if (fs.existsSync(path.join(root, ENVIRONMENT))) {
  for (const { key, value } of JSON.parse(fs.readFileSync(path.join(root, ENVIRONMENT), "utf8")).values) {
    if (!value) continue;
    if (key !== "ingestionBaseUrl" || !/^https:\/\/[a-z0-9.-]+$/.test(value)) errors.push(`${ENVIRONMENT}: ${key} holds a value`);
  }
}

if (errors.length) {
  console.error(`${errors.length} problems:\n${[...new Set(errors)].slice(0, 40).join("\n")}`);
  process.exit(1);
}
console.log(`Site validation passed: ${pages.length} pages, ${indexable.size} indexable, ${links} internal links checked, ${long.length} titles over 70 characters, ${files.length} of ${MAX_FILES} files.`);
if (files.length > MAX_FILES * 0.75) console.warn(`Warning: ${files.length} files is over three-quarters of Cloudflare's ${MAX_FILES}-file limit.`);
