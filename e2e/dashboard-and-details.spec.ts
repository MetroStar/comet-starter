import { expect, test } from '@playwright/test';

test.describe('Dashboard and Details Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('verifies access to dashboard after signing in', async ({ page }) => {
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

    // Sign In
    await page.click('#auth-link');
    await page.fill('input[name="username"]', 'test');
    await page.fill('input[name="password"]', '12345678');
    await page.click('#submit');

    // Navigate to Dashboard
    await page.click('#dashboard-link');
    await expect(page.locator('h1')).toContainText('Active Cases');

    // Click on table item and verify details
    const element = page.locator('[id*="case-link-"]').first();
    await expect(element).toBeVisible();
    await element.click();

    await expect(page.locator('h1')).toContainText('Case');
  });
});
