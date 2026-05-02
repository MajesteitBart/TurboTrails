import { expect, test } from '@playwright/test';

async function expectScene(page: import('@playwright/test').Page, scene: string): Promise<void> {
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_STATE__?.scene)).toBe(scene);
}

async function expectLevel(page: import('@playwright/test').Page, levelId: string): Promise<void> {
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_STATE__?.levelId)).toBe(levelId);
}

async function clickOrTap(page: import('@playwright/test').Page, x: number, y: number): Promise<void> {
  const canvas = page.locator('canvas');
  const box = await canvas.boundingBox();
  if (!box) {
    throw new Error('Canvas is not available for coordinate click');
  }

  await page.mouse.click(box.x + (x / 1280) * box.width, box.y + (y / 720) * box.height);
}

test('navigates main menu to Forest 01 gameplay', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Turbo Trails 2.0');
  await expect(page.locator('canvas')).toBeVisible();
  await expectScene(page, 'MainMenuScene');

  await clickOrTap(page, 140, 325);
  await expectScene(page, 'WorldSelectScene');

  await clickOrTap(page, 180, 384);
  await expectScene(page, 'LevelSelectScene');
  await expect.poll(() => page.evaluate(() => window.__TURBO_TRAILS_STATE__?.worldId)).toBe('forest');

  await clickOrTap(page, 170, 360);
  await expectScene(page, 'GameScene');
  await expectLevel(page, 'forest-01-basics');
  await page.screenshot({ path: 'screenshots/current-first-playable.png', fullPage: true });
});

test('results flow saves progress and exposes retry/menu actions', async ({ page }) => {
  await page.goto('/?results=1');
  await expect(page).toHaveTitle('Turbo Trails 2.0');
  await expect(page.locator('canvas')).toBeVisible();
  await expectScene(page, 'ResultsScene');
  await expectLevel(page, 'forest-01-basics');
  await expect
    .poll(async () =>
      page.evaluate(() => localStorage.getItem('turbo-trails-2-save-v1')?.includes('forest-01-basics') ?? false),
    )
    .toBe(true);

  await clickOrTap(page, 130, 570);
  await expectScene(page, 'GameScene');
  await expectLevel(page, 'forest-01-basics');

  await page.goto('/?results=1');
  await expectScene(page, 'ResultsScene');
  await clickOrTap(page, 330, 570);
  await expectScene(page, 'LevelSelectScene');
  await expect
    .poll(() => page.evaluate(() => window.__TURBO_TRAILS_STATE__?.savedLevelIds?.includes('forest-01-basics')))
    .toBe(true);
});

test('opens garage placeholder from main menu', async ({ page }) => {
  await page.goto('/');
  await expectScene(page, 'MainMenuScene');
  await clickOrTap(page, 170, 410);
  await expectScene(page, 'GarageScene');
  await clickOrTap(page, 120, 570);
  await expectScene(page, 'MainMenuScene');
});

test('launches second forest level from level select', async ({ page }) => {
  await page.goto('/');
  await clickOrTap(page, 140, 325);
  await expectScene(page, 'WorldSelectScene');
  await clickOrTap(page, 180, 384);
  await expectScene(page, 'LevelSelectScene');
  await clickOrTap(page, 500, 360);
  await expectScene(page, 'GameScene');
  await expectLevel(page, 'forest-02-first-flip');
});
