import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://metrostar.github.io/comet-starter/',
  },
  testDir: 'e2e',
});
