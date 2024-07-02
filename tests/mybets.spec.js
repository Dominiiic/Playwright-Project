import { test, expect } from '@playwright/test';
import { MyBetsPage } from '../page-objects/myBetsPage';

test('Bet type filtering', async({ page }) => {
  test.setTimeout(60000)
    await page.goto('/');
    const onMyBetsPage = new MyBetsPage(page);
    await onMyBetsPage.navigateToMyBets();

   for(var i = 0; i <= 0; i++ ){
    const betType = page.locator('.sbAccount__selected-option').first();
    
      await page.getByRole('combobox').first().selectOption(i.toString());
      const text = await betType.textContent();
      console.log(text)
      await page.waitForTimeout(3000)
      const rows = page.locator('tbody.lt-body tr');
    
      // Get the number of rows
      const rowCount = await rows.count();
      console.log(rowCount)
      if(rowCount >= 1){
        
        for (let i = 0; i < rowCount; i++) {
          const row = rows.nth(i);
          //const multipleTd = row.locator(`td:has(div:has-text("${text}"))`);
          const multipleTd = row.locator(`td:has(div:has-text("Single"))`);
          const isVisible = await multipleTd.isVisible();
          expect(isVisible).toBeTruthy(); // Assert that the <td> is visible
        }
      }
  }
             
});



