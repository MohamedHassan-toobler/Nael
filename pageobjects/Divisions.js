class Divisions {
  constructor(page) {
    this.page = page;
    // Core Locators
    this.divisionPage = page.getByText("Divisions");
    this.divisionRow = page.locator(".MuiTableRow-root");
    this.parentDivList = this.divisionRow.locator(".css-16snj3q");
    this.managerList = page.locator("div.css-1m2azep > div > div");
    this.fullPagination = page.locator("p.MuiTablePagination-displayedRows");
    // Form Fields
    this.createDivisionButton = page.getByText("Create New Division");
    this.divisionInput = page.getByPlaceholder("Enter a division name");
    this.divdisplayInput = page.getByPlaceholder("Enter a display name");
    this.parentDivInput = page.getByPlaceholder("Select parent division");
    this.managerInput = page.getByPlaceholder("Select manager name");
    // Actions
    this.saveButton = page.getByText("Save");
    this.searchInput = page.getByLabel("Search");
    this.clearFilterButton = page.getByRole("button", { name: "Clear Filter" });
    this.optionsMenu = page.locator("#long-button");
    this.edit = page.getByText("Edit");
    this.delete = page.getByText("Delete");
    this.deleteConfirmButton = page.getByText("OK");
  }
  //Verify that clicking the button labeled "Divisions" triggers the expected action (e.g., navigating to the division page).
  async launchDivision() {
    await this.divisionPage.click();
  }
  async parentDivisonList() {
    const existingParentTexts = [];
    for (let i = 0; i < (await this.parentDivList.count()); i++) {
      if (i % 2 != 0) {
        const existingParentDiv = await this.parentDivList.nth(i).textContent();
        if (existingParentDiv && existingParentDiv.trim() != "-") {
          existingParentTexts.push(existingParentDiv);
        }
      }
    }
    let parentDivRandomValue = Math.floor(
      Math.random() * existingParentTexts.length
    );
    let randomParentDiv = existingParentTexts[parentDivRandomValue];
    return randomParentDiv;
  }
  async createDivision() {
    await this.page.waitForSelector(".MuiTableRow-root", { state: "visible" });
    await this.page.waitForSelector(".css-16snj3q", { state: "visible" });
    const randParentDiv = await this.parentDivisonList();
    await this.createDivisionButton.click();
    this.divRandomnum = Math.floor(Math.random() * 100);
    await this.divisionInput.fill("Test Division " + this.divRandomnum);
    await this.divdisplayInput.fill(
      "Test display Division " + this.divRandomnum
    );
    this.newDivisionInput = await this.divdisplayInput.inputValue();
    await this.parentDivInput.pressSequentially(randParentDiv);
    await this.parentDivInput.press("ArrowDown");
    await this.parentDivInput.press("Enter");
    await this.managerInput.pressSequentially("Baisil");
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.page.waitForSelector(".css-s6g0nq", { state: "visible" });
    await this.saveButton.click();
  }
  //Verify the Search is working
  async searchDivision() {
    await this.page.waitForSelector(
      `.MuiTableRow-root:has-text("${this.newDivisionInput}")`,
      { state: "visible", timeout: 10000 }
    );
    await this.page.waitForSelector("input[type$='text']", {
      state: "visible",
    });
    await this.searchInput.pressSequentially(this.newDivisionInput);
    await this.page.waitForSelector(
      `.MuiTableRow-root:has-text("${this.newDivisionInput}")`,
      { state: "visible", timeout: 10000 }
    );
    await this.page.waitForSelector(".css-16snj3q", { state: "visible" });
    const firstText = await this.parentDivList.first().textContent();
    return firstText;
  }
  //Verify that Clear Filter Button is working
  async clearFilter() {
    const searchedResultCount = await this.fullPagination.textContent();
    const splitResult = parseInt(searchedResultCount.match(/of\s+(\d+)/)[1]); // Gets the number after "of "
    await this.clearFilterButton.click();
    await this.page.waitForSelector(".css-16snj3q", { state: "visible" });
    const defaultTable = await this.fullPagination.textContent();
    const splitResult1 = parseInt(defaultTable.match(/of\s+(\d+)/)[1]); // Gets the number after "of "
    return { before: splitResult, after: splitResult1 };
  }
  //Verify that edit is working
  async editDivision() {
    await this.page.waitForSelector("input[type$='text']", {
      state: "visible",
    });
    await this.searchInput.pressSequentially(this.newDivisionInput);
    await this.page.waitForSelector(
      `.MuiTableRow-root:has-text("${this.newDivisionInput}")`,
      { state: "visible", timeout: 10000 }
    );
    await this.page.waitForSelector(".css-16snj3q", { state: "visible" });
    const returnSearchresult = await this.parentDivList.first().textContent();
    await this.optionsMenu.first().click();
    await this.edit.click();
    await this.divdisplayInput.clear();
    await this.divdisplayInput.fill(
      "Test edited display Division " + this.divRandomnum
    );
    this.editeddivision = await this.divdisplayInput.inputValue();
    await this.managerInput.clear();
    await this.managerInput.pressSequentially("Jacob");
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.page.waitForSelector(".css-s6g0nq", { state: "visible" });
    await this.saveButton.click();
    await this.clearFilterButton.click();
    await this.page.waitForSelector(
      `.MuiTableRow-root:has-text("${this.editeddivision}")`,
      { state: "visible", timeout: 10000 }
    );
    await this.page.waitForSelector("input[type$='text']", {
      state: "visible",
    });
    await this.searchInput.pressSequentially(this.editeddivision);
    await this.page.waitForSelector(
      `.MuiTableRow-root:has-text("${this.editeddivision}")`,
      { state: "visible", timeout: 10000 }
    );
    const editedSearchResult = await this.parentDivList.first().textContent();
    await this.page.waitForSelector(
      `.MuiTableRow-root:has-text("${this.editeddivision}")`,
      { state: "visible", timeout: 10000 }
    );
    const updatedManagerData = await this.managerList.last().textContent();
    return { returnSearchresult, editedSearchResult, updatedManagerData };
  }
  //Verify that Delete is working
  async deleteDivisions() {
    await this.optionsMenu.first().click();
    await this.delete.click();
    await this.deleteConfirmButton.click();
    await this.clearFilterButton.click();
    await this.page.waitForSelector(".css-16snj3q", { state: "visible" });
    this.deletedResult = await this.fullPagination.textContent();
    const deletedResultCount = parseInt(
      this.deletedResult.match(/of\s+(\d+)/)[1]
    );
    return deletedResultCount;
  }
}
module.exports = { Divisions };
