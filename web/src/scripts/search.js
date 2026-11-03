/** The search page: full-text search over every page with Pagefind. */
const input = document.getElementById("search-q");
const status = document.getElementById("search-status");
const results = document.getElementById("search-results");
const copy = document.getElementById("search-copy");
const PAGE = 20;

let pagefind = null;
let token = 0;

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

function card(data) {
  const link = document.createElement("a");
  link.className = "res";
  link.href = data.url;
  const title = document.createElement("span");
  title.className = "res-t";
  title.textContent = (data.meta.title || data.url).replace(/ · API Reference for Marketo Engage$/, "");
  const where = document.createElement("span");
  where.className = "res-w";
  where.textContent = data.meta.where || "";
  const excerpt = document.createElement("span");
  excerpt.className = "res-x";
  excerpt.append(excerptNodes(data.excerpt));
  link.append(title, where, excerpt);
  return link;
}

async function run() {
  const query = input.value.trim();
  const current = ++token;
  const url = new URL(location.href);
  if (query) url.searchParams.set("q", query); else url.searchParams.delete("q");
  history.replaceState(null, "", url);
  if (!query) { results.replaceChildren(); status.textContent = "Search operation names and IDs, paths, parameters, models and descriptions."; return; }
  status.textContent = "Searching…";
  pagefind ||= await import(/* @vite-ignore */ new URL("/pagefind/pagefind.js", location.href).href);
  const found = await pagefind.search(query);
  const page = await Promise.all(found.results.slice(0, PAGE).map((result) => result.data()));
  if (current !== token) return;
  results.replaceChildren(...page.map(card));
  status.textContent = found.results.length ? `${found.results.length} ${found.results.length === 1 ? "result" : "results"} for “${query}”${found.results.length > PAGE ? `, showing the first ${PAGE}` : ""}` : `No results for “${query}”. Check the spelling, or try an operation ID, path or model name.`;
}

let timer;
input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 160); });
copy.addEventListener("click", async () => {
  const original = copy.textContent;
  try { await navigator.clipboard.writeText(location.href); copy.textContent = "Copied"; } catch { copy.textContent = "Copy failed"; }
  setTimeout(() => { copy.textContent = original; }, 1500);
});
input.value = new URLSearchParams(location.search).get("q") || "";
run();
if (!input.value) input.focus();
