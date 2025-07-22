const {test, expect} = require('@playwright/test'); 
test.only('Verify that clicking the button labeled "Accommodation" triggers the expected action (e.g., navigating to an accommodation page).', async({page})=>{
    await page.goto('https://cloud.apps.nael.thingspine.com/');
    await page.locator("input[id=':Rclkn:']").fill('jeswin@example.com');
    await page.locator("[name='password']").fill('Jesw#12627');
    await page.locator("button[value='password']").click();
    await page.locator("a[href='#/accommodation-management']").click();
//Verify that clicking the Create button triggers the expected action (e.g., form submission, navigation).(if the user chooses the accommodation type as 'Residential')
   const locationList = page.locator('table tr td:nth-child(2)');
   await page.locator("button[id='add-Create New Accommodation']").click();
   const accommodationTypeInput = page.locator(".css-11xyqqc input");
   await accommodationTypeInput.click();
   await accommodationTypeInput.fill("Residential");
   await page.keyboard.press('ArrowDown');
   await page.keyboard.press('Enter');
   await expect(accommodationTypeInput).toHaveValue("Residential");
   const locationInput = page.locator(".css-esqx38 input");
   var randomNumber = Math.floor(Math.random() * 1000);
   const expectedLocation = `Location ${randomNumber}`;
   await locationInput.fill(expectedLocation);
   await expect(locationInput).toHaveValue(expectedLocation);
   const filledLocationText = await locationInput.inputValue();
   await page.locator('.css-kztb18').nth(1).fill("Villa"+randomNumber);
   await page.locator('.css-kztb18').last().fill(randomNumber.toString());
   await page.locator('.css-7kltc6').click();
   await expect(locationList.first()).toContainText(filledLocationText);
//Verify that clicking the Create button triggers the expected action (e.g., form submission, navigation).(if the user chooses the accommodation type as 'Camp')
   await page.locator("button[id='add-Create New Accommodation']").waitFor('networkIdle');
   await page.locator("button[id='add-Create New Accommodation']").click();
   await accommodationTypeInput.click();
   await accommodationTypeInput.fill("Camp");
   await page.keyboard.press('ArrowDown');
   await page.keyboard.press('Enter');
   await expect(accommodationTypeInput).toHaveValue("Camp");
   await locationInput.fill("Location"+ " "+randomNumber);
   const filledCampLocationText = await locationInput.inputValue();
   await page.locator('.css-kztb18').nth(1).fill(randomNumber.toString());
   await page.locator('.css-kztb18').nth(2).fill(randomNumber.toString());
   await page.locator('.css-kztb18').nth(3).fill(randomNumber.toString());
   await page.locator('.css-kztb18').nth(4).fill(randomNumber.toString());
   await page.locator('.css-7kltc6').click();
   await expect(locationList.first()).toContainText(filledCampLocationText);
   await page.pause();
 });
 