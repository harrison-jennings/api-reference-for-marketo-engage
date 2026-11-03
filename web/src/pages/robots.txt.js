/** Search indexes aren't pages, so crawlers skip them. Everything else is open. */
export function GET({ site }) {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /pagefind/\n\nSitemap: ${new URL("/sitemap.xml", site).href}\n`, { headers: { "Content-Type": "text/plain" } });
}
