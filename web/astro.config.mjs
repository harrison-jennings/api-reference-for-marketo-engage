import { defineConfig } from "astro/config";

// The site is not meant to be indexed yet, so there is no sitemap. CI can set
// SITE_URL from the repository's Pages configuration, as it does for MkDocs.
export default defineConfig({
  site: process.env.SITE_URL || "https://mkto-ref.harrisonjennings.au/",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "never" },
  devToolbar: { enabled: false },
  // Highlighting adds inline styles, which the CSP blocks. Hand-written pages only use plain code blocks.
  markdown: { syntaxHighlight: false },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "worker-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
});
