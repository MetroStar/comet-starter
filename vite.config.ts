import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), eslint(), EnvironmentPlugin('all')],
  resolve: {
    alias: {
      '~uswds': path.resolve(__dirname, 'node_modules/@uswds/uswds'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules/@uswds/uswds/packages'],
      },
    },
    postcss: {
      plugins: [autoprefixer],
    },
  },
  server: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5000',
        changeOrigin: true,
      },
    },
  },
  test: {
    alias: {
      '\\.(jpg|jpeg|png|svg|gif)$': path.resolve(__dirname, 'file-mock.js'),
    },
    globals: true,
    environment: 'jsdom',
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
    },
  },
});
