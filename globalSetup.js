import { chromium, expect } from "@playwright/test";
import fs from 'fs';
import path from 'path';
import { LoginPage } from './page-objects/loginPage';
import 'dotenv/config';


async function globalSetup() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.747-6.com/');
    const loginTo = new LoginPage(page)
    await loginTo.userLogin(process.env.USER_NAME, process.env.PASSWORD);
    const loggedInProfile = page.locator('.loggedInStateButtons a[href="#/account/my-profile"].profile-image')
    await expect(loggedInProfile).toBeVisible();


    const filePath = "./LoginAuth.json";
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    await page.context().storageState({ path: filePath });
    await browser.close();
}

module.exports = globalSetup;
