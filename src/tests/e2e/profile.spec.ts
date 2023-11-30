import { test, expect } from '@playwright/test';


test('home page', async ({ page }) => {
  await page.goto('https://pageturner.vercel.app/');

  await expect(page).toHaveTitle(/Pageturner/)

  await page.getByRole('button', { name: 'Sign in' }).click()

  await expect(page.getByText('Sign in with Google')).toBeVisible()
})