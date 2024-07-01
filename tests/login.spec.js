import {expect, test} from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage';
import 'dotenv/config';

//tests within the test file is configured and running in parallel
test.describe.configure({ mode: 'parallel' }); 

test.describe('Login', () => {
  let loginTo;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginTo = new LoginPage(page)
  });

  const userInvalidCredentials = [
    { username: process.env.USER_NAME, password: 'invalidPassword' },
    { username: 'invalidUsername', password: process.env.PASSWORD },
  ];

  // Function to create two tests with invalid password for the first test and invalid username for the second one
  const createInvalidLoginTest = (user) => {
    test(`Invalid login for user ${user.username}`, async ({ page }) => {
      await loginTo.userLogin(user.username, user.password);
      await expect(loginTo.usernameInput).toHaveValue(user.username);
      await page.waitForSelector('div[data-test-notification-message=error]', { state: 'visible' });
      await expect(page.getByText('Wrong Login/Password')).toBeVisible();
    });
  };
  
  // Dynamically generate tests
  userInvalidCredentials.forEach((user) => {
    createInvalidLoginTest(user);
  });

  test('Valid login', async ({ page }) => {
    await loginTo.userLogin(process.env.USER_NAME, process.env.PASSWORD);
    const loggedInProfile = page.locator('.loggedInStateButtons a[href="#/account/my-profile"].profile-image')
    await expect(loggedInProfile).toBeVisible();
  });
  
});





