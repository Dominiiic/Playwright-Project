// navigationPage.spec.js
import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage.js';

test.describe.configure({ mode: 'parallel' });

test.describe('Navigation Page Tests', () => {
  let navigateTo;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    navigateTo = new NavigationPage(page);
  });

  test('should navigate to Live page', async ({ page }) => {
    await navigateTo.livePage();
    await expect(page).toHaveURL(/.*live/); 
  });

  test('should navigate to Prematch page', async ({ page }) => {
    await navigateTo.prematchPage();
    await expect(page).toHaveURL(/.*prematch/); 
  });

  test('should navigate to Casino page', async ({ page }) => {
    await navigateTo.casinoPage();
    await expect(page).toHaveURL(/.*casino/); 
  });

  test('should navigate to Live Casino page', async ({ page }) => {
    await navigateTo.liveCasinoPage();
    await expect(page).toHaveURL(/.*live-casino/); 
  });

  test('should navigate to Virtual sports page', async ({ page }) => {
    await navigateTo.virtualSportPage();
    await expect(page).toHaveURL(/.*virtual-sport/); 
  });

  test('should navigate to 747 page', async ({ page }) => {
    await navigateTo.live747();
    await expect(page).toHaveURL(/.*747/); 
  });

  test('should navigate to Casino Tournaments page', async ({ page }) => {
    await navigateTo.casinoTournaments();
    await expect(page).toHaveURL(/.*casino-tournaments/); 
  });

  test('should navigate to Sports Tournaments page', async ({ page }) => {
    await navigateTo.sportsTournaments();
    await expect(page).toHaveURL(/.*sports-tournaments/); 
  });
});
