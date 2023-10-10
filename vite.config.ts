import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

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
});
