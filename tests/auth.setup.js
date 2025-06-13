import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
	await page.goto(process.env.AUTH_URL);
	await page.locator('#username').fill(process.env.USER_EMAIL);
	await page.locator('#password').fill(process.env.USER_PASSWORD);
	await page.getByRole('button', { name: 'Login' }).click();

	await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
	await expect(page.getByTestId('Dashboard')).toBeVisible();

	await page.context().storageState({ path: authFile });
});
