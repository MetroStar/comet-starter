import { expect, test } from '@playwright/test';
import { basicSignIn } from './helpers';

test.describe('Sign In Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('navigates to home and signs in', async ({ page }) => {
    // Complete sign-in flow
    await basicSignIn(page);

    // Verify successful sign-in to dashboard
    await expect(page.locator('h1')).toContainText('Active Cases');
  });
});
