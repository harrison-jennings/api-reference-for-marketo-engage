/**
 * Validates a built site, like docs-site/scripts/check_site.py does for MkDocs:
 * every current reference URL exists, internal links resolve, and every page
 * carries the disclaimer, the noindex tag and a CSP.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "dist");
const REFERENCE = path.resolve("..", "reference");
const DISCLAIMER = "THIS SITE IS NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF ADOBE MARKETO ENGAGE.";
// Hand-written pages that later milestones will add.
const PENDING = ["/playground/", "/postman/", "/about/", "/notices/"];

const errors = [];
const pages = fs.readdirSync(root, { recursive: true }).filter((file) => file.endsWith("index.html") || file === "404.html");

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
for (const file of walk(REFERENCE).filter((item) => item.endsWith(".md") && !item.endsWith("validation-report.md"))) {
  const route = path.relative(REFERENCE, file).replace(/(^|\/)README\.md$/, "$1").replace(/\.md$/, "/");
  if (!fs.existsSync(path.join(root, "reference", route, "index.html"))) errors.push(`missing page: /reference/${route}`);
}

let links = 0;
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  if (!html.includes(DISCLAIMER)) errors.push(`${page}: no disclaimer`);
  if (!/<meta name="robots" content="noindex, nofollow"/.test(html)) errors.push(`${page}: no noindex tag`);
  if (!/http-equiv="content-security-policy"/i.test(html)) errors.push(`${page}: no CSP`);
  if (/fonts\.(googleapis|gstatic)\.com/.test(html)) errors.push(`${page}: requests Google Fonts`);
  for (const [, href] of html.matchAll(/href="([^"#?]*)(?:[#?][^"]*)?"/g)) {
    if (!href || /^(https?:|mailto:|data:)/.test(href) || PENDING.includes(href)) continue;
    links += 1;
    const target = href.startsWith("/") ? path.join(root, href) : path.join(root, path.dirname(page), href);
    if (!fs.existsSync(target) || (fs.statSync(target).isDirectory() && !fs.existsSync(path.join(target, "index.html")))) errors.push(`${page}: broken link ${href}`);
  }
}

if (errors.length) {
  console.error(`${errors.length} problems:\n${[...new Set(errors)].slice(0, 40).join("\n")}`);
  process.exit(1);
}
console.log(`Site validation passed: ${pages.length} pages, ${links} internal links checked. Pending pages: ${PENDING.join(", ")}`);
