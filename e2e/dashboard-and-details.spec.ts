import { expect, test } from '@playwright/test';
import { basicSignIn } from './helpers';

test.describe('Dashboard and Details Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('verifies access to dashboard after signing in', async ({ page }) => {
    // Complete sign-in flow
    await basicSignIn(page);

    // Verify successful sign-in to dashboard
    await expect(page.locator('h1')).toContainText('Active Cases');

    // Click on table item and verify details
    const element = page.locator('[id*="case-link-"]').first();
    await expect(element).toBeVisible();
    await element.click();

    await expect(page.locator('h1')).toContainText('Case');
  });
});
