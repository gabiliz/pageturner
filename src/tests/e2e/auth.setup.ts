import { test as setup, expect } from '@playwright/test';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const authFile = 'playwright/.auth/user.json';

chromium.use(StealthPlugin());


setup('authenticate', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('/');

  await expect(page).toHaveTitle(/Pageturner/)

  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.fill('input[type="email"]', 'gabilizzmor@gmail.com');
  await page.getByRole('button', { name: 'Next', exact: true }).click()
  await page.fill('#password >> input[type="password"]', 'TTCT8ttErh');
  await page.getByRole('button', { name: 'Next', exact: true }).click()
  await page.waitForURL('/')
  await expect(page.getByText('Gabriela Liz')).toBeVisible();

  await page.context().storageState({ path: authFile });
});