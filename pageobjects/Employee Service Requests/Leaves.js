class Leaves {
  constructor(page, SRID) {
    this.page = page;
    this.employeeServicePage = page.getByText("Employee Service Request");
    this.SRID = page.getByText("#" + SRID);
    this.approveButton = page.getByRole("button", { name: "Approve" });
  }
  async launchEmployeeServiceRequestPage() {}
  async approveUsingLM() {
    await this.employeeServicePage.click();
    await this.SRID.click();
    await this.approveButton.click();
  }
}
module.exports = { Leaves };
