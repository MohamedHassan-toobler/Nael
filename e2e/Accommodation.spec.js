const {test, expect} = require('@playwright/test'); 
test('Verify that clicking the button labeled "Accommodation" triggers the expected action (e.g., navigating to an accommodation page).', async({page})=>{
    await page.goto('https://cloud.apps.nael.thingspine.com/');
    await page.locator("input[id=':Rclkn:']").fill('jeswin@example.com');
    await page.locator("[name='password']").fill('Jesw#12627');
    await page.locator("button[value='password']").click();
    await page.locator("a[href='#/accommodation-management']").click();
 });
 test.only('Verify that clicking the Create New Accommodation button triggers the create popup',async({page})=>{
    await page.goto('https://cloud.apps.nael.thingspine.com/');
    await page.locator("input[id=':Rclkn:']").fill('jeswin@example.com');
    await page.locator("[name='password']").fill('Jesw#12627');
    await page.locator("button[value='password']").click();
    await page.locator("a[href='#/accommodation-management']").click();
    await page.locator("button[id='add-Create New Accommodation']").click();
 });