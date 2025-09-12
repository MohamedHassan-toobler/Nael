// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const backdropname = "TestBackdrop";
const tablebody="tbody[class='MuiTableBody-root css-1xnox0e']";
test('Check user can create new attendance backdrop', async ({ page }) => {
  await page.goto("https://cloud.apps.nael.thingspine.com/");
  await page.locator("input[id=':Rclkn:']").fill("jeswin@example.com");
  await page.locator("[name='password']").fill("Jesw#12627");
  await page.locator("button[value='password']").click();
  await page.locator("a[href='#/bakdrop-image-management']").click();
  //Verify that user can create new attendance backdrop
  await page.locator("button[id='add-Add New']").click();
  await page.locator("input[name='title']").fill(backdropname);
  await page.locator("input[placeholder='DD/MM/YYYY']").fill("20/06/2026");
 const hiddenInput = page.locator('input[type="file"]').first();
const inputHandle = await hiddenInput.elementHandle();
if (inputHandle) {
  await page.evaluate(el => { if (el) el.style.display = 'block'; }, inputHandle);
  await hiddenInput.setInputFiles('/home/toobler/Nael/Images/www.toobler.com (2) (1).jpg');
} else {
  throw new Error('File input element not found');
}
await page.waitForTimeout(2000);
await page.locator("div[class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 css-58g6y9']:nth-child(2)>button").click();

});
test('Check user can edit attendance backdrop', async ({ page }) => {
  await page.goto("https://cloud.apps.nael.thingspine.com/");
  await page.locator("input[id=':Rclkn:']").fill("jeswin@example.com");
  await page.locator("[name='password']").fill("Jesw#12627");
  await page.locator("button[value='password']").click();
  await page.locator("a[href='#/bakdrop-image-management']").click();
  await page.locator(tablebody).locator("tr:nth-child(1)>td:nth-child(7)>div>button").click();
  await page.locator("ul[role='menu'] li:nth-child(1)").click();
  await page.locator('text=Edit').click();
  // Update the title
  await page.locator('input[name="title"]').fill('UpdatedBackdropTitle');

  // Click Save
  await page.locator('button:has-text("Save")').click();
});
test.skip('Check user can delete attendance backdrop', async ({ page }) => {
  await page.goto("https://cloud.apps.nael.thingspine.com/");
  await page.locator("input[id=':Rclkn:']").fill("jeswin@example.com");
  await page.locator("[name='password']").fill("Jesw#12627");
  await page.locator("button[value='password']").click();
  await page.locator("a[href='#/bakdrop-image-management']").click();

  // Open menu for first row
  await page.locator(tablebody).locator("tr:nth-child(1)>td:nth-child(7)>div>button").click();

  // Click Delete option
  await page.locator("ul[role='menu'] li:nth-child(2)").click();

  // Confirm delete if a confirmation dialog appears
  await page.locator('button:has-text("OK")').click();

})
  test('Check search and filter functionality in attendance backdrop', async ({ page }) => {
  await page.goto("https://cloud.apps.nael.thingspine.com/");
  await page.locator("input[id=':Rclkn:']").fill("jeswin@example.com");
  await page.locator("[name='password']").fill("Jesw#12627");
  await page.locator("button[value='password']").click();
  await page.locator("a[href='#/bakdrop-image-management']").click();

  // Search by title
  await page.locator('input[id="name-or-udid"]').fill('Test');
  await page.waitForTimeout(1000); // Wait for search results to update
  await expect(page.locator(tablebody)).toContainText('Test');

  // Clear search
  await page.locator('input[id="name-or-udid"]').fill('');
  await page.waitForTimeout(500);

  // Filter by status (e.g., Upcoming)
  // Open the Status filter dropdown
await page.locator('div[role="combobox"][aria-haspopup="listbox"]').click();

// Select "Upcoming" from the dropdown options
await page.locator('li[role="option"]:has-text("Upcoming")').click();
  await page.waitForTimeout(1000); // Wait for filter results to update
  await expect(page.locator(tablebody)).toContainText('Upcoming');

  // Clear filter
  await page.locator('button:has-text("Clear Filter")').click();
  await page.waitForTimeout(500);

  // Optionally, check that all results are visible again
  });