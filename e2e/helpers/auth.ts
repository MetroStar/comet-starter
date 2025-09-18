import { Page, expect } from '@playwright/test';

/**
 * Mock sign-in API response
 */
export const mockSignInApi = async (page: Page) => {
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
};

/**
 * Basic sign-in flow including API mocking and form submission
 */
export const basicSignIn = async (
  page: Page,
  username = 'test',
  password = '12345678',
) => {
  // Mock the sign-in API
  await mockSignInApi(page);

  // Navigate to Homepage
  await page.goto('./');

  // Verify Homepage before sign-in
  await expect(page.locator('h1')).toContainText('Welcome Guest');

  // Navigate to Sign-in page
  await page.locator('#auth-link').click();

  // Fill in credentials and submit
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('#submit').click();

  // Wait for sign-in to complete - we'll wait for the URL to change or sign-in alert to be hidden
  await expect(page.locator('#sign-in-alert')).toBeHidden();
};

/**
 * Keycloak SSO sign-in flow
 * */
export const keycloakSignIn = async (
  page: Page,
  username: string,
  password: string,
) => {
  // Navigate to Homepage
  await page.goto('./');

  // Verify Homepage before sign-in
  await expect(page.locator('h1')).toContainText('Welcome Guest');

  // Navigate to Sign-in page
  await page.locator('#auth-link').click();

  // Click SSO sign-in button
  await page.locator('#sso-sign-in').click();

  // Wait for redirect to Keycloak
  await expect(page.locator('#kc-login')).toBeVisible();

  // Fill in credentials and submit
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('#sso-sign-in').click();

  // Wait for sign-in to complete - we'll wait for the URL to change or sign-in alert to be hidden
  await expect(page.locator('#sign-in-alert')).toBeHidden();
};
