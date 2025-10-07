const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pageobjects/LoginPage");
const { json } = require("stream/consumers");
const dataset = JSON.parse(
  JSON.stringify(require("../../utils/loginTestData.json"))
);
const { API } = require("../../utils/API");
const { leaveDate } = require("../../utils/reusable-methods");
const {
  Leaves,
} = require("../../pageobjects/Employee Service Requests/Leaves");
const { assert } = require("console");
let SRIDs = {
  positiveFlow: null,
  negativeFlow: null,
  negativeFlowHR: null,
};
test.describe.serial("Leave Positive Flows", () => {
  test("Create Annual Leave", async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchingPage(dataset.url);
    await loginPage.login(dataset.username, dataset.password);
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    const api = new API(page, request);
    console.log(await api.getToken());
    SRIDs.positiveFlow = await api.createAnnualLeave();
    console.log(SRIDs.positiveFlow);
    await page.close();
  });
  test("Approve using LM", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchingPage(dataset.url);
    await loginPage.login(dataset.lmUsername, dataset.lmPassword);
    const leaves = new Leaves(page, SRIDs.positiveFlow);
    await leaves.approveUsingLM();
    await page.close();
  });
  test("Approve using HR", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchingPage(dataset.url);
    await loginPage.login(dataset.hrUserName, dataset.hrPassword);
    const leaves = new Leaves(page, SRIDs.positiveFlow);
    await leaves.approveUsingHR();
  });
});
test.describe.serial("Leave Negative Flows", () => {
  test("Create Annual Leave", async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchingPage(dataset.url);
    await loginPage.login(dataset.username, dataset.password);
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    const api = new API(page, request);
    console.log(await api.getToken());
    SRIDs.negativeFlow = await api.createAnnualLeave();
    console.log(SRIDs.negativeFlow);
    await page.close();
  });
  test("Reject using LM", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchingPage(dataset.url);
    await loginPage.login(dataset.lmUsername, dataset.lmPassword);
    const leaves = new Leaves(page, SRIDs.negativeFlow);
    await leaves.rejectUsingLM();
    await page.close();
  });
});
test.describe.serial("Leave Negative Flows HR", () => {
  test("Create Annual Leave", async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchingPage(dataset.url);
    await loginPage.login(dataset.username, dataset.password);
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    const api = new API(page, request);
    console.log(await api.getToken());
    SRIDs.negativeFlowHR = await api.createAnnualLeave();
    await page.close();
  });
  test("Approve using LM", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchingPage(dataset.url);
    await loginPage.login(dataset.lmUsername, dataset.lmPassword);
    const leaves = new Leaves(page, SRIDs.negativeFlowHR);
    await leaves.approveUsingLM();
    await page.close();
  });
  test("Reject using HR", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchingPage(dataset.url);
    await loginPage.login(dataset.hrUserName, dataset.hrPassword);
    const leaves = new Leaves(page, SRIDs.negativeFlowHR);
    await leaves.rejectUsingHR();
  });
});
test("Verify the filters are working fine", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.lmUsername, dataset.lmPassword);
  const leaves = new Leaves(page, SRIDs.positiveFlow);
  const {
    assertName,
    assertLeaveType,
    assertlmStatus,
    assertHrStatus,
    sortedIDs,
    ids,
    allInRange,
    allValid,
  } = await leaves.verifyFilters();
  expect(assertName).toBe(true);
  // Verify the leave filter
  expect(assertLeaveType).toBe(true);
  // Verify LM Status filter
  expect(assertlmStatus).toBe(true);
  // Verify HR Status Filter
  expect(assertHrStatus).toBe(true);
  //Verify the Sort By filter
  expect(ids).toEqual(sortedIDs);
  //Verify the Applied On Filter
  expect(allInRange).toBe(true);
  //Verify Date range filter
  expect(allValid).toBeTruthy();
  await page.pause();
});
