export class MyBetsPage{
    constructor(page){
        this.page = page;
    }

    async navigateToMyBets(){
        await this.page.goto('/');
        await this.page.locator('.profile-overlay').hover();
        await this.page.getByRole('link', { name: ' My Bets' }).click();
    }
    async filterBetByBetType(){

        
    }

    async filterBetByResult(){
        
    }
}