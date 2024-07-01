//  this is a base class that contains shared methods to other class
export class BasePage{
    constructor(page){
        this.page = page;
        this.cashoutButtonLocator = page.locator('.cash-out-btn').first();
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

    async clickBetButton() {
        await this.page.locator('.btn.place-bet-btn.btn1').click();
    }

    async cashoutOpenBet(){
        await this.cashoutButtonLocator.click();
        //await this.page.locator('.account-popup-body-container', { hasText: 'Cashout' });
        await this.page.locator('a.button-cash-out', { hasText: 'Cashout'}).click();
    }
}