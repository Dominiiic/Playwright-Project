import {expect, test} from '@playwright/test'

test('Invalid login', async ({ page }) => {
    await page.goto('/')
    const tournamentsLink = await page.locator('a.nav-item.left:has-text("Tournaments")').first();
    await tournamentsLink.hover();
})