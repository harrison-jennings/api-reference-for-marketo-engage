/** Every indexable page. Pages marked noindex (search, 404, ResponseOf wrappers) are left out. */
import { SECTION_ORDER, allModels, groupsOf, operations } from "../lib/reference.js";

export function GET({ site }) {
  const routes = [
    "/", "/reference/", "/models/", "/playground/", "/postman/", "/about/", "/notices/",
    ...SECTION_ORDER.flatMap((section) => [`/reference/${section}/`, `/reference/${section}/models/`, ...groupsOf(section).map((group) => group.route)]),
    ...operations.map((operation) => operation.route),
    ...allModels().filter((model) => model.kind !== "Response wrapper").map((model) => model.route),
  ];
  const urls = routes.map((route) => `  <url><loc>${new URL(route, site).href}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, { headers: { "Content-Type": "application/xml" } });
}
