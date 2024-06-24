import { Page } from '@playwright/test';

export class LoginPage{

    constructor(page){
        this.page = page;
        this.usernameInput = page.locator('input[name="username"][id="ember52"].ember-text-field.ember-view');
        this.passwordInput = page.locator('input[name="password"].ember-text-field.ember-view');
    }

    async userLogin(username, password){
        await this.page.getByText('SIGN IN').click();
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.page.getByRole('button', { name: 'Login' }).click({ timeout: 10000 }); // Timeout in milliseconds
    }
}