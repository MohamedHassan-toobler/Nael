// @ts-check
import { chromium, defineConfig, devices } from "@playwright/test";
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    headless: false,
    trace: "on",
    screenshot: "on",
    video: "retain-on-failure",
  },
});
