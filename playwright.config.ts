import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const testEnv = process.env.TEST_ENV || 'local';

dotenv.config({ path: path.resolve(__dirname, `.env.${testEnv}`) });

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  use: {
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },

  projects: [
    {
      name: 'api',
      testDir: './e2e/api',
      use: {},
    },
    {
      name: 'flows',
      testDir: './e2e/flows',
      use: {},
    },
    // UI tests - Phase 2 (disabled)
    // {
    //   name: 'chromium',
    //   testDir: './e2e/ui',
    //   use: { ...devices['Desktop Chrome'] },
    // },
  ],

  globalSetup: './e2e/config/global-setup.ts',
  globalTeardown: './e2e/config/global-teardown.ts',
});
