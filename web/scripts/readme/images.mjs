// The README's images: writes ../docs/images/*.png from the built site, in both themes, with the same
// browser the end-to-end tests use. Run `npm run build`, then `npm run readme:images`, and commit the
// results. Nothing reaches the live site: the shots come from dist/ on a local server.
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { diagramHtml } from "./diagram.mjs";

const WEB = path.resolve(import.meta.dirname, "..", "..");
const OUT = path.resolve(WEB, "..", "docs", "images");
const PORT = 4330;
const BASE = `http://127.0.0.1:${PORT}`;
const OPERATION = "/reference/asset/emails-new/create-email/";
const THEMES = ["dark", "light"];

const server = spawn("node", ["tests/e2e/serve.mjs", String(PORT)], { cwd: WEB, stdio: "ignore" });
await new Promise((resolve) => setTimeout(resolve, 500));
const browser = await chromium.launch();

async function open(theme, { width, height, scale = 2, mobile = false, url, pane }) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: scale, isMobile: mobile, hasTouch: mobile, colorScheme: theme });
  await context.addInitScript(([chosen, panes]) => {
    localStorage.setItem("site-theme", chosen);
    if (panes) localStorage.setItem("site-panes", panes);
  }, [theme, pane]);
  const page = await context.newPage();
  await page.goto(BASE + url, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  return { page, context };
}

const dataUrl = (png) => `data:image/png;base64,${png.toString("base64")}`;

async function shot(theme, options, prepare) {
  const { page, context } = await open(theme, options);
  if (prepare) await prepare(page);
  await page.waitForTimeout(200);
  const png = await page.screenshot();
  await context.close();
  return png;
}

/** The laptop and phone composition, in neutral frames on the site's ground. */
async function hero(theme) {
  const desktop = await shot(theme, { width: 1512, height: 945, url: OPERATION, pane: "split" });
  const phone = await shot(theme, { width: 393, height: 798, scale: 3, mobile: true, url: "/reference/data-ingestion/lists/add-leads-to-list/" }, async (page) => {
    await page.getByRole("button", { name: "Builder", exact: true }).first().click();
    await page.locator(".rb-seg").first().scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -120));
  });
  const dark = theme === "dark";
  const ground = dark ? "#0B0D10" : "#F5F6F8";
  const page = await (await browser.newContext({ viewport: { width: 2400, height: 1500 }, deviceScaleFactor: 1 })).newPage();
  await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent"><div style="position:relative;width:2400px;height:1500px;border-radius:40px;overflow:hidden;background:radial-gradient(circle at 80% 8%,rgba(184,243,74,${dark ? 0.16 : 0.32}),transparent 50%),${ground}">
    <div style="position:absolute;left:147px;top:117px;width:1726px;height:1138px;border-radius:37px;background:linear-gradient(#6a6a6f,#3a3a3d);box-shadow:0 30px 70px rgba(0,0,0,.45)"></div>
    <div style="position:absolute;left:150px;top:120px;width:1720px;height:1132px;border-radius:34px;background:#050505"></div>
    <img src="${dataUrl(desktop)}" style="position:absolute;left:172px;top:178px;width:1676px;border-radius:0 0 10px 10px">
    <div style="position:absolute;left:1010px;top:150px;width:10px;height:10px;border-radius:50%;background:#1f1f21"></div>
    <div style="position:absolute;left:40px;top:1252px;width:1940px;height:30px;border-radius:0 0 18px 18px;background:linear-gradient(#6a6a6f,#3a3a3d 35%,#1f1f21)"></div>
    <div style="position:absolute;left:860px;top:1252px;width:300px;height:11px;border-radius:0 0 6px 6px;background:#1f1f21"></div>
    <div style="position:absolute;left:1796px;top:426px;width:482px;height:1016px;border-radius:82px;background:linear-gradient(135deg,#6a6a6f,#3a3a3d 50%,#1f1f21);box-shadow:0 30px 70px rgba(0,0,0,.5)"></div>
    <div style="position:absolute;left:1800px;top:430px;width:474px;height:1008px;border-radius:78px;background:#050505"></div>
    <div style="position:absolute;left:1815px;top:445px;width:444px;height:978px;border-radius:63px;overflow:hidden;background:${ground}">
      <div style="position:absolute;left:0;right:0;top:0;height:61px;background:${ground}"></div>
      <img src="${dataUrl(phone)}" style="position:absolute;left:0;top:61px;width:444px">
      <div style="position:absolute;left:151px;top:12px;width:142px;height:42px;border-radius:21px;background:#050505"></div>
    </div>
  </div></body></html>`);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, `screenshot-${theme}.png`), omitBackground: true, clip: { x: 0, y: 0, width: 2400, height: 1500 } });
  await page.context().close();
}

const DIAGRAM = {
  dark: { ground: "#0B0D10", surface: "#12151A", raised: "#1A1E25", line: "#232830", text: "#E6E9EE", bright: "#FFFFFF", secondary: "#C9CFD8", muted: "#98A1AE", accent: "#B8F34A", glow: "rgba(184,243,74,.14)" },
  light: { ground: "#F5F6F8", surface: "#FFFFFF", raised: "#F5F6F8", line: "#D7DBE2", text: "#14171C", bright: "#0B0D10", secondary: "#39414D", muted: "#596270", accent: "#3C6600", glow: "rgba(184,243,74,.32)" },
};

async function diagram(theme) {
  const fonts = (file) => readFileSync(path.join(WEB, "public", "fonts", file)).toString("base64");
  const fontFace = `@font-face{font-family:Geist;src:url(data:font/woff2;base64,${fonts("Geist-Variable.woff2")});font-weight:100 900}@font-face{font-family:GeistMono;src:url(data:font/woff2;base64,${fonts("GeistMono-Variable.woff2")});font-weight:100 900}`;
  const page = await (await browser.newContext({ viewport: { width: 1480, height: 1100 }, deviceScaleFactor: 2 })).newPage();
  await page.setContent(diagramHtml({ ...DIAGRAM[theme], sans: "Geist, sans-serif", mono: "GeistMono, monospace" }, { fontFace }));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.locator(".diagram").screenshot({ path: path.join(OUT, `architecture-${theme}.png`), omitBackground: true });
  await page.context().close();
}

for (const theme of THEMES) {
  await hero(theme);
  await diagram(theme);
  await shot(theme, { width: 1500, height: 950, url: OPERATION, pane: "builder" }, async (page) => {
    await page.evaluate(() => {
      const row = document.querySelector(".rb-seg").closest(".rb-field");
      window.scrollTo(0, 0);
      document.querySelector(".builder")?.scrollTo(0, row.getBoundingClientRect().top - 140);
    });
  }).then((png) => writeFileSync(path.join(OUT, `fields-${theme}.png`), png));
  await shot(theme, { width: 1500, height: 950, url: "/search/?q=program%20members" }, async (page) => {
    await page.locator(".sresult, .result, main li").first().waitFor({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(500);
  }).then((png) => writeFileSync(path.join(OUT, `search-${theme}.png`), png));
}

await browser.close();
server.kill();
console.log(`wrote ${OUT}`);
