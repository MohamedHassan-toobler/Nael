class Leaves {
  constructor(page, SRID) {
    this.page = page;
    this.employeeServicePage = page.getByText("Employee Service Request");
    this.SRID = SRID;
    this.approveButton = page.getByRole("button", { name: "Approve" });
    this.commentField = page.getByPlaceholder("Enter comment");
    this.rejectButton = page.getByRole("button", { name: "Reject" });
    this.okButton = page.getByRole("button", { name: "OK" });
    this.searchField = page.getByRole("combobox", { name: "Search" });
    this.clearFilterButton = page.getByRole("button", { name: "Clear Filter" });
    this.autoSuggestiveDropdown = page.getByRole("option", {
      name: "Jeswin Johnson -",
    });
    this.nameColumn = page.locator("td.css-obtukx .css-19k09g7");
    this.lmStatusFilter = page.getByRole("combobox", { name: "LM Status" });
    this.lmStatusOption = page.getByRole("option", {
      name: "Approved / Skip LM",
    });
    this.leaveTypeFilter = page.getByRole("combobox", { name: "Leave Type" });
    this.annualLeaveOption = page.getByRole("option", { name: "Annual Leave" });
    this.leaveTypeRows = page.locator("td:nth-child(4)");
    this.hrStatusFilter = page.getByRole("combobox", { name: "HR Status" });
    this.fromDateFilter = page.getByPlaceholder("From Date");
    this.toDateFilter = page.getByPlaceholder("To Date");
    this.applyButton = page.getByRole("button", { name: "Apply" });
    this.leaveTypeRows = page.locator("td:nth-child(4)");
    this.hrStatusFilter = page.getByRole("combobox", { name: "HR Status" });
    this.sortByFilter = page.getByRole("combobox", { name: "Sort By" });
    this.NCID = page.getByRole("option", { name: "NCID" });
    this.appliedOnList = page.locator("td:nth-child(5)");
    this.appliedOnFilter = page.getByPlaceholder("Applied On");
    this.hrStatusOption = page.getByRole("option", { name: "Approved" });
    this.calendarHeader = page.locator(
      "button[class='rs-calendar-header-title rs-calendar-header-title-date rs-btn rs-btn-subtle rs-btn-xs']"
    );
    this.dateRangeList = page.locator("td:nth-child(6)");
    this.okButton = page.getByRole("button", { name: "OK" });
    this.dateRangeFilter = page.getByPlaceholder("Select date Range");
    this.dateRangeCalendarHeader = page.locator(
      "div[data-testid='calendar-start'] button[aria-label='Select month']"
    );
  }
  async launchEmployeeServiceRequestPage() {}
  async approveUsingLM() {
    await this.employeeServicePage.click();
    await this.page.getByText("#" + this.SRID).click();
    await this.approveButton.click();
  }
  async approveUsingHR() {
    await this.employeeServicePage.click();
    await this.page.getByText("#" + this.SRID).click();
    await this.approveButton.click();
  }
  async rejectUsingLM() {
    await this.employeeServicePage.click();
    await this.page.getByText("#" + this.SRID).click();
    await this.commentField.fill("Test Reject By LM");
    await this.rejectButton.click();
    await this.okButton.click();
  }
  async rejectUsingHR() {
    await this.employeeServicePage.click();
    await this.page.getByText("#" + this.SRID).click();
    await this.commentField.fill("Test Reject By HR");
    await this.rejectButton.click();
    await this.okButton.click();
  }
  async verifyFilters() {
    await this.employeeServicePage.click();
    await this.searchField.fill("jesw");
    await this.autoSuggestiveDropdown.click();
    // Grab all the cell texts
    await page.waitForSelector("td.css-obtukx .css-19k09g7", {
      state: "visible",
      timeout: 5000,
    });
    const values = await this.nameColumn.allTextContents();
    // Assert all values contain "Jeswin Johnson"
    const assertName = values.every((val) => val.includes("Jeswin Johnson"));
    await page.getByRole("button", { name: "Clear Filter" }).click();
    // Verify the leave filter
    await this.leaveTypeFilter.fill("Ann");
    await this.annualLeaveOption.click();
    await page.waitForSelector("td:nth-child(4)", {
      state: "visible",
      timeout: 5000,
    });
    const leaveTypeValues = await leaveTypeRows.allTextContents();
    const assertLeaveType = leaveTypeValues.every((val) =>
      val.trim().includes("Annual Leave")
    );
    await this.clearFilterButton.click();
    // Verify LM Status filter
    await this.lmStatusFilter.click();
    await this.lmStatusOption.click();
    await page.waitForSelector("td:nth-child(9)", {
      state: "visible",
      timeout: 10000,
    });
    const lmStatus = await page.locator("td:nth-child(9)").allTextContents();
    const assertlmStatus = lmStatus.every(
      (val) => val.trim().includes("Approved") || val.trim().includes("NA")
    );
    // Verify HR Status Filter
    await this.hrStatusFilter.click();
    await this.hrStatusOption.click();
    await page.waitForSelector("td:nth-child(10)", {
      state: "visible",
      timeout: 10000,
    });
    const hrStatus = await page.locator("td:nth-child(10)").allTextContents();
    const assertHrStatus = hrStatus.every((val) => val === "Approved");
    await this.clearFilterButton.click();
    await this.sortByFilter.click();
    await this.NCID.click();
    const idTexts = await page.locator("td:nth-child(3)").allTextContents();
    const ids = idTexts.map((val) => parseInt(val.trim(), 10));
    const sortedIDs = [...ids].sort((a, b) => a - b);
    await this.clearFilterButton.click();
    //Verify the Applied On Filter
    const appliedOnText = await appliedOnList.first().textContent();
    const [day, monthText, year] = appliedOnText.trim().split(" ");
    await this.appliedOnFilter.click();
    await this.calendarHeader.click();
    const pickedMonthYear = page.locator(
      `div[aria-label='${monthText + " " + year}']`
    );
    await pickedMonthYear.getByText(monthText).click();
    await page.getByTitle("01" + " " + monthText + " " + year).click();
    await page.getByTitle(appliedOnText).click();
    await this.okButton.click();
    await page.waitForSelector("td:nth-child(5)", {
      state: "visible",
      timeout: 10000,
    });
    const appliedOnInputValues = await this.appliedOnFilter.inputValue();
    const [trimmedStartDate, trimmedEndDate] = appliedOnInputValues.split(
      /-(?=\d{2}-[A-Za-z]{3}-\d{4}$)/
    );
    const startDate = new Date(trimmedStartDate.trim());
    const endDate = new Date(trimmedEndDate.trim());
    const appliedOnFilteredText = await appliedOnList.allInnerTexts();
    const allInRange = appliedOnFilteredText.every((dateStr) => {
      const date = new Date(dateStr.trim()); // Convert string from table to Date
      return date >= startDate && date <= endDate; // Check if it's within your filter range
    });
    await this.clearFilterButton.click();
    //Verify Date range filter
    const firstdateRangeText = await dateRangeList.first().textContent();
    const [start, end] = firstdateRangeText.split("-");
    const requiredStart = start.replace(/\s*\(.*?\)/, "").trim();
    const requiredEnd = end.replace(/\s*\(.*?\)/, "").trim();
    const [dateRangeDay, dateRangeMonth, dateRangeYear] = requiredEnd
      .trim()
      .split(" ");
    await this.dateRangeFilter.click();
    await this.dateRangeCalendarHeader.click();
    const pickedMonthYear1 = page.locator(
      `div[aria-label='${
        dateRangeMonth.replace(",", "") + " " + dateRangeYear
      }']`
    );
    await pickedMonthYear1.getByText(dateRangeMonth.replace(",", "")).click();
    await page
      .getByTitle(
        "01" + " " + dateRangeMonth.replace(",", "") + " " + dateRangeYear
      )
      .click();
    let [outDate, remDate] = requiredEnd.split(" ");
    outDate = outDate.padStart(2, "0");
    let endDate1 = requiredEnd.replace(",", "");
    endDate1 = outDate + " " + remDate.replace(",", " ") + dateRangeYear; // e.g. "05 Jan 2027"
    await page.getByTitle(endDate1).click();
    await this.okButton.click();
    await page.waitForSelector("td:nth-child(6)", {
      state: "visible",
      timeout: 10000,
    });
    await this.dateRangeList.allTextContents();
    const selectedDateRange = this.dateRangeFilter.inputValue();
    const [trimmedStartDate1, trimmedEndDate1] = selectedDateRange.split(
      /-(?=\d{2}-[A-Za-z]{3}-\d{4}$)/
    );
    const filterStart = new Date(trimmedStartDate1);
    const filterEnd = new Date(trimmedEndDate1);
    const texts = await this.dateRangeList.allTextContents();
    const allValid = texts.every((rangeText) => {
      const [start1, end1] = rangeText.split("-");
      const recordStart = new Date(start1.replace(/\s*\(.*?\)/, "").trim());
      const recordEnd = new Date(end1.replace(/\s*\(.*?\)/, "").trim());

      // check overlap
      return recordStart <= filterEnd && recordEnd >= filterStart;
    });
    await page.pause();
    return {
      assertName,
      assertLeaveType,
      assertlmStatus,
      assertHrStatus,
      ids,
      sortedIDs,
      appliedOnFilteredText,
      allInRange,
      allValid,
    };
  }
}
module.exports = { Leaves };
