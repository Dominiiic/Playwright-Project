import { Page } from '@playwright/test';

export class NavigationPage {
     /**
     * Constructor for NavigationPage
     * @param {Page} page - Playwright Page object
     */

    constructor(page) {
        this.page = page;
        this.baseURL = 'https://www.747-6.com';
    }

    async navigateTo(path) {
        await this.page.locator(`a[href="${this.baseURL}${path}"]`).click();
    }

    async livePage(){
        await this.navigateTo('/live');
    }

    async prematchPage(){
        await this.navigateTo('/prematch');
    }

    async casinoPage(){
        await this.navigateTo('/casino');
    }

    async liveCasinoPage() {
        await this.navigateTo('/live-casino');
    }

    async virtualSportPage(){
        await this.navigateTo('/virtual-sport');
    }

    async live747(){
        await this.navigateTo('/747');
    }

    async casinoTournaments(){
        const tournamentsLink = await this.page.locator('a.nav-item.left:has-text("Tournaments")').first();
        await tournamentsLink.hover();
        await this.page.getByRole('link', { name: 'Casino Tournaments' }).click();
    }

    async sportsTournaments(){
        const tournamentsLink = await this.page.locator('a.nav-item.left:has-text("Tournaments")').first();
        await tournamentsLink.hover();
        await this.page.getByRole('link', { name: 'Sports Tournaments' }).click();
    }
    
}