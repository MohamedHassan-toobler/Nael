const { test, expect } = require("@playwright/test");
const { Divisions } = require("../pageobjects/Divisions");
const { LoginPage } = require("../pageobjects/LoginPage");
const { json } = require("stream/consumers");
const dataset = JSON.parse(
  JSON.stringify(require("../utils/loginTestData.json"))
);
const url = "https://cloud.apps.nael.thingspine.com/";
test.only('Verify that clicking the button labeled "Divisions" triggers the expected action (e.g., navigating to the division page).', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(url);
  await loginPage.login(dataset.username, dataset.password);
  const divisions = new Divisions(page);
  await divisions.launchDivision();
  //Verify that user can create divisions
  await page.waitForSelector(".MuiTableRow-root", { state: "visible" });
  const divisionRow = page.locator(".MuiTableRow-root");
  await page.waitForSelector(".css-16snj3q", { state: "visible" });
  const parentDivList = divisionRow.locator(".css-16snj3q");
  const existingParentTexts = [];
  for (let i = 0; i < (await parentDivList.count()); i++) {
    if (i % 2 != 0) {
      const existingParentDiv = await parentDivList.nth(i).textContent();
      if (existingParentDiv && existingParentDiv.trim() != "-") {
        existingParentTexts.push(existingParentDiv);
      }
    }
  }
  let parentDivRandomValue = Math.floor(
    Math.random() * existingParentTexts.length
  );
  let randomParentDiv = existingParentTexts[parentDivRandomValue];
  const createDivisionButton = page.getByText("Create New Division");
  await createDivisionButton.click();
  const divRandomnum = Math.floor(Math.random() * 100);
  const divisionInput = page.getByPlaceholder("Enter a division name");
  await divisionInput.fill("Test Division " + divRandomnum);
  const divdisplayInput = page.getByPlaceholder("Enter a display name");
  await divdisplayInput.fill("Test display Division " + divRandomnum);
  const newDivisionInput = await divdisplayInput.inputValue();
  await page
    .getByPlaceholder("Select parent division")
    .pressSequentially(randomParentDiv);
  await page.getByPlaceholder("Select parent division").press("ArrowDown");
  await page.getByPlaceholder("Select parent division").press("Enter");
  const managerInput = page.getByPlaceholder("Select manager name");
  await managerInput.pressSequentially("Baisil");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  const saveButton = page.getByText("Save");
  await expect(saveButton).toBeVisible();
  await saveButton.click();
  //Verify the Search is working
  await page.waitForSelector(
    `.MuiTableRow-root:has-text("${newDivisionInput}")`,
    { state: "visible", timeout: 10000 }
  );
  await page.waitForSelector("input[type$='text']", { state: "visible" });
  const searchInput = page.getByLabel("Search");
  await expect(searchInput).toBeVisible();
  await searchInput.pressSequentially(newDivisionInput);
  await page.waitForSelector(
    `.MuiTableRow-root:has-text("${newDivisionInput}")`,
    { state: "visible", timeout: 10000 }
  );
  await page.waitForSelector(".css-16snj3q", { state: "visible" });
  expect(await page.locator(".css-16snj3q").first().textContent()).toContain(
    newDivisionInput
  );
  //Verify that Clear Filter Button is working
  const searchedResult = await page
    .locator("p.MuiTablePagination-displayedRows")
    .textContent();
  const result = parseInt(searchedResult.match(/of\s+(\d+)/)[1]); // Gets the number after "of "
  await page.getByRole("button", { name: "Clear Filter" }).click();
  await page.waitForSelector(".css-16snj3q", { state: "visible" });
  const searchedResult1 = await page
    .locator("p.MuiTablePagination-displayedRows")
    .textContent();
  const result1 = parseInt(searchedResult1.match(/of\s+(\d+)/)[1]); // Gets the number after "of "
  expect(result).not.toBe(result1);
  //Verify that edit is working
  await page.waitForSelector("input[type$='text']", { state: "visible" });
  await expect(searchInput).toBeVisible();
  await searchInput.pressSequentially(newDivisionInput);
  await page.waitForSelector(
    `.MuiTableRow-root:has-text("${newDivisionInput}")`,
    { state: "visible", timeout: 10000 }
  );
  await page.waitForSelector(".css-16snj3q", { state: "visible" });
  expect(await page.locator(".css-16snj3q").first().textContent()).toContain(
    newDivisionInput
  );
  const optionsMenu = page.locator("#long-button");
  await optionsMenu.first().click();
  await page.getByText("Edit").click();
  await divdisplayInput.clear();
  await divdisplayInput.fill("Test edited display Division " + divRandomnum);
  const editeddivision = await divdisplayInput.inputValue();
  await managerInput.clear();
  await managerInput.pressSequentially("Jacob");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(saveButton).toBeVisible();
  await saveButton.click();
  await page.getByRole("button", { name: "Clear Filter" }).click();
  await page.waitForSelector(
    `.MuiTableRow-root:has-text("${editeddivision}")`,
    { state: "visible", timeout: 10000 }
  );
  await page.waitForSelector("input[type$='text']", { state: "visible" });
  await expect(searchInput).toBeVisible();
  await searchInput.pressSequentially(editeddivision);
  await page.waitForSelector(
    `.MuiTableRow-root:has-text("${editeddivision}")`,
    { state: "visible", timeout: 10000 }
  );
  await page.waitForSelector(".css-16snj3q", { state: "visible" });
  expect(await page.locator(".css-16snj3q").first().textContent()).toContain(
    editeddivision
  );
  await page.waitForSelector(
    `.MuiTableRow-root:has-text("${editeddivision}")`,
    { state: "visible", timeout: 10000 }
  );
  const managerList = page.locator("div.css-1m2azep > div > div");
  const updatedManagerData = await managerList.last().textContent();
  expect(updatedManagerData).toContain("Jacob");
  //Verify that Delete is working
  await optionsMenu.first().click();
  await page.getByText("Delete").click();
  await page.getByText("OK").click();
  await page.getByRole("button", { name: "Clear Filter" }).click();
  await page.waitForSelector(".css-16snj3q", { state: "visible" });
  const searchedResult2 = await page
    .locator("p.MuiTablePagination-displayedRows")
    .textContent();
  const result2 = parseInt(searchedResult2.match(/of\s+(\d+)/)[1]);
  expect(result1).not.toBe(result2);
  await page.pause();
});
