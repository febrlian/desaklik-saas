import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  // Basic check, replace with actual app title later
  await expect(page).toHaveTitle(/Create Next App/);
});
