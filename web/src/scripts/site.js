/** Page behaviour shared by every page. No outside libraries. */

const root = document.documentElement;
const body = document.body;
const store = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
const read = (key) => { try { return localStorage.getItem(key); } catch { return null; } };

// Break opportunities in long names, added here so the indexed HTML keeps them whole.
for (const node of document.querySelectorAll(".pt, .nm, .mlink, .mname, .ty, code.mono, .tbl .mono, .ophead h1, .cr")) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  for (const text of texts) {
    const parts = text.nodeValue.split(/(?<=[/_-])|(?<=[a-z0-9])(?=[A-Z])/);
    if (parts.length < 2) continue;
    const fragment = document.createDocumentFragment();
    parts.forEach((part, index) => { if (index) fragment.append(document.createElement("wbr")); fragment.append(part); });
    text.replaceWith(fragment);
  }
}

// Theme: auto, light or dark.
const ORDER = ["auto", "light", "dark"];
const label = (pref) => pref.charAt(0).toUpperCase() + pref.slice(1);
const prefersLight = matchMedia("(prefers-color-scheme: light)");
function applyTheme(pref) {
  root.setAttribute("data-theme-pref", pref);
  root.setAttribute("data-theme", pref === "auto" ? (prefersLight.matches ? "light" : "dark") : pref);
  document.querySelectorAll("[data-theme-label]").forEach((node) => { node.textContent = label(pref); });
  document.querySelectorAll("[data-theme-toggle]").forEach((node) => node.setAttribute("aria-label", `Theme: ${label(pref)}. Select to change.`));
}
applyTheme(root.getAttribute("data-theme-pref") || "auto");
prefersLight.addEventListener("change", () => { if (root.getAttribute("data-theme-pref") === "auto") applyTheme("auto"); });
document.querySelectorAll("[data-theme-toggle]").forEach((button) => button.addEventListener("click", () => {
  const next = ORDER[(ORDER.indexOf(root.getAttribute("data-theme-pref")) + 1) % ORDER.length];
  store("site-theme", next);
  applyTheme(next);
}));

// Pane layout (wide screens) and Docs or Builder (narrow screens).
function setPressed(group, value, attribute) {
  group.setAttribute("data-v", value);
  group.querySelectorAll(`[${attribute}]`).forEach((button) => button.setAttribute("aria-pressed", String(button.getAttribute(attribute) === value)));
}
const paneSwitch = document.querySelector("[data-pane-switch]");
if (paneSwitch) {
  const apply = (pane) => { body.setAttribute("data-pane", pane); setPressed(paneSwitch, pane, "data-pane"); };
  const saved = read("site-panes");
  if (saved === "docs" || saved === "builder") apply(saved);
  paneSwitch.addEventListener("click", (event) => {
    const button = event.target.closest("[data-pane]");
    if (button) { apply(button.getAttribute("data-pane")); store("site-panes", button.getAttribute("data-pane")); }
  });
}
const viewSwitch = document.querySelector("[data-view-switch]");
if (viewSwitch) viewSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  body.setAttribute("data-view", button.getAttribute("data-view"));
  setPressed(viewSwitch, button.getAttribute("data-view"), "data-view");
  scrollTo(0, 0);
});

// Navigation panel below 1440px.
const navToggles = [...document.querySelectorAll("[data-nav-toggle]")];
const navPanel = document.getElementById("nav-panel");
let navOpener = null;
function setNav(open, opener) {
  body.setAttribute("data-nav", String(open));
  navToggles.forEach((node) => { if (node.hasAttribute("aria-expanded")) node.setAttribute("aria-expanded", String(open)); });
  if (open) { navOpener = opener; navPanel?.focus(); } else if (navOpener) { navOpener.focus(); navOpener = null; }
}
navToggles.forEach((node) => node.addEventListener("click", () => setNav(body.getAttribute("data-nav") !== "true", node)));
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && body.getAttribute("data-nav") === "true") setNav(false); });

// Filters over rows and groups: every word must match.
document.querySelectorAll("[data-filter]").forEach((input) => input.addEventListener("input", () => {
  const scope = input.closest("[data-filter-scope]");
  const terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let count = 0;
  scope.querySelectorAll("[data-q]").forEach((row) => {
    const match = terms.every((term) => row.getAttribute("data-q").includes(term));
    row.hidden = !match;
    if (match) count += 1;
  });
  scope.querySelectorAll("[data-filter-group]").forEach((group) => {
    const any = group.querySelector("[data-q]:not([hidden])");
    group.hidden = !any;
    if (terms.length && any) group.open = true;
  });
  const status = scope.querySelector("[data-filter-count]");
  if (status) status.textContent = terms.length ? `${count} ${count === 1 ? "match" : "matches"}` : status.getAttribute("data-total");
}));

// Schema trees: expand or collapse every level.
document.querySelectorAll("[data-tree-all]").forEach((button) => button.addEventListener("click", () => {
  const open = button.getAttribute("data-tree-all") === "open";
  button.closest("section").querySelectorAll("details[data-tree]").forEach((node) => { node.open = open; });
  button.closest("section").querySelectorAll("details.resp").forEach((node) => { if (open) node.open = true; });
}));

// Copy buttons.
document.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", async () => {
  const original = button.textContent;
  try { await navigator.clipboard.writeText(button.getAttribute("data-copy")); button.textContent = "Copied"; } catch { button.textContent = "Copy failed"; }
  setTimeout(() => { button.textContent = original; }, 1500);
}));

// "On this page" follows the scroll position and the address bar tracks it.
const toc = document.querySelector("[data-toc]");
if (toc) {
  const links = [...toc.querySelectorAll(".toc-s a")];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const mark = (id, track) => {
    links.forEach((link) => {
      const current = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("on", current);
      if (current) {
        link.setAttribute("aria-current", "location");
        // Keep the link visible in the bar on phones. This moves the bar only:
        // scrollIntoView would also move the page and fight the person scrolling.
        const bar = link.parentElement;
        if (bar.scrollWidth > bar.clientWidth) bar.scrollLeft = link.offsetLeft - bar.offsetLeft - (bar.clientWidth - link.offsetWidth) / 2;
      } else link.removeAttribute("aria-current");
    });
    if (track && location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
  };
  const update = () => {
    const line = toc.getBoundingClientRect().bottom + 8;
    let current = null;
    for (const section of sections) if (section.getBoundingClientRect().top <= line) current = section;
    if (current) mark(current.id, scrollY > 0);
    else { mark(sections[0]?.id, false); }
  };
  let queued = false;
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; update(); }); } }, { passive: true });
  update();
}

// Models list: letter, API, kind and name filters.
document.querySelectorAll("[data-models]").forEach((scope) => {
  const total = scope.getAttribute("data-total");
  const rows = [...scope.querySelectorAll("tr[data-q]")];
  const links = [...scope.querySelectorAll(".azj a")];
  const value = (key) => scope.querySelector(`[data-mf=${key}]`)?.value || "";
  let letter = "";
  function apply() {
    const terms = value("q").toLowerCase().trim().split(/\s+/).filter(Boolean);
    const api = value("api");
    const kind = value("kind");
    const passes = (row) => (!api || row.getAttribute("data-api") === api) && (!kind || (kind[0] === "!" ? row.getAttribute("data-kind") !== kind.slice(1) : row.getAttribute("data-kind") === kind));
    const have = new Set(rows.filter(passes).map((row) => row.getAttribute("data-q").charAt(0).toUpperCase()));
    if (letter && !have.has(letter)) letter = "";
    links.forEach((link) => {
      const name = link.getAttribute("data-letter");
      const off = !have.has(name);
      link.classList.toggle("az-dim", off);
      if (off) { link.setAttribute("aria-disabled", "true"); link.setAttribute("tabindex", "-1"); } else { link.removeAttribute("aria-disabled"); link.removeAttribute("tabindex"); }
      if (name === letter) link.setAttribute("aria-current", "true"); else link.removeAttribute("aria-current");
    });
    let count = 0;
    rows.forEach((row) => {
      const name = row.getAttribute("data-q");
      const match = passes(row) && terms.every((term) => name.includes(term)) && (!letter || name.charAt(0) === letter.toLowerCase());
      row.hidden = !match;
      if (match) count += 1;
    });
    scope.querySelector("[data-count]").textContent = `Showing ${count} of ${total}${letter ? `, names starting with ${letter}` : ""}`;
    scope.querySelector(".modelsbox").scrollTop = 0;
  }
  links.forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    if (link.getAttribute("aria-disabled") === "true") return;
    const name = link.getAttribute("data-letter");
    if (letter === name) letter = "";
    else { letter = name; const input = scope.querySelector("[data-mf=q]"); if (input) input.value = ""; }
    apply();
  }));
  scope.querySelector("[data-mf=q]")?.addEventListener("input", (event) => { if (event.target.value.trim()) letter = ""; apply(); });
  scope.querySelectorAll("select[data-mf]").forEach((select) => select.addEventListener("change", apply));
});
