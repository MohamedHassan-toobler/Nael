class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("input[id=':Rclkn:']");
    this.passwordInput = page.locator("[name='password']");
    this.loginButton = page.locator("button[value='password']");
  }
  async launchingPage(url) {
    await this.page.goto(url);
  }
  async login(username, password) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
module.exports = { LoginPage };
