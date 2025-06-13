// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
	testDir: './tests',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{ name: 'setup', testMatch: /.*\.setup\.js/ },

		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				storageState: path.resolve(__dirname, './playwright/.auth/user.json'), // Single session state
			},
			dependencies: ['setup'],
		},

		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				storageState: path.resolve(__dirname, './playwright/.auth/user.json'),
			},
		},

		{
			name: 'webkit',
			use: {
				...devices['Desktop Safari'],
				storageState: path.resolve(__dirname, './playwright/.auth/user.json'),
			},
		},
	],
});
