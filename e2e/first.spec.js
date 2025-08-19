const { test } = require("@playwright/test");

test('Verify that clicking the "Sign in" button successfully submits the login form when valid credentials are entered.', async ({
  page,
}) => {
  //    const context = await browser.newContext();
  //    const page = await context.newPage();
  await page.goto("https://cloud.apps.nael.thingspine.com/");
  await page.locator("input[id=':Rclkn:']").fill("jeswin@example.com");
  await page.locator("[name='password']").fill("Jesw#12627");
  await page.locator("button[value='password']").click();
  await page.keyboard.press("ArrowDown");
});
