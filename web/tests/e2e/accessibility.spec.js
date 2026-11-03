import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = ["/", "/reference/", "/reference/asset/emails/", "/reference/asset/emails-new/create-email/", "/reference/core/models/lead/", "/models/", "/playground/", "/postman/", "/about/", "/search/?q=lead"];

test.use({ bypassCSP: true });

for (const colorScheme of ["dark", "light"]) {
  test.describe(colorScheme, () => {
    test.use({ colorScheme });
    for (const url of PAGES) {
      test(`${url} has no accessibility violations`, async ({ page, browserName }) => {
        test.skip(browserName !== "chromium", "One engine is enough for the static rules");
        await page.goto(url);
        await page.waitForLoadState("networkidle");
        const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        expect(violations.map((violation) => `${violation.id}: ${violation.nodes[0].html}`)).toEqual([]);
      });
    }
  });
}

test("the phone menu is keyboard reachable and every target is big enough", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/about/");
  await page.locator(".menu-btn").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#nav-panel")).toBeVisible();
  const small = await page.locator("#nav-panel a").evaluateAll((links) => links.filter((link) => link.getBoundingClientRect().height < 44).length);
  expect(small).toBe(0);
});
