const { test, expect } = require("@playwright/test");
const { Divisions } = require("../pageobjects/Divisions");
const { LoginPage } = require("../pageobjects/LoginPage");
const { json } = require("stream/consumers");
const dataset = JSON.parse(
  JSON.stringify(require("../utils/loginTestData.json"))
);
test.only('Verify that clicking the button labeled "Divisions" triggers the expected action (e.g., navigating to the division page).', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.username, dataset.password);
  const divisions = new Divisions(page);
  await divisions.launchDivision();
  //Verify that user can create divisions
  await divisions.createDivision();
  //Verify the Search is working
  const resultText = await divisions.searchDivision();
  expect(resultText).toContain(await divisions.newDivisionInput);
  //Verify that Clear Filter Button is working
  const { before, after } = await divisions.clearFilter();
  expect(after).toBeGreaterThan(before);
  //Verify that edit is working
  const { returnSearchresult, editedSearchResult, updatedManagerData } =
    await divisions.editDivision();
  expect(returnSearchresult).toContain(await divisions.newDivisionInput);
  expect(editedSearchResult).toContain(await divisions.editeddivision);
  expect(updatedManagerData).toContain("Jacob");
  //Verify that Delete is working
  const deletedResultAssertion = await divisions.deleteDivisions();
  expect(deletedResultAssertion).toBeLessThan(after);
  await page.pause();
});
