const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pageobjects/LoginPage");
const { json } = require("stream/consumers");
const dataset = JSON.parse(
  JSON.stringify(require("../../utils/loginTestData.json"))
);
const { API } = require("../../utils/API");
let SRID;
test("Create Annual Leave", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.username, dataset.password);
  await page.waitForLoadState("networkidle", { timeout: 30000 });
  const api = new API(page, request);
  console.log(await api.getToken());
  SRID = await api.createAnnualLeave();
  console.log(SRID);
});
test("Approve using LM", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.lmUsername, dataset.lmPassword);
  await page.getByText("Employee Service Request").click();
  await page.getByText("#" + SRID).click();
  await page.getByRole("button", { name: "Approve" }).click();
  await page.pause();
});
test.skip("Approve using HR", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.hrUserName, dataset.hrPassword);
  await page.getByText("Employee Service Request").click();
  await page.getByText("#" + SRID).click();
  await page.getByRole("button", { name: "Approve" }).click();
  await page.pause();
});
test.skip("Reject using LM", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.lmUsername, dataset.lmPassword);
  await page.getByText("Employee Service Request").click();
  await page.getByText("#" + SRID).click();
  await page.getByPlaceholder("Enter comment").fill("Test Reject By LM");
  await page.getByRole("button", { name: "Reject" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.pause();
});
test("Reject using HR", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.hrUserName, dataset.hrPassword);
  await page.getByText("Employee Service Request").click();
  await page.getByText("#" + SRID).click();
  await page.getByPlaceholder("Enter comment").fill("Test Reject By HR");
  await page.getByRole("button", { name: "Reject" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.pause();
});
test.skip("Verify the filters are working fine", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.userName, dataset.password);
  await page.getByText("Employee Service Request").click();
  await page.pause();
});
