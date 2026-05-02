import { expect, test } from '@playwright/test';

test('renders the 3D visual prototype', async ({ page }) => {
  await page.goto('/3d.html');
  await expect(page).toHaveTitle('Turbo Trails 3D Prototype');
  await expect(page.locator('canvas')).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.ready)).toBe(true);
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.camera)).toBe('orthographic-side');
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.meshCount ?? 0)).toBeGreaterThan(35);
  const startX = await page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.bikeX ?? -999);
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(1200);
  await page.keyboard.up('ArrowRight');
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.bikeX ?? -999)).toBeGreaterThan(startX + 0.05);
  await page.screenshot({ path: 'screenshots/3d-visual-prototype.png', fullPage: true });
});
