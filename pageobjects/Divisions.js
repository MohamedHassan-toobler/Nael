class Divisions {
  constructor(page) {
    this.divisionPage = page.getByText("Divisions");
  }
  async launchDivision() {
    await this.divisionPage.click();
  }
}
module.exports = { Divisions };
