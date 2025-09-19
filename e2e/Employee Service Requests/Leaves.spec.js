//
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pageobjects/LoginPage");
const { json } = require("stream/consumers");
const dataset = JSON.parse(
  JSON.stringify(require("../../utils/loginTestData.json"))
);
const { API } = require("../../utils/API");
const { leaveDate } = require("../../utils/reusable-methods");
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
test.only("Verify the filters are working fine", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launchingPage(dataset.url);
  await loginPage.login(dataset.username, dataset.password);
  await page.getByText("Employee Service Request").click();
  //Verify the Search is working fine or not\
  await page.waitForSelector(".css-pd9d3b", {
    state: "visible",
    timeout: 50000,
  });
  await page.getByRole("combobox", { name: "Search" }).fill("jesw");
  await page.getByRole("option", { name: "Jeswin Johnson -" }).click();
  const nameColumn = page.locator("td.css-obtukx .css-19k09g7");
  // Grab all the cell texts
  await page.waitForSelector("td.css-obtukx .css-19k09g7", {
    state: "visible",
    timeout: 5000,
  });
  const values = await nameColumn.allTextContents();
  // Assert all values contain "Jeswin Johnson"
  expect(values.every((val) => val.includes("Jeswin Johnson"))).toBe(true);
  await page.getByRole("button", { name: "Clear Filter" }).click();
  // Verify the leave filter
  await page.getByRole("combobox", { name: "Leave Type" }).fill("Ann");
  await page.getByRole("option", { name: "Annual Leave" }).click();
  await page.waitForSelector(".css-149vd0d", {
    state: "visible",
    timeout: 5000,
  });
  const leaveTypeRows = page.locator("#trtype-3");
  const leaveTypeValues = await leaveTypeRows.allTextContents();
  const valuesToCheck = leaveTypeValues.slice(1);
  expect(valuesToCheck.every((val) => val.includes("Annual Leave"))).toBe(true);
  await page.getByRole("button", { name: "Clear Filter" }).click();
  // Verify LM Status filter
  await page.getByRole("combobox", { name: "LM Status" }).click();
  await page.getByText("Approved / Skip LM").click();
  await page.waitForSelector(".css-19imqg1", {
    state: "visible",
    timeout: 10000,
  });
  const lmStatus = await page.locator("td:nth-child(9)").allTextContents();
  expect(lmStatus.every((val) => val === "Approved" || val === "NA")).toBe(
    true
  );
  // Verify HR Status Filter
  await page.getByRole("combobox", { name: "HR Status" }).click();
  await page.getByRole("option", { name: "Approved" }).locator("div").click();
  await page.waitForSelector(".css-19imqg1", {
    state: "visible",
    timeout: 10000,
  });
  const hrStatus = await page.locator("td:nth-child(10)").allTextContents();
  expect(hrStatus.every((val) => val === "Approved")).toBe(true);
  await page.getByRole("button", { name: "Clear Filter" }).click();
  const idTexts = await page.locator("td:nth-child(3)").allTextContents();
  const soretdID = idTexts.sort((a, b) => a - b);
  await page.pause();
 appliedOnFilter
  // // add
=======

  // 
  // //

 master
});
