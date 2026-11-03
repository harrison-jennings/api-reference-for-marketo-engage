import { expect, test } from "@playwright/test";

const LEADS = "/reference/data-ingestion/lists/add-leads-to-list/";
const sample = (page) => page.locator(".rb-code code");
const fields = (page) => page.locator(".rb-fields");

test.use({ viewport: { width: 1500, height: 950 } });

test("nothing is sent anywhere but this site", async ({ page, baseURL }) => {
  const elsewhere = [];
  page.on("request", (request) => {
    const url = request.url();
    if (!url.startsWith(baseURL) && !url.startsWith("data:")) elsewhere.push(url);
  });
  await page.goto(LEADS);
  await fields(page).locator("input").first().fill("1234");
  await page.getByRole("button", { name: "Generate request" }).click();
  await page.getByRole("tab", { name: "Mock response" }).click();
  await expect(page.locator(".rb-mock__body")).toBeVisible();
  expect(elsewhere).toEqual([]);
});

test("a mock response reads as ordinary JSON", async ({ page }) => {
  await page.goto("/reference/core/leads/get-lead-by-id/");
  await page.locator('[name="path:leadId"]').fill("54321");
  await page.getByRole("tab", { name: "Mock response" }).click();
  const body = page.locator(".rb-mock__body");
  await expect(body).toContainText('"success"');
  const blocks = await body.locator("span").evaluateAll((spans) => spans.filter((span) => getComputedStyle(span).display !== "inline").length);
  expect(blocks).toBe(0);
  const lines = await body.evaluate((node) => node.textContent.split("\n").length);
  const lineHeight = await body.evaluate((node) => parseFloat(getComputedStyle(node).lineHeight));
  const height = await body.locator("code").evaluate((node) => node.getBoundingClientRect().height);
  expect(height).toBeLessThanOrEqual(lines * lineHeight + 2);
});

test("it never asks for credentials", async ({ page }) => {
  await page.goto(LEADS);
  await expect(page.locator(".rb__mode")).toHaveText("Mock mode");
  await expect(page.locator(".rb__notice")).toContainText("Nothing is sent to Marketo");
  await expect(page.locator(".rb input[type=password]")).toHaveCount(0);
  await expect(sample(page)).toContainText("<ACCESS_TOKEN>");
});

test("Fields edits reach the request, and JSON edits reach Fields", async ({ page }) => {
  await page.goto(LEADS);
  await expect(page.locator(".rb-seg__button[aria-pressed=true]")).toHaveText("Fields");
  await fields(page).locator("input").first().fill("777");
  await expect(sample(page)).toContainText("777");

  await page.getByRole("button", { name: "JSON", exact: true }).click();
  const json = page.locator(".rb-editor textarea");
  await expect(json).toHaveValue(/777/);
  await json.fill((await json.inputValue()).replace("777", "888"));
  await page.getByRole("button", { name: "Fields", exact: true }).click();
  await expect(fields(page).locator("input").first()).toHaveValue("888");
});

test("array items can be added and removed", async ({ page }) => {
  await page.goto(LEADS);
  const items = page.locator(".rb-item");
  const before = await items.count();
  await page.getByRole("button", { name: "Add item to input" }).click();
  await expect(items).toHaveCount(before + 1);
  await page.keyboard.type("55");
  await expect(sample(page)).toContainText("55");
  await items.last().getByRole("button", { name: /Remove/ }).click();
  await expect(items).toHaveCount(before);
  await expect(sample(page)).not.toContainText('"leadId": 55');
});

test("invalid JSON stays in JSON view and says why", async ({ page }) => {
  await page.goto(LEADS);
  await page.getByRole("button", { name: "JSON", exact: true }).click();
  await page.locator(".rb-editor textarea").fill("{ bad");
  await page.getByRole("button", { name: "Fields", exact: true }).click();
  await expect(page.locator(".rb-seg__button[aria-pressed=true]")).toHaveText("JSON");
  await expect(page.locator(".rb-editor [role=status]")).toContainText("isn't valid");
});

test("errors appear against the field, which takes focus", async ({ page }) => {
  await page.goto(LEADS);
  await fields(page).locator("input").first().fill("");
  await page.getByRole("button", { name: "Generate request" }).click();
  await expect(fields(page).locator(".rb-field__error:not([hidden])").first()).toContainText("listId is required");
  await expect(page.locator(":focus")).toHaveAttribute("aria-invalid", "true");
});

test("the view is remembered across operations", async ({ page }) => {
  await page.goto(LEADS);
  await page.getByRole("button", { name: "JSON", exact: true }).click();
  await page.goto("/reference/data-ingestion/lists/remove-leads-from-list/");
  await expect(page.locator(".rb-seg__button[aria-pressed=true]")).toHaveText("JSON");
});

test("the code sample language is remembered", async ({ page }) => {
  await page.goto(LEADS);
  await page.getByRole("tab", { name: "Python" }).click();
  await page.goto("/reference/asset/channels/get-channels/");
  await expect(page.getByRole("tab", { name: "Python" })).toHaveAttribute("aria-selected", "true");
});

test("the playground builds any operation", async ({ page }) => {
  await page.goto("/playground/");
  await expect(page.locator(".rb__mode")).toHaveText("Mock mode");
  await expect(sample(page)).toContainText("curl");
});
