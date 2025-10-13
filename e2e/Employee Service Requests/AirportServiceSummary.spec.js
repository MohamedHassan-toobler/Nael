const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pageobjects/LoginPage");
const { json } = require("stream/consumers");
const dataset = JSON.parse(
  JSON.stringify(require("../../utils/loginTestData.json"))
);
const {
  Leaves,
} = require("../../pageobjects/Employee Service Requests/Leaves");
const {
  AirportServiceSummary,
} = require("../../pageobjects/Employee Service Requests/AirportServiceSummary");
test.describe("Airport Service Summary Tests", () => {
  let loginPage, leaves, airportServiceSummary;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.launchingPage(dataset.url);
    await loginPage.login(dataset.username, dataset.password);
    leaves = new Leaves(page);
    await leaves.launchEmployeeServiceRequestPage();
    airportServiceSummary = new AirportServiceSummary(page);
  });
  test.beforeEach(
    "Verify the Airport Service Summary tab navigation is working",
    async ({ page }) => {
      await airportServiceSummary.launchAirportServiceSummary();
    }
  );
  test("Verify the Airport Service Summary tab filters are working", async ({
    page,
  }) => {
    const { assertSearch, assertYear, allInRange } =
      await airportServiceSummary.verifyFilters();
    //Verify the Search filter
    expect(assertSearch).toBe(true);
    //Verify the Year filter
    expect(assertYear).toBe(true);
    //Verify the Usage Count filter
    expect(allInRange).toBe(true);
  });
});
