/**
 * Validates a built site, like docs-site/scripts/check_site.py does for MkDocs:
 * every current reference URL exists, internal links resolve, and every page
 * carries the disclaimer and a CSP. Also checks what search engines rely on:
 * unique titles and descriptions, canonical links, one h1, valid structured
 * data, and a sitemap and robots.txt that match the indexable pages.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "dist");
const REFERENCE = path.resolve("..", "reference");
const DISCLAIMER = "THIS SITE IS NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF ADOBE MARKETO ENGAGE.";

const errors = [];
const long = [];
const pages = fs.readdirSync(root, { recursive: true }).filter((file) => file.endsWith("index.html") || file === "404.html");

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
for (const file of walk(REFERENCE).filter((item) => item.endsWith(".md") && !item.endsWith("validation-report.md"))) {
  const route = path.relative(REFERENCE, file).replace(/(^|\/)README\.md$/, "$1").replace(/\.md$/, "/");
  if (!fs.existsSync(path.join(root, "reference", route, "index.html"))) errors.push(`missing page: /reference/${route}`);
}

const site = (process.env.SITE_URL || "https://mkto-ref.harrisonjennings.au/").replace(/\/$/, "");
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
  if (!/http-equiv="content-security-policy"/i.test(html)) errors.push(`${page}: no CSP`);
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

// The sitemap lists every indexable page and nothing else.
const sitemap = fs.existsSync(path.join(root, "sitemap.xml")) ? fs.readFileSync(path.join(root, "sitemap.xml"), "utf8") : "";
const listed = new Set([...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, url]) => url.replace(site, "")));
for (const route of indexable) if (!listed.has(route)) errors.push(`missing from sitemap: ${route}`);
for (const route of listed) if (!indexable.has(route)) errors.push(`in sitemap but not indexable: ${route}`);
const robots = fs.existsSync(path.join(root, "robots.txt")) ? fs.readFileSync(path.join(root, "robots.txt"), "utf8") : "";
if (!robots.includes(`Sitemap: ${site}/sitemap.xml`)) errors.push("robots.txt does not name the sitemap");
if (/^Disallow: \/$/m.test(robots)) errors.push("robots.txt blocks the whole site");

if (errors.length) {
  console.error(`${errors.length} problems:\n${[...new Set(errors)].slice(0, 40).join("\n")}`);
  process.exit(1);
}
console.log(`Site validation passed: ${pages.length} pages, ${indexable.size} indexable, ${links} internal links checked, ${long.length} titles over 70 characters.`);
