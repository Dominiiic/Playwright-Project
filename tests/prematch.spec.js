import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { PrematchPage } from '../page-objects/prematchPage';

test.describe('Prematch betting', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(50000);
    await page.goto('/');

    const navigateTo = new NavigationPage(page);
    await navigateTo.prematchPage();
    await expect(page).toHaveURL(/.*prematch/); 
  });

  test('Verify successful bet placing for sufficient fund', async ({ page }) => {
    const onPrematchPage = new PrematchPage(page);
    await onPrematchPage.placingBet();

    // Get initial user balance and input bet value
    const userBalance = await onPrematchPage.getUserBalance();
    const inputBetValue = await onPrematchPage.getInputBetValue();

    // Calculate expected balance after placing the bet
    const expectedBalance = userBalance - inputBetValue;

    // Click the bet button
    await onPrematchPage.clickBetButton();

    // Wait for some time to ensure balance update is reflected(better to use than waitForSelector because it can handle the balance update)
    await page.waitForTimeout(6000);

    // Get new user balance
    const newBalance = await onPrematchPage.getUserBalance();

    // assert the balances
    expect(newBalance).toEqual(expectedBalance);
  });

  /*test('Verify disabled bet placing for insufficient fund', async ({ page }) => {
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
  });*/

  test('Verify sports search show accurate suggestion lists', async ({ page }) => {
    const onPrematchPage = new PrematchPage(page);
    await onPrematchPage.searchSports("Boxing");
    const suggestions = onPrematchPage.getSuggestions();
    await expect(suggestions).toBeVisible();
  });
  
});
