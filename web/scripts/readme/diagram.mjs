// The architecture diagram, as HTML for images.mjs to draw. Colours and fonts are passed in, so the
// diagram always uses the site's own tokens. Logos are from Simple Icons (CC0).
import { readFileSync } from "node:fs";

const logo = (name, colour) => {
  const svg = readFileSync(new URL(`logos/${name}.svg`, import.meta.url), "utf8");
  return svg.replace("<svg ", `<svg class="logo" fill="${colour}" `);
};
const icon = (paths) => `<svg class="logo" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const ICONS = {
  doc: icon('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'),
  braces: icon('<path d="M8 3c-2 0-3 1-3 3v3c0 1.500-1 2.500-2 3 1 .5 2 1.500 2 3v3c0 2 1 3 3 3M16 3c2 0 3 1 3 3v3c0 1.500 1 2.500 2 3-1 .5-2 1.500-2 3v3c0 2-1 3-3 3"/>'),
  search: icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'),
  check: icon('<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'),
  browser: icon('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.500h.01M10 6.500h.01"/>'),
  form: icon('<rect x="3" y="4" width="18" height="6" rx="1.500"/><rect x="3" y="14" width="18" height="6" rx="1.500"/>'),
  person: icon('<circle cx="12" cy="8" r="4"/><path d="M4.500 21a7.500 7.500 0 0 1 15 0"/>'),
  download: icon('<path d="M12 3v12M7 11l5 5 5-5M4 20h16"/>'),
  compare: icon('<path d="M8 3v14M8 17l-4-4M8 17l4-4M16 21V7M16 7l-4 4M16 7l4 4"/>'),
  redo: icon('<path d="M20 12a8 8 0 1 1-2.500-5.800L20 8.500M20 3v5.500h-5.500"/>'),
  pr: icon('<circle cx="6" cy="6" r="2.500"/><circle cx="6" cy="18" r="2.500"/><circle cx="18" cy="18" r="2.500"/><path d="M6 8.500v7M18 15.500V9a3 3 0 0 0-3-3h-3M14 3.500 11.500 6 14 8.500"/>'),
};
const CSS = `
  * { box-sizing: border-box; margin: 0; }
  html, body { background: transparent; }
  .diagram { width: 1480px; padding: 44px; border-radius: 24px; background: var(--ground); color: var(--text); font-family: var(--sans); position: relative; overflow: hidden; }
  .diagram::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 88% 4%, var(--glow), transparent 42%); pointer-events: none; }
  h2 { position: relative; font-family: var(--display, var(--sans)); font-size: 34px; font-weight: 600; letter-spacing: -.015em; color: var(--bright); }
  .sub { position: relative; margin: 6px 0 26px; font-size: 17px; color: var(--secondary); }
  .layout { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 270px; gap: 20px; }
  .bands { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
  .band, .side { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 18px 20px 20px; }
  .band { flex: 1 1 0; display: flex; flex-direction: column; }
  .band .row { flex: 1; }
  .band .card { justify-content: center; }
  .lbl { font: 500 13px/1 var(--mono); letter-spacing: .02em; color: var(--accent); margin-bottom: 14px; }
  .row { display: flex; align-items: stretch; gap: 26px; }
  .card { flex: 1 1 0; min-width: 0; position: relative; display: flex; flex-direction: column; gap: 6px; padding: 14px; background: var(--raised); border: 1px solid var(--line); border-radius: 12px; }
  .row .card:not(:last-child)::after { content: "→"; position: absolute; right: -22px; top: 50%; transform: translateY(-50%); font: 500 18px/1 var(--mono); color: var(--muted); }
  .logo { width: 26px; height: 26px; flex: none; }
  .logos { display: flex; gap: 8px; }
  .t { font-size: 16px; font-weight: 600; color: var(--bright); line-height: 1.25; }
  .d { font-size: 13.500px; line-height: 1.35; color: var(--secondary); }
  .m { font-family: var(--mono); font-size: 12px; }
  .down { text-align: center; font: 500 18px/1 var(--mono); color: var(--muted); margin: -8px 0; }
  .side { display: flex; flex-direction: column; }
  .side .card { flex: 1 1 auto; justify-content: center; }
  .side .stack { display: flex; flex-direction: column; flex: 1; gap: 22px; }
  .side .stack .card { position: relative; }
  .side .stack .card:not(:last-child)::after { content: "↓"; position: absolute; left: 50%; bottom: -20px; transform: translateX(-50%); font: 500 16px/1 var(--mono); color: var(--muted); }
`;
const card = (mark, title, text) => `<div class="card">${mark ? `<div class="logos">${mark}</div>` : ""}<div class="t">${title}</div><div class="d">${text}</div></div>`;

/**
 * @param vars CSS custom properties: ground, surface, raised, line, text, bright, secondary, muted, accent, glow, sans, mono
 * @param options { adobe: an extra mark for the specifications card, fontFace: CSS, heading }
 */
export function diagramHtml(vars, options = {}) {
  const root = Object.entries(vars).map(([key, value]) => `--${key}: ${value};`).join(" ");
  const mono = vars.text;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${options.fontFace || ""} :root { ${root} } ${CSS}</style></head><body><div class="diagram">
    <h2>${options.heading || "How API Reference for Marketo Engage is built"}</h2>
    <p class="sub">One set of specifications drives the reference, the Request Builder and the Postman collection.</p>
    <div class="layout">
      <div class="bands">
        <section class="band"><p class="lbl">Generate</p><div class="row">
          ${card(options.adobe || `${logo("swagger", "#85EA2D")}`, "Adobe's specifications", "Five Swagger 2.0 and OpenAPI 3 files, committed unmodified in <span class='m'>specs/</span>")}
          ${card(logo("python", "#3776AB"), "Python generator", "Normalises both formats into one operation model, using only the standard library")}
          ${card(ICONS.doc, "reference/", "Markdown for every operation and model, operation JSON and a manifest")}
          ${card(logo("postman", "#FF6C37"), "Postman collection", "One request per operation, built with the builder's own parser")}
        </div></section>
        <div class="down">↓</div>
        <section class="band"><p class="lbl">Build and check</p><div class="row">
          ${card(logo("astro", mono), "Astro", "Static pages at stable URLs, with no client framework")}
          ${card(ICONS.search, "Pagefind", "Full-text search index, built at the end of each build and served as static files")}
          ${card(ICONS.check, "Site check", "Links, secrets, CSP, disclaimer, Postman files, canonicals and sitemap")}
          ${card(ICONS.browser, "Browser tests", "Chromium, Firefox and WebKit, with axe accessibility checks")}
        </div></section>
        <div class="down">↓</div>
        <section class="band"><p class="lbl">Serve, in your browser</p><div class="row">
          ${card(logo("github", mono), "GitHub Pages", "Deployed from <span class='m'>main</span> as plain files, with no application server or database")}
          ${card(ICONS.doc, "Reference and search", "Docs, models, a jump bar and an operation finder")}
          ${card(ICONS.form, "Request Builder", "A form drawn from the schema, with cURL, JavaScript and Python samples")}
          ${card(ICONS.braces, "Mock responses", "Generated from the response schema. Nothing is sent to Marketo")}
        </div></section>
      </div>
      <aside class="side"><p class="lbl">Keep up, every week</p><div class="stack">
        ${card(logo("githubactions", "#2088FF"), "Scheduled action", "Runs every Monday morning, Sydney time")}
        ${card(ICONS.download, "Fetch Adobe's specs", "From AdobeDocs/marketo-apis")}
        ${card(ICONS.compare, "Compare", "No change: note it on a tracking issue and stop")}
        ${card(ICONS.redo, "Regenerate and test", "Reference, Postman collection and the full checks")}
        ${card(ICONS.pr, "Open a draft PR", "With a summary of what changed")}
        ${card(ICONS.person, "A person merges it", "Nothing publishes itself")}
      </div></aside>
    </div>
  </div></body></html>`;
}
