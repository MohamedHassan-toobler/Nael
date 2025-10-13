const { randNumb } = require("../../utils/reusable-methods");
class AirportServiceSummary {
  constructor(page) {
    this.page = page;
    this.airportServiceSummaryButton = page.getByRole("tab", {
      name: "Airport Services Summary",
    });
    this.employeeList = page.locator("th.css-119zi0w a.css-1cqfher");
    this.searchBox = page.getByRole("combobox", { name: "Search" });
    this.yearFilter = page.locator("button[aria-label='Choose date']");
    this.yearOption = page.getByRole("radio", { name: "2024" });
    this.clearFilterButton = page.getByRole("button", { name: "Clear Filter" });
    this.fullPagination = page.locator("p.MuiTablePagination-displayedRows");
    this.usageCountFilter = page.getByRole("combobox", { name: "Usage Count" });
    this.usageCountOption = page.locator("button[value='Less than 5']");
  }
  async launchAirportServiceSummary() {
    await this.airportServiceSummaryButton.click();
  }
  async verifyFilters() {
    //Verify Search filter
    await this.page.waitForSelector("th.css-119zi0w", {
      state: "visible",
      timeout: 30000,
    });
    const employeeList = await this.employeeList.allTextContents();
    const randomIndex = randNumb(15);
    const searchText = employeeList[randomIndex];
    await this.searchBox.pressSequentially(searchText);
    await this.searchBox.focus();
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
    const filteredEmployeeList = await this.employeeList.allTextContents();
    const assertSearch = await filteredEmployeeList.every((name) =>
      name.includes(searchText)
    );
    await this.clearFilterButton.click();
    //Verify the Year filter
    const searchedResultCount = await this.fullPagination.textContent();
    const splitResult = parseInt(searchedResultCount.match(/of\s+(\d+)/)[1]);
    await this.yearFilter.click();
    await this.page.waitForSelector(".css-12zdaiz", { state: "visible" });
    await this.yearOption.click();
    await this.page.waitForLoadState("networkidle");
    const filteredResultCount = await this.fullPagination.textContent();
    const splitResult1 = parseInt(filteredResultCount.match(/of\s+(\d+)/)[1]);
    const assertYear = splitResult1 != splitResult;
    await this.clearFilterButton.click();
    //Verify the Usage Count Filter
    await this.usageCountFilter.click();
    await this.usageCountFilter.focus();
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
    const usageCountValues = await this.page.locator("h6").allTextContents();
    const allInRange = usageCountValues.every((val) => {
      const num = parseInt(val);
      return num < 5;
    });
    await this.clearFilterButton.click();
    return { assertSearch, assertYear, allInRange };
  }
}
module.exports = { AirportServiceSummary };
