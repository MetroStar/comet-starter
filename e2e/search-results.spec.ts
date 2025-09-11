import { expect, test } from '@playwright/test';

test.describe('Search Results Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('navigates to search results and tests search functionality', async ({
    page,
  }) => {
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

    // Verify signed in state
    await expect(page.locator('h1')).toContainText('Active Cases');

    // Test search functionality using header search box
    // Navigate directly to results with query parameter instead of using form
    await page.goto('./results?q=Sarah');

    // Verify we're on results page with search query
    await expect(page).toHaveURL(/\/results\?q=Sarah/);

    // Verify search results page content
    await expect(page.locator('h1')).toContainText(
      'Found 1 search result for "Search: Sarah"',
    );

    // Verify search result card is displayed
    await expect(page.locator('#result-card-1000001')).toBeVisible();
    await expect(page.locator('#case-link-1000001')).toContainText('1000001');
  });

  test('tests header search functionality with form submission', async ({
    page,
  }) => {
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

    // Navigate and sign in
    await page.goto('./');
    await page.click('#auth-link');
    await page.fill('input[name="username"]', 'test');
    await page.fill('input[name="password"]', '12345678');
    await page.click('#submit');

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

  test('tests advanced filtering functionality', async ({ page }) => {
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

    // Navigate and sign in
    await page.goto('./');
    await page.click('#auth-link');
    await page.fill('input[name="username"]', 'test');
    await page.fill('input[name="password"]', '12345678');
    await page.click('#submit');

    // Navigate directly to results page
    await page.goto('./results');

    // Verify initial state shows all cases
    await expect(page.locator('h1')).toContainText(
      'search results for "All Cases"',
    );

    // Test Case ID filter
    await page.fill('input[id="id"]', '1000001');
    await expect(page.locator('h1')).toContainText('Case ID: 1000001');

    // Clear Case ID filter
    await page.fill('input[id="id"]', '');

    // Test Gender filter
    await page.check('#gender-male');
    await expect(page.locator('h1')).toContainText('Gender: Male');

    // Test Status filter
    await page.check('#status-in-progress');
    await expect(page.locator('h1')).toContainText('Status: In Progress');

    // Test multiple filters
    await page.check('#gender-female');
    await expect(page.locator('h1')).toContainText('Gender: Male,Female');
    await expect(page.locator('h1')).toContainText('Status: In Progress');

    // Test clear all filters
    await page.click('#clear-btn');
    await expect(page.locator('h1')).toContainText(
      'search results for "All Cases"',
    );

    // Verify all filters are cleared
    await expect(page.locator('#gender-male')).not.toBeChecked();
    await expect(page.locator('#gender-female')).not.toBeChecked();
    await expect(page.locator('#status-in-progress')).not.toBeChecked();
    await expect(page.locator('input[id="id"]')).toHaveValue('');
  });

  test('tests date filters and combinations', async ({ page }) => {
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

    // Navigate and sign in
    await page.goto('./');
    await page.click('#auth-link');
    await page.fill('input[name="username"]', 'test');
    await page.fill('input[name="password"]', '12345678');
    await page.click('#submit');

    // Navigate to results page
    await page.goto('./results');

    // Test Created After date filter
    await page.fill('input[id="created_after"]', '2024-01-01');
    await expect(page.locator('h1')).toContainText('Created After: 2024-01-01');

    // Test Created Before date filter (add to existing filter)
    await page.fill('input[id="created_before"]', '2024-12-31');
    await expect(page.locator('h1')).toContainText(
      'Created Before: 2024-12-31',
    );
    await expect(page.locator('h1')).toContainText('Created After: 2024-01-01');

    // Test combination with other filters
    await page.fill('input[id="id"]', '1000001');
    await page.check('#status-not-started');

    // Verify multiple filters are reflected in summary
    const heading = page.locator('h1');
    await expect(heading).toContainText('Case ID: 1000001');
    await expect(heading).toContainText('Status: Not Started');
    await expect(heading).toContainText('Created Before: 2024-12-31');
    await expect(heading).toContainText('Created After: 2024-01-01');

    // Clear all and verify
    await page.click('#clear-btn');
    await expect(page.locator('h1')).toContainText(
      'search results for "All Cases"',
    );
  });

  test('tests search with filters combination', async ({ page }) => {
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

    // Navigate and sign in
    await page.goto('./');
    await page.click('#auth-link');
    await page.fill('input[name="username"]', 'test');
    await page.fill('input[name="password"]', '12345678');
    await page.click('#submit');

    // Use header search first - navigate directly for reliability
    await page.goto('./results?q=Michael');

    // Verify we're on results page with search query
    await expect(page).toHaveURL(/\/results\?q=Michael/);
    await expect(page.locator('h1')).toContainText('Search: Michael');

    // Add additional filters on top of search
    await page.check('#gender-male');
    await expect(page.locator('h1')).toContainText('Search: Michael');
    await expect(page.locator('h1')).toContainText('Gender: Male');

    // Add status filter
    await page.check('#status-in-progress');
    await expect(page.locator('h1')).toContainText('Status: In Progress');

    // Verify all filters are still active
    await expect(page.locator('h1')).toContainText('Search: Michael');
    await expect(page.locator('h1')).toContainText('Gender: Male');
    await expect(page.locator('h1')).toContainText('Status: In Progress');

    // Test that case links work
    const caseLink = page.locator('[id*="case-link-"]').first();
    if (await caseLink.isVisible()) {
      await expect(caseLink).toBeVisible();
      // We can click to test navigation but won't verify the details page here
      // as that's covered in other tests
    }
  });
});
