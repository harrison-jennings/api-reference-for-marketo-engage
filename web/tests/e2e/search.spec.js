import { expect, test } from "@playwright/test";

test("the jump bar finds an operation by path", async ({ page }) => {
  await page.setViewportSize({ width: 1500, height: 800 });
  await page.goto("/");
  await page.keyboard.press("/");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("combobox").or(dialog.locator("input")).first().fill("leads.json");
  await expect(dialog.getByRole("option").or(dialog.locator("a")).first()).toBeVisible();
});

test("full-text search returns results", async ({ page }) => {
  await page.goto("/search/?q=filterValues");
  await expect(page.locator("main")).toContainText(/filterValues/i);
  await expect(page.locator(".res-x mark").first()).toBeVisible();
  await expect(page.locator(".res-x script")).toHaveCount(0);
});

test("the operation finder narrows the list", async ({ page }) => {
  await page.goto("/search/?tab=finder&q=smart%20campaign");
  await expect(page.locator("main")).toContainText(/of 388 operations/);
});

test("the models list filters by first letter", async ({ page }) => {
  await page.goto("/models/");
  await page.getByRole("link", { name: "R", exact: true }).click();
  await expect(page.locator("main")).toContainText(/names starting with R/);
  await page.getByRole("link", { name: "R", exact: true }).click();
  await expect(page.locator("main")).not.toContainText(/names starting with R/);
});
