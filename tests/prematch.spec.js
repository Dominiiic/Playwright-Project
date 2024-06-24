import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { PrematchPage } from '../page-objects/prematchPage';
import { TIMEOUT } from 'dns';

test.describe('Prematch betting', () => {
  test.beforeEach(async ({ page }) => {

  })
  test('Verify successful bet placing for sufficient fund', async ({ page }) => {
    test.setTimeout(50000);
    await page.goto('/');

    const navigateTo = new NavigationPage(page);
    await navigateTo.prematchPage();
    await expect(page).toHaveURL(/.*prematch/); 

    const onPrematchPage = new PrematchPage(page);
    await onPrematchPage.placingBet();

    // Get initial user balance and input bet value
    const userBalance = await onPrematchPage.getUserBalance();
    const inputBetValue = await onPrematchPage.getInputBetValue();

    // Calculate expected balance after placing the bet
    const expectedBalance = userBalance - inputBetValue;

    // Click the bet button
    await onPrematchPage.clickBetButton();

    // Wait for some time to ensure balance update is reflected
    await page.waitForTimeout(4000); // Adjust this as needed

    // Get new user balance
    const newBalance = await onPrematchPage.getUserBalance();

    // assert the balances
    expect(newBalance).toEqual(expectedBalance);
  });

  test('Verify disabled bet placing for insufficient fund', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/');
    
    const navigateTo = new NavigationPage(page);
    await navigateTo.prematchPage();
    await expect(page).toHaveURL(/.*prematch/); 

    const onPrematchPage = new PrematchPage(page);
    await onPrematchPage.placingBet();
    
    const userBalance = await onPrematchPage.getUserBalance();
    const inputBetValue = await onPrematchPage.getInputBetValue();
    const insufficientFundError = onPrematchPage.insufficientFundError;

    //  Checking for the remaining balance if not enough to sustain the bet amount
    if(inputBetValue > userBalance)   
      await expect(insufficientFundError).toBeVisible();
    // Check for the presence of the 'btn-disabled' class since it has no html disabled attribute
      const hasDisabledClass = await onPrematchPage.betButton.evaluate(button => button.classList.contains('btn-disabled'));  
      expect(hasDisabledClass).toBe(true);
  });

  test.only('Verifiy succesful cashout is accurately added to fund balance', async({ page }) => {
    test.setTimeout(60000);
    await page.goto('/');
    
    const navigateTo = new NavigationPage(page);
    const onPrematchPage = new PrematchPage(page);

    await navigateTo.prematchPage();
    await expect(page).toHaveURL(/.*prematch/); 
    await page.waitForTimeout(5000);

    //  Get first the user balance before the cashout to use the amount in assertions
    const userBalance = await onPrematchPage.getUserBalance();
    await onPrematchPage.cashoutOpenBet();

    const successMessage = page.locator('.account-popup-title span', { hasText: 'Success'});
    await expect(successMessage).toBeVisible([{timeout:7000}]);
    //  Wait the user balance to appear after cash out
    await page.waitForTimeout(8000);

    const userBalanceAfterCashout = await onPrematchPage.getUserBalance();
    const cashoutButtonAmount = await onPrematchPage.getCashoutButtonAmount();
    expect(userBalanceAfterCashout == (userBalance + cashoutButtonAmount)).toBe(true);

    console.log(userBalanceAfterCashout == (userBalance + cashoutButtonAmount));
    console.log(userBalanceAfterCashout)
    console.log(cashoutButtonAmount);   
  });

});
