import { expect, test } from '@playwright/test';

test.describe('Sign In Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('navigates to home and signs in', async ({ page }) => {
    // Mock sign-in API
    await page.route('**/api/auth/signin', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          first_name: 'John',
          last_name: 'Doe',
        }),
      });
    });

    // Navigate to Homepage
    await page.goto('./');

    // Verify Homepage
    await expect(page.locator('h1')).toContainText('Welcome Guest');

    // Navigate to Sign-in page
    await page.locator('#auth-link').click();

    // Login
    await page.locator('input[name="username"]').fill('test');
    await page.locator('input[name="password"]').fill('12345678');
    await page.locator('#submit').click();

    // Verify Homepage after signin
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('#sign-in-alert')).toBeHidden();
  });
});
