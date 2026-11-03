/** Serves dist/ the way GitHub Pages does: folders redirect to a trailing slash, and 404.html answers with a 404. */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..", "dist");
const PORT = Number(process.argv[2] || 4329);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain", ".wasm": "application/wasm" };

http.createServer((request, response) => {
  const { pathname, search } = new URL(request.url, "http://localhost");
  let file = path.join(ROOT, decodeURIComponent(pathname));
  if (!file.startsWith(ROOT)) file = ROOT;
  const isFolder = fs.existsSync(file) && fs.statSync(file).isDirectory();
  if (isFolder && !pathname.endsWith("/")) {
    response.writeHead(301, { Location: `${pathname}/${search}` });
    response.end();
    return;
  }
  if (isFolder) file = path.join(file, "index.html");
  const found = fs.existsSync(file);
  if (!found) file = path.join(ROOT, "404.html");
  response.writeHead(found ? 200 : 404, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(response);
}).listen(PORT, "127.0.0.1");
