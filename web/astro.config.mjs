import { defineConfig } from "astro/config";
import config from "./site.json" with { type: "json" };

// CI can set SITE_URL from the repository's Pages configuration.
export default defineConfig({
  site: process.env.SITE_URL || config.url,
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
