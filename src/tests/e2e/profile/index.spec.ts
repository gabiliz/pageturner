import { test, expect } from '@playwright/test';
import { env } from 'process';


test('profile page', async ({ page }) => {
  await page.goto('/');
  await page.click('#login-button')

  await page.fill('input[type="email"]', env.GOOGLE_TEST_EMAIL ?? '');
  await page.click('button[type="button"]');
  await page.fill('input[type="password"]', env.GOOGLE_TEST_PASSWORD ?? '');
  await page.click('button[type="submit"]');

  await page.waitForURL('/')

  await expect(page.getByRole('paragraph', { name: 'Gabriela Liz' })).toBeVisible();
})