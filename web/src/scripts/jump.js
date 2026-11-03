/**
 * The jump bar: instant matches on names, IDs, paths, models and parameters,
 * from a small index. Full-text search lives on the search page.
 */
const dialog = document.getElementById("jump");
const input = document.getElementById("jump-input");
const list = document.getElementById("jump-list");
const empty = document.getElementById("jump-empty");
const count = document.getElementById("jump-count");
const all = document.getElementById("jump-all");
const LIMIT = 40;
const EXAMPLES = ["getLeadById", "/rest/v1/leads.json", "ResponseOfLead", "filterValues"];
const KIND_LABEL = { model: "Model", param: "Param", group: "Group" };

let entries = null;
let scope = "all";
let shown = [];
let active = 0;

const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
if (!isMac) document.querySelectorAll("[data-jump-key]").forEach((node) => { node.textContent = "Ctrl K"; });

export async function load() {
  if (entries) return entries;
  const response = await fetch(new URL("/assets/data/jump-index.json", location.href));
  entries = (await response.json()).map((entry) => ({ ...entry, keys: [entry.i, entry.p, entry.t].map((key) => (key || "").toLowerCase()), group: (entry.g || "").toLowerCase() }));
  return entries;
}

const pathPattern = (path) => new RegExp(`^${path.replace(/[.*+?^$()|[\]\\]/g, "\\$&").replace(/\{[^}]+\}/g, "[^/]+")}$`, "i");

function rank(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const out = [];
  for (const entry of entries) {
    if (scope !== "all" && entry.k !== scope) continue;
    let score = 0;
    if (entry.keys.includes(q)) score = 100;
    else if (entry.p && q.startsWith("/") && pathPattern(entry.p).test(q)) score = 95;
    else if (entry.keys.some((key) => key.startsWith(q))) score = 80;
    else if (entry.keys.some((key) => key.includes(q))) score = 60;
    else if (terms.every((term) => entry.keys.some((key) => key.includes(term)) || entry.group.includes(term))) score = 45;
    if (score) out.push({ entry, score: score + (entry.k === "op" ? 2 : 0) - entry.t.length / 1000 });
  }
  return out.sort((a, b) => b.score - a.score).map((item) => item.entry);
}

function distance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, index) => [index]);
  for (let j = 1; j <= b.length; j += 1) rows[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) for (let j = 1; j <= b.length; j += 1) rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return rows[a.length][b.length];
}

export function suggestion(query, index) {
  const vocabulary = new Set();
  for (const entry of index) if (entry.k === "op" || entry.k === "group") `${entry.t}`.toLowerCase().split(/\s+/).forEach((word) => vocabulary.add(word));
  let changed = false;
  const fixed = query.toLowerCase().trim().split(/\s+/).map((term) => {
    if (vocabulary.has(term)) return term;
    let best = term;
    let bestDistance = 3;
    vocabulary.forEach((word) => {
      if (Math.abs(word.length - term.length) > 2) return;
      const value = distance(term, word);
      if (value < bestDistance) { bestDistance = value; best = word; }
    });
    if (best !== term) changed = true;
    return best;
  }).join(" ");
  return changed ? fixed : "";
}

/** Text with the query highlighted, built from nodes so nothing needs escaping. */
function highlighted(text, query) {
  const fragment = document.createDocumentFragment();
  const q = query.toLowerCase().trim();
  const lower = text.toLowerCase();
  let at = lower.indexOf(q);
  let length = q.length;
  if (at < 0) { const first = q.split(/\s+/)[0]; at = first ? lower.indexOf(first) : -1; length = first.length; }
  if (at < 0) { fragment.append(text); return fragment; }
  const mark = document.createElement("mark");
  mark.textContent = text.slice(at, at + length);
  fragment.append(text.slice(0, at), mark, text.slice(at + length));
  return fragment;
}

function row(entry, index, query) {
  const item = document.createElement("li");
  item.setAttribute("role", "presentation");
  const link = document.createElement("a");
  link.className = "jr";
  link.id = `jump-${index}`;
  link.href = entry.u;
  link.setAttribute("role", "option");
  link.setAttribute("aria-selected", "false");
  link.tabIndex = -1;
  const kind = document.createElement("span");
  kind.className = entry.k === "op" ? `m m-${entry.m.toLowerCase()}` : "jkind";
  kind.textContent = entry.k === "op" ? entry.m : KIND_LABEL[entry.k];
  const text = document.createElement("span");
  const title = document.createElement("span");
  title.className = "jt1";
  title.append(highlighted(entry.t, query));
  const sub = document.createElement("span");
  sub.className = "jt2";
  const showId = entry.k === "op" && entry.i.toLowerCase().includes(query.toLowerCase().trim());
  sub.append(`${entry.g} · `.repeat(showId || entry.k === "op" ? 1 : 0));
  if (entry.k === "op") sub.append(highlighted(showId ? entry.i : entry.p, query));
  else sub.append(entry.g);
  text.append(title, sub);
  link.append(kind, text);
  item.append(link);
  return item;
}

function setActive(index) {
  active = Math.max(0, Math.min(index, shown.length - 1));
  list.querySelectorAll("[role=option]").forEach((node, position) => {
    const on = position === active;
    node.setAttribute("aria-selected", String(on));
    if (on) { input.setAttribute("aria-activedescendant", node.id); node.scrollIntoView({ block: "nearest" }); }
  });
}

function button(text, onClick, className = "btn") {
  const node = document.createElement("button");
  node.type = "button";
  node.className = className;
  node.textContent = text;
  node.addEventListener("click", onClick);
  return node;
}

function setQuery(value) {
  input.value = value;
  render();
  input.focus();
}

function render() {
  const query = input.value;
  const trimmed = query.trim();
  const ranked = trimmed ? rank(query) : [];
  shown = ranked.slice(0, LIMIT);
  list.replaceChildren(...shown.map((entry, index) => row(entry, index, query)));
  list.hidden = !shown.length;
  input.removeAttribute("aria-activedescendant");
  if (shown.length) setActive(0);
  all.href = trimmed ? `/search/?q=${encodeURIComponent(trimmed)}` : "/search/";
  count.textContent = !trimmed ? "" : ranked.length > LIMIT ? `Showing ${LIMIT} of ${ranked.length}` : ranked.length ? `${ranked.length} ${ranked.length === 1 ? "match" : "matches"}` : "No matches";
  empty.replaceChildren();
  empty.hidden = Boolean(shown.length);
  if (!trimmed) {
    const intro = document.createElement("p");
    intro.textContent = "Exact matches come first. Try one of these.";
    const examples = document.createElement("div");
    examples.className = "cta";
    examples.append(...EXAMPLES.map((example) => button(example, () => setQuery(example), "btn mono")));
    empty.append(intro, examples);
  } else if (!ranked.length) {
    const message = document.createElement("p");
    message.textContent = `Nothing matches “${trimmed}”.`;
    empty.append(message);
    const fix = suggestion(trimmed, entries);
    if (fix) { const wrap = document.createElement("div"); wrap.className = "cta"; wrap.append(button(`Search for: ${fix}`, () => setQuery(fix))); empty.append(wrap); }
    const link = document.createElement("a");
    link.className = "ln";
    link.href = all.href;
    link.textContent = "Search all page text instead";
    empty.append(link);
  }
}

async function open() {
  if (dialog.open) return;
  dialog.showModal();
  input.select();
  await load();
  render();
}

document.querySelectorAll("[data-jump-open]").forEach((node) => node.addEventListener("click", open));
dialog.querySelector("[data-jump-close]").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
input.addEventListener("input", () => { if (entries) render(); });
input.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") { event.preventDefault(); setActive(active + 1); }
  else if (event.key === "ArrowUp") { event.preventDefault(); setActive(active - 1); }
  else if (event.key === "Enter") { event.preventDefault(); const target = shown[active]; location.href = target ? target.u : all.href; }
});
dialog.querySelectorAll("[data-scope]").forEach((chip) => chip.addEventListener("click", () => {
  scope = chip.getAttribute("data-scope");
  dialog.querySelectorAll("[data-scope]").forEach((node) => node.setAttribute("aria-pressed", String(node === chip)));
  render();
  input.focus();
}));

const typing = (target) => target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); if (dialog.open) dialog.close(); else open(); }
  else if (event.key === "/" && !typing(event.target) && !dialog.open) { event.preventDefault(); open(); }
});
