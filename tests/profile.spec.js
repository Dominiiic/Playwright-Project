import { test, expect } from '@playwright/test';
import { MyBetsPage } from '../page-objects/myBetsPage';

test('', async({ page }) => {
    await page.goto('/');
    const onMyBetsPage = new MyBetsPage(page);
    await onMyBetsPage.navigateToMyBets();


    // Locate all rows in the tbody
    const rows = await page.locator('tbody tr');

    // Filter the rows to find those containing a td with the text "Single"
    const filteredRows = rows.filter({ has: page.locator('td', { hasText: 'Single' }) });
  
    // Iterate through the filtered rows and perform actions or log them
    const rowCount = await filteredRows.count();
    for (let i = 0; i < rowCount; i++) {
      const row = filteredRows.nth(i);
      const rowHtml = await row.innerHTML();
      console.log(`Row ${i + 1}:\n${rowHtml}`);
    }
  

})
