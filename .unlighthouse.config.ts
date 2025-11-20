/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="unlighthouse" />
import dotenv from 'dotenv';
import { Page } from 'puppeteer-core';
import { defineUnlighthouseConfig } from 'unlighthouse/config';

// Include dotenv to load environment variables from .env.local
dotenv.config({ path: '.env' });

// Store authentication state in cookie to support puppeteer
let authCookies: any[] = [];
let authLocalStorage: Record<string, string> = {};

export default defineUnlighthouseConfig({
  root: './src',
  ci: {
    budget: {
      accessibility: 90,
      'best-practices': 90,
      performance: 50,
      seo: 50,
    },
  },
  debug: false,
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
  puppeteerOptions: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 90000,
    userDataDir: './.puppeteer_data',
  },
  lighthouseOptions: {
    disableStorageReset: true,
    skipAboutBlank: true,
  },
  scanner: {
    device: 'desktop',
    skipJavascript: false,
    robotsTxt: false,
    sitemap: false,
    throttle: true,
    samples: 3,
    // include: [
    //   '/',
    //   '/about',
    //   '/contact-us',
    //   '/signin',
    //   '/dashboard',
    //   '/cases/1000002',
    // ],
  },
  hooks: {
    async authenticate(page: Page) {
      const authEnabled = (process.env.LIGHTHOUSE_AUTH_ENABLED || '0') === '1';
      console.log('Authentication enabled:', authEnabled);

      if (authEnabled) {
        const baseUrl = process.env.VITE_BASE_URL || 'http://localhost:8080';
        const username = process.env.USER_USERNAME || '';
        const password = process.env.USER_PASSWORD || '';
        if (!username || !password) {
          console.warn(
            'USER_USERNAME or USER_PASSWORD environment variables are not set. Skipping authentication.',
          );
          return;
        }

        console.log('Navigating to sign-in page...');

        await page.goto(baseUrl + '/signin');
        await page.locator('#sign-in-sso').click();
        await page.waitForSelector('#kc-login');

        const usernameInput = await page.$('input[name="username"]');
        await usernameInput?.type(username);
        const passwordInput = await page.$('input[name="password"]');
        await passwordInput?.type(password);

        console.log('Submitting login form...');
        await Promise.all([
          page.$eval('#kc-form-login', (form: any) => form.submit()),
          page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);

        console.log('Login successful.');

        await page.goto(baseUrl + '/dashboard', { waitUntil: 'networkidle0' });
        await page.waitForSelector('a[id*="case-link-"]', { timeout: 10000 });

        console.log('Capturing authentication state...');
        authCookies = await page.cookies();
        authLocalStorage = await page.evaluate(() => {
          const items: Record<string, string> = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
              items[key] = localStorage.getItem(key) || '';
            }
          }
          return items;
        });

        console.log('Auth cookies captured:', authCookies.length);
        console.log(
          'Auth localStorage captured:',
          Object.keys(authLocalStorage),
        );
      }
    },

    'puppeteer:before-goto': async (page: Page) => {
      // Restore authentication state before each page visit
      if (authCookies.length > 0) {
        // console.log('Restoring auth cookies...');
        await page.setCookie(...authCookies);
      }

      // Restore localStorage auth tokens if we have them
      if (Object.keys(authLocalStorage).length > 0) {
        // console.log('Restoring auth localStorage...');
        await page
          .evaluate((storage) => {
            for (const [key, value] of Object.entries(storage)) {
              localStorage.setItem(key, value);
            }
            return true;
          }, authLocalStorage)
          .catch((e) => console.error('Error setting localStorage:', e));
      }
    },
  },
});
