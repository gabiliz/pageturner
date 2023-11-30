import { test, expect } from '@playwright/test';


test('home page', async ({ page }) => {
  await page.goto('https://pageturner.vercel.app/');

  await expect(page).toHaveTitle(/Pageturner/)

  await expect(page.getByRole('heading', { name: 'Novos Lançamentos' })).toBeVisible();
})