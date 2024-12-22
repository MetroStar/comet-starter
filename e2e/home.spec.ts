import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('navigates to home', async ({ page }) => {
    // Navigate to Homepage
    await page.goto('./');

    // Verify Homepage
    await expect(page.locator('h1')).toContainText('Welcome Guest');
    await expect(page.locator('#sign-in-alert')).toBeVisible();
  });
});
