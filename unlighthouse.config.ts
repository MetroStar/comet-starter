import { defineConfig } from 'unlighthouse';

export default defineConfig({
  // auth: {
  //   username: '',
  //   password: '',
  // },
  ci: {
    budget: {
      performance: 90,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
    },
  },
  debug: true,
  routerPrefix: '/comet-starter',
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
  scanner: {
    device: 'desktop',
    skipJavascript: false,
  },
  site: 'http://localhost:8080',
  // urls: ['/', '/signin', '/dashboard'],
});
