import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), EnvironmentPlugin('all')],
  resolve: {
    alias: {
      '~uswds': path.resolve(__dirname, 'node_modules/@uswds/uswds'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'legacy',
        includePaths: ['node_modules/@uswds/uswds/packages'],
        // Silence warnings coming from USWDS SCSS
        quietDeps: true,
        logger: {
          warn: (msg) => {
            if (msg.includes('legacy-js-api')) {
              return;
            }
            console.warn(msg);
          },
        },
      },
    },
    postcss: {
      plugins: [autoprefixer],
    },
  },
  server: {
    open: true,
    port: 5173,
    proxy: {
      // Provides mocked signin for local development
      '/api/auth/signin': {
        target: 'http://0.0.0.0:8000',
        bypass: (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          let data = '';

          req.on('data', (chunk) => {
            data += chunk;
          });

          req.on('end', () => {
            const validUses = ['admin', 'test'];
            const body = JSON.parse(data);
            const username = body.username;

            if (!validUses.includes(username)) {
              return;
            }

            res.end(
              JSON.stringify({
                first_name: 'Test',
                last_name: 'User',
              }),
            );
          });
          return;
        },
      },
      '/api': {
        target: 'http://0.0.0.0:8000',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    exclude: ['node_modules/**', 'e2e/**'],
    coverage: {
      all: false,
      provider: 'v8',
      thresholds: {
        global: {
          statements: 95,
          branches: 95,
          functions: 95,
          lines: 95,
        },
      },
      exclude: ['src/utils/axios.ts', 'src/utils/keycloak.ts'],
    },
    css: false,
    alias: {
      // This is necessary to prevent cjs/esm conflicts
      '@metrostar/comet-uswds': path.resolve(
        __dirname,
        'node_modules/@metrostar/comet-uswds/dist/esm/index.js',
      ),
    },
  },
});
