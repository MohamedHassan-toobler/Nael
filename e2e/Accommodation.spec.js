const { test, expect } = require("@playwright/test");
const { excelTest, newLocation } = require("./excelDemo");
test('Verify that clicking the button labeled "Accommodation" triggers the expected action (e.g., navigating to an accommodation page).', async ({
  page,
}) => {
  await page.goto("https://cloud.apps.nael.thingspine.com/");
  await page.locator("input[id=':Rclkn:']").fill("jeswin@example.com");
  await page.locator("[name='password']").fill("Jesw#12627");
  await page.locator("button[value='password']").click();
  await page.locator("a[href='#/accommodation-management']").click();
  //Verify that clicking the Create button triggers the expected action (e.g., form submission, navigation).(if the user chooses the accommodation type as 'Residential')
  const locationList = page.locator("table tr td:nth-child(2)");
  await page.locator("button[id='add-Create New Accommodation']").click();
  const accommodationTypeInput = page.locator(".css-11xyqqc input");
  await accommodationTypeInput.click();
  await accommodationTypeInput.fill("Residential");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(accommodationTypeInput).toHaveValue("Residential");
  const locationInput = page.locator(".css-esqx38 input");
  var randomNumber = Math.floor(Math.random() * 1000);
  const expectedLocation = `Location ${randomNumber}`;
  await locationInput.fill(expectedLocation);
  await expect(locationInput).toHaveValue(expectedLocation);
  const filledLocationText = await locationInput.inputValue();
  await page
    .locator(".css-kztb18")
    .nth(1)
    .fill("Villa" + randomNumber);
  await page.locator(".css-kztb18").last().fill(randomNumber.toString());
  await page.locator(".css-jfk6jk").click();
  await expect(locationList.first()).toContainText(filledLocationText);
  //Verify that clicking the Create button triggers the expected action (e.g., form submission, navigation).(if the user chooses the accommodation type as 'Camp')
  await page
    .locator("button[id='add-Create New Accommodation']")
    .waitFor("networkIdle");
  await page.locator("button[id='add-Create New Accommodation']").click();
  await accommodationTypeInput.click();
  await accommodationTypeInput.fill("Camp");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(accommodationTypeInput).toHaveValue("Camp");
  await locationInput.fill("Location" + " " + randomNumber);
  const filledCampLocationText = await locationInput.inputValue();
  await page.locator(".css-kztb18").nth(1).fill(randomNumber.toString());
  await page.locator(".css-kztb18").nth(2).fill(randomNumber.toString());
  await page.locator(".css-kztb18").nth(3).fill(randomNumber.toString());
  await page.locator(".css-kztb18").nth(4).fill(randomNumber.toString());
  await page.locator(".css-jfk6jk").click();
  await expect(locationList.first()).toContainText(filledCampLocationText);
  //Verify that Type filter filters the results in the list based on the user selection
  await page.waitForLoadState("networkidle");
  const accommodationTypeList = page.locator("table tr td:nth-child(1)");
  const accommodationFilters = page.locator(".css-7ahg87 input");
  await accommodationFilters.first().click();
  await accommodationFilters.first().fill("Camp");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(accommodationTypeList.first()).toBeVisible({ timeout: 5000 });
  const totalAccommodationTypeList = await accommodationTypeList.count();
  for (let i = 0; i < totalAccommodationTypeList; ++i) {
    const accommodationTypeText = (
      await accommodationTypeList.nth(i).textContent()
    )?.trim();
    expect(accommodationTypeText).toBe("Camp");
  }
  await page.locator(".css-15h3ez6 button").click();
  //Verify that Location filter filters the results in the list based on the user selection
  await accommodationFilters.last().click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  const selectedLocationFilter = await accommodationFilters.last().inputValue();
  await expect(locationList.first()).toBeVisible({ timeout: 5000 });
  const locationCount = await locationList.count();
  for (let i = 0; i < locationCount; ++i) {
    const LocationTypeText = (await locationList.nth(i).textContent())?.trim();
    expect(LocationTypeText).toBe(selectedLocationFilter);
  }
  await page.locator(".css-15h3ez6 button").click();
  //Verify that clicking the delete button triggers the expected delete functionality.
  let summaryText = await page.locator(".css-1chpzqh").last().textContent();
  let fullCount = summaryText?.match(/of\s+(\d+)/);
  const fullCountInt = fullCount ? parseInt(fullCount[1]) : 0;
  const optionMenu = page.locator(".css-1egpgfe");
  var optionRandomNumber = Math.floor(Math.random() * 20);
  await optionMenu.nth(optionRandomNumber).click();
  await page.locator(".css-5n5rd1").last().click();
  await page.locator(".css-monvv6").click();
  await expect(page.locator(".css-1chpzqh").last()).not.toHaveText(summaryText);
  summaryText = await page.locator(".css-1chpzqh").last().textContent();
  fullCount = summaryText?.match(/of\s+(\d+)/);
  const afterDeletionCount = fullCount ? parseInt(fullCount[1]) : 0;
  expect(fullCountInt).not.toBe(afterDeletionCount);
  //Verify that clicking the edit button triggers the expected edit functionality.
  await optionMenu.nth(optionRandomNumber).click();
  await page.locator(".css-5n5rd1").first().click();
  await expect(locationInput).toBeEditable();
  await locationInput.fill("Updated Location " + optionRandomNumber);
  const editedLocationName = await locationInput.inputValue();
  await page.locator(".css-jfk6jk").click();
  await expect(locationList.nth(optionRandomNumber)).toContainText(
    editedLocationName
  );
  //Verify that clicking the button triggers the expected action to import accommodations.
  await excelTest();
  await page.getByText("Import Accommodation").click();
  const input = page.locator('input[type="file"]#file-upload');
  await input.setInputFiles(
    "/home/toobler/Downloads/accommodation-import-sample-sheet (7).xlsx"
  );
  await page.locator(".css-tc704y").click();
  await expect(locationList.filter({ hasText: newLocation })).toBeVisible();
  await page.pause();
});
