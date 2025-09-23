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
  //Verify the Search is working fine or not
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
  // await page.getByRole("combobox", { name: "Leave Type" }).fill("Ann");
  // await page.getByRole("option", { name: "Annual Leave" }).click();
  // await page.waitForSelector("td:nth-child(4)", {
  //   state: "visible",
  //   timeout: 5000,
  // });
  // const leaveTypeRows = page.locator("td:nth-child(4)");
  // const leaveTypeValues = await leaveTypeRows.allTextContents();
  // expect(
  //   leaveTypeValues.every((val) => val.trim().includes("Annual Leave"))
  // ).toBe(true);
  // await page.getByRole("button", { name: "Clear Filter" }).click();
  // // Verify LM Status filter
  // await page.getByRole("combobox", { name: "LM Status" }).click();
  // await page.getByText("Approved / Skip LM").click();
  // await page.waitForSelector("td:nth-child(9)", {
  //   state: "visible",
  //   timeout: 10000,
  // });
  // const lmStatus = await page.locator("td:nth-child(9)").allTextContents();
  // expect(
  //   lmStatus.every(
  //     (val) => val.trim().includes("Approved") || val.trim().includes("NA")
  //   )
  // ).toBe(true);
  // // Verify HR Status Filter
  // await page.getByRole("combobox", { name: "HR Status" }).click();
  // await page.getByRole("option", { name: "Approved" }).locator("div").click();
  // await page.waitForSelector("td:nth-child(10)", {
  //   state: "visible",
  //   timeout: 10000,
  // });
  // const hrStatus = await page.locator("td:nth-child(10)").allTextContents();
  // expect(hrStatus.every((val) => val === "Approved")).toBe(true);
  // await page.getByRole("button", { name: "Clear Filter" }).click();
  // //Verify the Sort By filter
  // await page
  //   .locator("div")
  //   .filter({ hasText: /^Sort By$/ })
  //   .click();
  // await page.getByText("NCID").click();
  // const idTexts = await page.locator("td:nth-child(3)").allTextContents();
  // const ids = idTexts.map((val) => parseInt(val.trim(), 10));
  // const sortedIDs = [...ids].sort((a, b) => a - b);
  // expect(ids).toEqual(sortedIDs);
  // await page.getByRole("button", { name: "Clear Filter" }).click();
  //Verify the Applied On Filter
  // const appliedOnList = page.locator("td:nth-child(5)");
  // const appliedOnText = await appliedOnList.first().textContent();
  // const [day, monthText, year] = appliedOnText.trim().split(" ");
  // await page.getByPlaceholder("Applied On").click();
  // await page
  //   .locator(
  //     "button[class='rs-calendar-header-title rs-calendar-header-title-date rs-btn rs-btn-subtle rs-btn-xs']"
  //   )
  //   .click();
  // const pickedMonthYear = page.locator(
  //   `div[aria-label='${monthText + " " + year}']`
  // );
  // await pickedMonthYear.getByText(monthText).click();
  // await page.getByTitle("01" + " " + monthText + " " + year).click();
  // await page.getByTitle(appliedOnText).click();
  // await page.getByRole("button", { name: "OK" }).click();
  // await page.waitForSelector("td:nth-child(5)", {
  //   state: "visible",
  //   timeout: 10000,
  // });
  // const appliedOnInputValues = await page
  //   .getByPlaceholder("Applied On")
  //   .inputValue();
  // const [trimmedStartDate, trimmedEndDate] = appliedOnInputValues.split(
  //   /-(?=\d{2}-[A-Za-z]{3}-\d{4}$)/
  // );
  // const startDate = new Date(trimmedStartDate.trim());
  // const endDate = new Date(trimmedEndDate.trim());
  // const appliedOnFilteredText = await appliedOnList.allInnerTexts();
  // const allInRange = appliedOnFilteredText.every((dateStr) => {
  //   const date = new Date(dateStr.trim()); // Convert string from table to Date
  //   return date >= startDate && date <= endDate; // Check if it's within your filter range
  // });
  // expect(allInRange).toBe(true);
  // await page.getByRole("button", { name: "Clear Filter" }).click();
  //Verify Date range filter
  const dateRangeList = page.locator("td:nth-child(6)");
  const firstdateRangeText = await dateRangeList.first().textContent();
  console.log(firstdateRangeText);
  await page.pause();
});
