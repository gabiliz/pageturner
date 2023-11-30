import { test, expect } from '@playwright/test';

test('go to a book page in categories', async ({ page }) => {
  await page.goto('https://pageturner.vercel.app/');
  await page.getByRole('link', { name: 'Categorias' }).click();
  await page.getByRole('link', { name: 'Dare to Love Carly Phillips' }).click();

  await expect(page.getByRole('heading', { name: 'Dare to Love' })).toBeVisible()
});