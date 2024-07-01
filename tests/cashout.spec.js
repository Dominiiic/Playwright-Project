import { test as base, expect} from '@playwright/test'
import { NavigationPage  } from '../page-objects/navigationPage';
import { CashoutPage } from '../page-objects/cashoutPage';

const test = base.test.extend({
    cashoutPage: async ({ page }, use) => {
        const cashoutPage = new CashoutPage(page);
        await cashoutPage.placingBet();
        await cashoutPage.clickBetButton();
        await page.waitForTimeout(4000);
        await page.getByText('Open Bets').click();
        await use(cashoutPage);
    },
});
test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/');
    const navigateTo = new NavigationPage(page);
    await navigateTo.prematchPage();
});


test('Verifiy succesful cashout', async ({ cashoutPage }) => {
    await cashoutPage.cashoutOpenBet();
    const successMessage = cashoutPage.page.locator('.account-popup-title span', { hasText: 'Success'});
    await expect(successMessage).toBeVisible([{timeout:7000}]);
});

