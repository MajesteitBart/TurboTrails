import { expect, test } from '@playwright/test';

test.use({ video: 'on' });

test('index starts the playable 3D warehouse level', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('TurboTrails 3D');
  await expect(page.locator('canvas#game-canvas')).toBeVisible();
  await expect(page.locator('.hud')).toBeVisible();
  await expect(page.locator('.touch-controls button')).toHaveCount(5);
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.ready)).toBe(true);
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.scene)).toBe('WarehouseLevel');
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.meshCount ?? 0)).toBeGreaterThan(40);
});

test('bike drives and jumps on the main 3D route', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.ready)).toBe(true);
  const startX = await page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.bikeX ?? -999);

  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(900);
  await page.keyboard.down('Space');
  await page.waitForTimeout(90);
  await page.keyboard.up('Space');
  await page.waitForTimeout(600);
  await page.keyboard.up('ArrowRight');

  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.bikeX ?? -999)).toBeGreaterThan(startX + 0.5);
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_3D_STATE__?.progress ?? 0)).toBeGreaterThan(0.02);
  await page.screenshot({ path: 'screenshots/warehouse-3d-vertical-slice.png', fullPage: true });
});
