import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
	testDir: './tests',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [['html', { open: 'never' }], ['dot']],
	timeout: 30000,
	expect: {
		timeout: 30000, // Timeout for expectations as CI is slower
	},

	projects: [
		{ name: 'setup', testMatch: /.*\.setup\.js/ },

		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				storageState: path.resolve(__dirname, './playwright/.auth/user.json'),
				headless: process.env.CI ? true : false,
			},
			dependencies: ['setup'],
		},
	],
});
