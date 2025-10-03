import { test, expect } from '@playwright/test';

// Test: Navigate EPAM site to Client Work and validate text visibility
// Steps:
// 1) Navigate to https://www.epam.com/
// 2) Select "Services" from the header menu.
// 3) Click the "Explore Our Client Work" link.
// 4) Verify that the "Client Work" text is visible on the page.

test.describe('EPAM - Client Work navigation', () => {
  test('Navigate from Home -> Services -> Client Work and verify content', async ({ page }) => {
    // 1) Navigate to EPAM homepage
    await page.goto('https://www.epam.com/');

    // Dismiss cookie banner if present
    const acceptCookies = page.getByRole('button', { name: /Accept All/i });
    try {
      if (await acceptCookies.isVisible()) {
        await acceptCookies.click();
      }
    } catch {
      // ignore if cookie banner not present
    }

    // 2) Select "Services" from the header menu
    // There may be multiple "Services" links; click one in the top navigation
    const servicesLink = page.getByRole('link', { name: 'Services', exact: true }).first();
    await servicesLink.click();
    await expect(page).toHaveURL(/\/services(?:$|\?)/);

    // 3) Click the "Explore Our Client Work" link on Services page
    await page.getByRole('link', { name: /Explore Our Client Work/i }).click();
    await expect(page).toHaveURL(/\/services\/client-work/);

    // 4) Verify that the "Client Work" text is visible on the page
    await expect(page.getByText(/Client\s*Work/i).first()).toBeVisible();
  });
});
