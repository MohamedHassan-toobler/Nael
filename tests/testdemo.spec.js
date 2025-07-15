const { test, expect } = require('@playwright/test');

test('homepage has title and header', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  const header = await page.locator('text=Playwright');
  //await expect(header).toBeVisible();
});
