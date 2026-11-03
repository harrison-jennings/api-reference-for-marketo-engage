/**
 * The search page. "All pages" is full-text search with Pagefind; "Operation
 * finder" filters every operation by title, ID, method, path and group.
 */
import { load as loadJumpIndex, suggestion } from "./jump.js";

const input = document.getElementById("search-q");
const status = document.getElementById("search-status");
const results = document.getElementById("search-results");
const suggest = document.getElementById("search-suggest");
const facets = document.getElementById("search-facets");
const facetsPhone = document.getElementById("search-facets-phone");
const phoneFilters = document.getElementById("search-filters-phone");
const copy = document.getElementById("search-copy");
const finder = document.getElementById("finder");
const finderRows = document.getElementById("finder-rows");
const tabAll = document.getElementById("tab-all");
const tabFinder = document.getElementById("tab-finder");
const PAGE = 20;
const FILTERS = [["kind", "Kind"], ["api", "API"], ["method", "Method"]];

const params = new URLSearchParams(location.search);
let tab = params.get("tab") === "finder" ? "finder" : "all";
const selected = { kind: new Set(params.getAll("kind")), api: new Set(params.getAll("api")), method: new Set(params.getAll("method")) };
let pagefind = null;
let token = 0;
let operations = null;

function updateUrl() {
  const url = new URL(location.pathname, location.href);
  if (input.value.trim()) url.searchParams.set("q", input.value.trim());
  if (tab === "finder") url.searchParams.set("tab", "finder");
  else for (const [key] of FILTERS) for (const value of selected[key]) url.searchParams.append(key, value);
  history.replaceState(null, "", url);
}

/** Pagefind excerpts contain only <mark>; everything else is rebuilt as text. */
function excerptNodes(excerpt) {
  const fragment = document.createDocumentFragment();
  const decode = document.createElement("textarea");
  excerpt.split(/(<mark>.*?<\/mark>)/).forEach((part) => {
    const match = part.match(/^<mark>(.*)<\/mark>$/);
    decode.innerHTML = (match ? match[1] : part).replace(/<[^>]+>/g, "");
    if (match) { const mark = document.createElement("mark"); mark.textContent = decode.value; fragment.append(mark); } else fragment.append(decode.value);
  });
  return fragment;
}

function span(className, text) {
  const node = document.createElement("span");
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function card(data) {
  const link = document.createElement("a");
  link.className = "res";
  link.href = data.url;
  const excerpt = span("res-x");
  excerpt.append(excerptNodes(data.excerpt));
  link.append(span("res-t", data.meta.title || data.url), span("res-w", data.meta.where || ""), excerpt);
  return link;
}

function renderFacets(totals) {
  const build = () => {
    const fragment = document.createDocumentFragment();
    for (const [key, title] of FILTERS) {
      const values = Object.entries(totals[key] || {}).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]);
      if (!values.length) continue;
      const fieldset = document.createElement("fieldset");
      const legend = document.createElement("legend");
      legend.textContent = title;
      fieldset.append(legend);
      for (const [value, count] of values) {
        const label = document.createElement("label");
        const box = document.createElement("input");
        box.type = "checkbox";
        box.checked = selected[key].has(value);
        box.addEventListener("change", () => {
          if (box.checked) selected[key].add(value); else selected[key].delete(value);
          run();
        });
        label.append(box, ` ${value} `, span("ct", String(count)));
        fieldset.append(label);
      }
      fragment.append(fieldset);
    }
    return fragment;
  };
  facets.replaceChildren(build());
  facetsPhone.replaceChildren(build());
  phoneFilters.hidden = !facetsPhone.childElementCount;
}

/** An exact name goes first, because that's usually what someone typing it wants. */
async function bestMatch(query) {
  const entries = await loadJumpIndex();
  const q = query.toLowerCase();
  const exact = entries.filter((entry) => entry.keys.includes(q));
  return exact.slice(0, 3).map((entry) => {
    const link = document.createElement("a");
    link.className = "best";
    link.href = entry.u;
    const title = span("res-t");
    title.append(span(entry.k === "op" ? `m m-${entry.m.toLowerCase()}` : "jkind", entry.k === "op" ? entry.m : { model: "Model", param: "Parameter", group: "Group" }[entry.k]), " ", entry.t);
    link.append(title, span("res-w", `Exact match · ${entry.k === "op" ? `${entry.g} · ${entry.p}` : entry.g}`));
    return link;
  });
}

async function runAll(query, current) {
  finder.hidden = true;
  results.hidden = false;
  if (!query) {
    results.replaceChildren();
    suggest.replaceChildren();
    renderFacets({});
    status.textContent = "Search operation names and IDs, paths, parameters, models and descriptions.";
    return;
  }
  status.textContent = "Searching…";
  if (!pagefind) {
    pagefind = await import(/* @vite-ignore */ new URL("/pagefind/pagefind.js", location.href).href);
    // Filter counts stay empty until Pagefind has loaded its filter data.
    await pagefind.filters();
  }
  const filters = {};
  for (const [key] of FILTERS) if (selected[key].size) filters[key] = { any: [...selected[key]] };
  const [found, best, entries] = await Promise.all([pagefind.search(query, { filters }), bestMatch(query), loadJumpIndex()]);
  const page = await Promise.all(found.results.slice(0, PAGE).map((result) => result.data()));
  if (current !== token) return;
  renderFacets(found.totalFilters || {});
  results.replaceChildren(...best, ...page.map(card));
  const count = found.results.length;
  status.textContent = count ? `${count} ${count === 1 ? "result" : "results"} for “${query}”${count > PAGE ? `, showing the first ${PAGE}` : ""}` : `No results for “${query}”.`;
  suggest.replaceChildren();
  const fix = best.length ? "" : suggestion(query, entries);
  if (fix && fix !== query.toLowerCase()) {
    const note = document.createElement("div");
    note.className = "note";
    const text = document.createElement("p");
    const link = document.createElement("a");
    link.className = "ln";
    link.href = `/search/?q=${encodeURIComponent(fix)}`;
    link.textContent = fix;
    link.addEventListener("click", (event) => { event.preventDefault(); input.value = fix; run(); });
    text.append("Did you mean ", link, "?");
    note.append(text);
    suggest.append(note);
  }
}

async function runFinder(query) {
  results.hidden = true;
  suggest.replaceChildren();
  renderFacets({});
  finder.hidden = false;
  if (!operations) {
    status.textContent = "Loading operations…";
    const response = await fetch(new URL("/assets/data/site-index.json", location.href));
    const index = await response.json();
    const titles = Object.fromEntries(index.sections.map((section) => [section.id, section.title.replace(/ API$/, "")]));
    operations = index.operations.map((operation) => {
      const row = document.createElement("tr");
      const cell = (node) => { const td = document.createElement("td"); td.append(node); row.append(td); };
      const inner = (className, ...children) => { const node = document.createElement("span"); node.className = className; node.append(...children); return node; };
      cell(inner("cell", span(`m m-${operation.method.toLowerCase()}`, operation.method)));
      const link = document.createElement("a");
      link.className = "cell lnk";
      link.href = `/${operation.page}`;
      link.textContent = operation.title;
      cell(link);
      cell(inner("cell", `${titles[operation.section]} › ${operation.tag}`));
      cell(inner("cell mono", operation.path));
      return { row, text: `${operation.title} ${operation.operationId} ${operation.method} ${operation.path} ${operation.tag} ${titles[operation.section]}`.toLowerCase() };
    });
    finderRows.append(...operations.map((operation) => operation.row));
  }
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const operation of operations) {
    const match = terms.every((term) => operation.text.includes(term));
    operation.row.hidden = !match;
    if (match) count += 1;
  }
  finder.scrollTop = 0;
  status.textContent = `${count} of ${operations.length} operations. Every word you type must match.`;
}

function run() {
  updateUrl();
  const current = ++token;
  const query = input.value.trim();
  tabAll.toggleAttribute("aria-current", false);
  tabFinder.toggleAttribute("aria-current", false);
  (tab === "finder" ? tabFinder : tabAll).setAttribute("aria-current", "page");
  input.placeholder = tab === "finder" ? "Filter 388 operations" : "Search every page";
  return tab === "finder" ? runFinder(query) : runAll(query, current);
}

let timer;
input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, tab === "finder" ? 60 : 160); });
for (const [link, value] of [[tabAll, "all"], [tabFinder, "finder"]]) link.addEventListener("click", (event) => { event.preventDefault(); tab = value; run(); });
copy.addEventListener("click", async () => {
  const original = copy.textContent;
  try { await navigator.clipboard.writeText(location.href); copy.textContent = "Copied"; } catch { copy.textContent = "Copy failed"; }
  setTimeout(() => { copy.textContent = original; }, 1500);
});
input.value = params.get("q") || "";
run();
if (!input.value) input.focus();
