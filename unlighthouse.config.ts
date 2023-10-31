import { defineConfig } from 'unlighthouse';

export default defineConfig({
  ci: {
    budget: {
      performance: 90,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
    },
  },
  debug: true,
  // hooks: {
  //   async authenticate(page) {
  //     // login to the page
  //     await page.goto('http://some-auth-provider');
  //     const emailInput = await page.$('input[type="text"]');
  //     await emailInput?.type('some-user');
  //     const passwordInput = await page.$('input[type="password"]');
  //     await passwordInput?.type('some-password');
  //     await Promise.all([
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       page.$eval('#login-form', (form: any) => form.submit()),
  //       page.waitForNavigation(),
  //     ]);
  //   },
  // },
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
  puppeteerOptions: {
    // headless: false,
    // slowMo: 50,
  },
  scanner: {
    device: 'desktop',
    skipJavascript: false,
  },
  site: 'https://metrostar.github.io/comet-starter/',
});
