import { expect, test } from '@playwright/test';

test('loads the game shell', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Turbo Trails 2.0');
  await expect(page.locator('canvas')).toBeVisible();
  await page.mouse.click(210, 325);
  await page.waitForTimeout(250);
  await expect(page.locator('canvas')).toBeVisible();
  await page.screenshot({ path: 'screenshots/current-first-playable.png', fullPage: true });
});
