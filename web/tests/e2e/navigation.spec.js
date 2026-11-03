import { expect, test } from "@playwright/test";

const OPERATION = "/reference/asset/channels/get-channels/";
const PAGES = ["/", "/reference/", "/reference/asset/", "/reference/asset/channels/", OPERATION, "/reference/asset/models/", "/reference/core/models/lead/", "/models/", "/playground/", "/postman/", "/about/", "/notices/", "/search/", "/does-not-exist/"];

test.describe("on a phone", () => {
  test.use({ viewport: { width: 390, height: 800 } });

  for (const url of PAGES) {
    test(`${url} has a theme toggle and a menu that opens`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator(".themeb")).toBeVisible();
      await page.locator(".menu-btn").click();
      await expect(page.locator("#nav-panel")).toBeVisible();
      await expect(page.locator("#nav-panel").getByRole("link", { name: "Models", exact: true })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator(".menu-btn")).toHaveAttribute("aria-expanded", "false");
    });
  }

  test("the theme toggle changes the theme and remembers it", async ({ page }) => {
    await page.goto(OPERATION);
    const before = await page.evaluate(() => document.documentElement.dataset.theme);
    await page.locator(".themeb").click();
    const after = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(after).not.toBe(before);
    await page.goto("/about/");
    expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe(after);
  });
});

for (const width of [800, 1024, 1280]) {
  test(`Models, Playground and Postman can be reached at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    for (const url of ["/", OPERATION, "/playground/"]) {
      await page.goto(url);
      const open = await page.locator(".menu-btn").isVisible();
      if (open) await page.locator(".menu-btn").click();
      const scope = page.locator(open ? "#nav-panel" : ".sitenav");
      for (const name of [/^Models$/, /Playground$/, /^Postman$/]) await expect(scope.getByRole("link", { name }).first()).toBeVisible();
    }
  });
}

for (const width of [320, 390, 700, 900, 1100, 1440]) {
  test(`nothing scrolls sideways at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    for (const url of ["/", OPERATION, "/models/", "/playground/"]) {
      await page.goto(url);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), url).toBeLessThanOrEqual(0);
    }
  });
}

test("the footer carries the disclaimer and the author link", async ({ page }) => {
  await page.goto(OPERATION);
  const footer = page.locator("footer.foot");
  await expect(footer).toContainText("THIS SITE IS NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF ADOBE MARKETO ENGAGE.");
  await expect(footer.locator("a[rel=author]")).toHaveAttribute("href", "https://www.harrisonjennings.au/");
});

test("the 404 page says so", async ({ page }) => {
  const response = await page.goto("/does-not-exist/");
  expect(response.status()).toBe(404);
  await expect(page.locator("h1")).toBeVisible();
});

test("the page keeps scrolling with the wheel", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Wheel events aren't supported on WebKit on every platform");
  await page.setViewportSize({ width: 1500, height: 800 });
  await page.goto("/reference/asset/emails-new/list-emails/");
  await page.locator("main.docs").hover();
  for (let i = 0; i < 8; i += 1) await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
});
