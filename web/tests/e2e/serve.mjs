/**
 * Serves dist/ the way Cloudflare Workers static assets does with html_handling "auto-trailing-slash" and
 * not_found_handling "404-page" (wrangler.jsonc): a folder without its trailing slash, or an HTML file
 * asked for by name, redirects (307) to its address; a missing file gets 404.html with a 404; and the
 * rules in _headers add their headers.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..", "dist");
const PORT = Number(process.argv[2] || 4329);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain", ".wasm": "application/wasm" };

/** _headers as [pattern, headers] pairs; patterns are exact paths or end in "*". */
const RULES = [];
const headersFile = path.join(ROOT, "_headers");
if (fs.existsSync(headersFile)) {
  for (const line of fs.readFileSync(headersFile, "utf8").split("\n")) {
    if (!line.trim() || line.startsWith("#")) continue;
    if (!line.startsWith(" ")) RULES.push([line.trim(), {}]);
    else RULES.at(-1)[1][line.slice(0, line.indexOf(":")).trim()] = line.slice(line.indexOf(":") + 1).trim();
  }
}
const headersFor = (pathname) => Object.assign({}, ...RULES.filter(([pattern]) => (pattern.endsWith("*") ? pathname.startsWith(pattern.slice(0, -1)) : pathname === pattern)).map(([, headers]) => headers));

const isFile = (file) => file.startsWith(ROOT) && fs.existsSync(file) && fs.statSync(file).isFile();

http.createServer((request, response) => {
  const { pathname, search } = new URL(request.url, "http://localhost");
  const file = path.join(ROOT, decodeURIComponent(pathname));
  const redirect = (location) => {
    response.writeHead(307, { Location: `${location}${search}` });
    response.end();
  };
  // An HTML file asked for by name redirects to the address it's served at.
  if (pathname.endsWith(".html") && isFile(file)) return redirect(pathname.endsWith("/index.html") ? pathname.slice(0, -"index.html".length) : pathname.slice(0, -".html".length));
  // A folder's index without the trailing slash, and the slash collapsed where it's doubled.
  if (!pathname.endsWith("/") && !isFile(file) && isFile(path.join(file, "index.html"))) return redirect(`${pathname}/`);
  if (pathname.includes("//")) return redirect(pathname.replace(/\/{2,}/g, "/"));

  // Cloudflare reads _headers but doesn't serve it.
  let served = pathname === "/_headers" ? undefined : [file, path.join(file, "index.html"), `${file}.html`].find(isFile);
  const found = Boolean(served);
  if (!found) served = path.join(ROOT, "404.html");
  response.writeHead(found ? 200 : 404, { "Content-Type": TYPES[path.extname(served)] || "application/octet-stream", ...headersFor(pathname) });
  fs.createReadStream(served).pipe(response);
}).listen(PORT, "127.0.0.1");
