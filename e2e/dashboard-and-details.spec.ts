import { test, expect } from '@playwright/test';

test.describe('Dashboard and Details Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('verifies access to dashboard after signing in', async ({ page }) => {
    // Navigate to Homepage
    await page.goto('/');

    // Verify Homepage
    await expect(page.locator('h1')).toContainText('Welcome Guest');

    // Sign In
    await page.click('#auth-link');
    await page.fill('input[name="username"]', 'test');
    await page.fill('input[name="password"]', '12345678');
    await page.click('#submit');

    // Mock launch data
    await page.route('**/api/*', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          results: [
            {
              id: 1,
              name: 'Test Launch',
              description: 'Test Description',
              affiliation: 'Test Affiliation',
              dimensions: 'Test Dimensions',
              appearances: 'Test Appearances',
            },
          ],
        }),
      })
    );

    // Navigate to Dashboard
    await page.click('#dashboard-link');
    await expect(page.locator('h1')).toContainText('Dashboard');

    // Click on table item and verify details
    await page.click('[id*="details-link-"]:first');
    await expect(page.locator('h1')).toContainText('Details');
  });
});
