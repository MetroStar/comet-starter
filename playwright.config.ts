import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load environment variables from .env files
dotenv.config({ path: path.resolve(__dirname, '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  use: {
    baseURL: process.env.VITE_BASE_URL || 'http://localhost:8080',
  },
  testDir: 'e2e',
  outputDir: 'e2e-results',
});
