import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://localhost:3000'

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './src/tests/e2e',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: baseURL,

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    // Viewport used for all pages in the context.
    viewport: { width: 1920, height: 1080 },

  },
  // Configure projects for major browsers.
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },

    },
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    // },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,
  },
});

export { baseURL }