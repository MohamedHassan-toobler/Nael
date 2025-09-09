const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pageobjects/LoginPage");
const { json } = require("stream/consumers");
const dataset = JSON.parse(
  JSON.stringify(require("../../utils/loginTestData.json"))
);
const { API } = require("../../utils/API");
test.only("Extract and print id_token", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.username, dataset.password);
  await page.waitForLoadState("networkidle", { timeout: 30000 });
  const api = new API(page, request);
  console.log(await api.getToken());
  await api.createAnnualLeave();
  await page.pause();
});
