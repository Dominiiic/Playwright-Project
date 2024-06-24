import { Page } from '@playwright/test';
import { TIMEOUT } from 'dns';

export class PrematchPage{
    constructor(page){
        this.page = page;
        this.userBalanceLocator = page.locator('.money .userBalance');
        this.insufficientFundError = page.getByText('Insufficient funds. Please go');  
        this.betButton = page.locator('.btn.place-bet-btn.btn1');
        this.cashoutButtonLocator = page.locator('.cash-out-btn').first();
    }

    async getUserBalance() {
        const userBalanceText = await this.userBalanceLocator.textContent();
        return parseFloat(userBalanceText.replace(/[^0-9.-]+/g, ""));
    }

    async getInputBetValue() {
        const inputBetValueText = await this.page.getByPlaceholder('Stake').inputValue();
        return parseFloat(inputBetValueText);
    }

    async getCashoutButtonAmount(){
        const cashoutButtonText = await this.cashoutButtonLocator.textContent();
        return parseFloat(cashoutButtonText.replace(/[^0-9.-]+/g, ""));
    }

    async clickBetButton() {
        await this.page.locator('.btn.place-bet-btn.btn1').click();
    }
        
    async placingBet(){
        const boxingElement = this.page.locator('li.boxing .sport-header');
        await boxingElement.waitFor({ state: 'visible', timeout: 10000 });
        await boxingElement.click();
        await this.page.locator('li.boxing .sb-accordion-content .sbModernFilter__title').click();
        await this.page.getByRole('link', { name: ' Professional Boxing' }).click();
        await this.page.getByText('Shakur Stevenson Artem').click();
        await this.page.getByText('Yes 1.74').click({ timeout: 10000 });
        await this.page.getByPlaceholder('Stake').type('10', { delay: 500 });

    }

    async cashoutOpenBet(){
        await this.page.getByText('Open Bets').click();
        await this.cashoutButtonLocator.click();
        //await this.page.locator('.account-popup-body-container', { hasText: 'Cashout' });
        await this.page.locator('a.button-cash-out', { hasText: 'Cashout'}).click();
    }
}
