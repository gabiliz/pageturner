import { test, expect } from '@playwright/test'

test('go to specific book', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Pesquise por título, autor,').click()
  await page.getByPlaceholder('Pesquise por título, autor,').fill('Flores para algernon');
  await page.getByPlaceholder('Pesquise por título, autor,').press('Enter');
  await page.getByRole('link', { name: 'Flores Para Algernon Daniel Keyes', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'Flores Para Algernon' })).toBeVisible()
})