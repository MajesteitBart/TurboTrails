import { expect, test } from '@playwright/test';

test('loads the game shell', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Turbo Trails 2.0');
  await expect(page.locator('canvas')).toBeVisible();
  await page.mouse.click(140, 325);
  await page.waitForTimeout(150);
  await page.mouse.click(180, 384);
  await page.waitForTimeout(150);
  await page.mouse.click(170, 360);
  await page.waitForTimeout(250);
  await expect(page.locator('canvas')).toBeVisible();
  await page.screenshot({ path: 'screenshots/current-first-playable.png', fullPage: true });
});

test('shows results flow actions', async ({ page }) => {
  await page.goto('/?results=1');
  await expect(page).toHaveTitle('Turbo Trails 2.0');
  await expect(page.locator('canvas')).toBeVisible();
  await expect
    .poll(async () =>
      page.evaluate(() => localStorage.getItem('turbo-trails-2-save-v1')?.includes('forest-01-basics') ?? false),
    )
    .toBe(true);
  await page.mouse.click(130, 570);
  await page.waitForTimeout(150);
  await expect(page.locator('canvas')).toBeVisible();
  await page.goto('/?results=1');
  await page.mouse.click(330, 570);
  await page.waitForTimeout(150);
  await expect(page.locator('canvas')).toBeVisible();
});

test('opens garage placeholder from main menu', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('canvas')).toBeVisible();
  await page.mouse.click(170, 410);
  await page.waitForTimeout(150);
  await expect(page.locator('canvas')).toBeVisible();
  await page.mouse.click(120, 570);
  await page.waitForTimeout(150);
  await expect(page.locator('canvas')).toBeVisible();
});
