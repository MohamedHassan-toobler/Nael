const {test, expect} = require('@playwright/test');

test.only('Launching the website', async ({page})=>{
//    const context = await browser.newContext();
//    const page = await context.newPage();
   await page.goto('https://cloud.apps.nael.thingspine.com/');
   await page.locator("input[id=':Rclkn:']").fill('jeswin@naelconstruct.com');
   await page.locator("[name='password']").fill('Jesw#12627');
   await page.locator("button[value='password']").click;
});