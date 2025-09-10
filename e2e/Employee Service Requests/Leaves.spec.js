const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pageobjects/LoginPage");
const { json } = require("stream/consumers");
const dataset = JSON.parse(
  JSON.stringify(require("../../utils/loginTestData.json"))
);
const { API } = require("../../utils/API");
test("Extract and print id_token", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.username, dataset.password);
  await page.waitForLoadState("networkidle", { timeout: 30000 });
  const api = new API(page, request);
  console.log(await api.getToken());
  await api.createAnnualLeave();
});
test.only("Approve using LM", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.lmUsername, dataset.lmPassword);
  await page.getByText("Employee Service Request").click();
  await page.pause();
});
