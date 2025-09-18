import { expect, test } from '@playwright/test';
import { basicSignIn } from './helpers/auth';

test.describe('Search Results Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('tests basic search functionality with form submission', async ({
    page,
  }) => {
    // Sign in using the helper
    await basicSignIn(page);

    // Test actual header search form submission
    // Wait for the search input to be visible
    await page.waitForSelector('[id="search"] input[name="search"]');

    // Fill the search form and submit
    await page.fill('[id="search"] input[name="search"]', 'Michael');
    await page.click('[id="search"] button[type="submit"]');

    // Verify navigation to results page
    await expect(page).toHaveURL(/\/results\?q=Michael/);

    // Verify search results
    await expect(page.locator('h1')).toContainText('Search: Michael');

    // Should find Michael Chen (case 1000002)
    await expect(page.locator('#result-card-1000002')).toBeVisible();
  });
});
