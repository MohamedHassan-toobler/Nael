const { test, expect } = require("@playwright/test");
test.only('Verify that clicking the button labeled "Divisions" triggers the expected action (e.g., navigating to the division page).', async ({
  page,
}) => {
  await page.goto("https://cloud.apps.nael.thingspine.com/");
  await page.locator("input[id=':Rclkn:']").fill("jeswin@example.com");
  await page.locator("[name='password']").fill("Jesw#12627");
  await page.locator("button[value='password']").click();
  await page.getByText("Divisions").click();
  //Verify that user can create divisions
  await page.waitForSelector(".MuiTableRow-root", { state: "visible" });
  const divisionRow = page.locator(".MuiTableRow-root");
  await page.waitForSelector(".css-16snj3q", { state: "visible" });
  const parentDivList = divisionRow.locator(".css-16snj3q");
  const existingParentTexts = [];
  for (let i = 0; i <= (await parentDivList.count()); i++) {
    if (i % 2 != 0) {
      const existingParentDiv = await parentDivList.nth(i).textContent();
      if (existingParentDiv && existingParentDiv.trim() != "-") {
        existingParentTexts.push(existingParentDiv);
      }
    }
  }
  var parentDivRandomValue = Math.floor(
    Math.random() * existingParentTexts.length - 1
  );
  if (parentDivRandomValue === -1) {
    //If it prints -1 we are changing it to 0
    parentDivRandomValue + 1;
  }
  var randomParentDiv = existingParentTexts[parentDivRandomValue];
  const createDivisionButton = page.getByText("Create New Division");
  await createDivisionButton.click();
  const divRandomnum = Math.floor(Math.random() * 100);
  await page
    .getByPlaceholder("Enter a division name")
    .fill("Test Division " + divRandomnum);
  await page
    .getByPlaceholder("Enter a display name")
    .fill("Test display Division " + divRandomnum);
  await page
    .getByPlaceholder("Select parent division")
    .pressSequentially(randomParentDiv);
  await page.getByPlaceholder("Select manager name").click();
  await page.pause();
});
