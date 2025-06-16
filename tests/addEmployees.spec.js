const { test, expect } = require('@playwright/test');
const EmployeePage = require('../utils/EmployeesPage');
const { faker } = require('@faker-js/faker');
const dayjs = require('dayjs');
const path = require('path');

// Generate dynamic test data
const firstNameOne = faker.person.firstName();
const lastNameOne = `${faker.person.lastName()}${faker.number.int({
	min: 1000,
	max: 99999,
})}`;
const emailOne = `${firstNameOne}.${lastNameOne}@testemail.org.uk`;
const phoneOne = faker.phone.number({ style: 'international' });
const jobTitleOne = faker.person.jobTitle();
const todayDate = dayjs().format('ddd MMM DD YYYY');
const formattedDate = dayjs().format('ddd DD MMM YYYY');

const firstNameTwo = faker.person.firstName();
const lastNameTwo = `${faker.person.lastName()}${faker.number.int({
	min: 1000,
	max: 99999,
})}`;
const emailTwo = `${firstNameTwo}.${lastNameTwo}@testemail.org.uk`;
const phoneTwo = faker.phone.number({ style: 'international' });
const jobTitleTwo = faker.person.jobTitle();

test.describe.serial('Adding Employees', () => {
	let context;
	let page;
	let employeePage;

	test.beforeAll(async ({ browser }) => {
		// As the login app uses a different origin, we store the browser session data for subsequent tests
		context = await browser.newContext({
			storageState: path.resolve(__dirname, '../playwright/.auth/user.json'),
		});
		page = await context.newPage();
		employeePage = new EmployeePage(page);

		await employeePage.navigateToDashboard();
	});

	test('Navigates to Employees section', async () => {
		await employeePage.navigateToEmployeeHub();
	});

	test('Opens Add employee modal', async () => {
		await employeePage.openAddEmployeeModal();
		await expect(page.locator(employeePage.modalTitle)).toBeVisible();
		await expect(
			page.locator(employeePage.saveNewEmployeeButton)
		).toBeDisabled();
	});

	test('Completes Add employee form', async () => {
		await employeePage.fillEmployeeForm(
			firstNameOne,
			lastNameOne,
			emailOne,
			phoneOne,
			jobTitleOne,
			todayDate
		);
		await expect(page.locator(employeePage.dateSelector)).toHaveText(
			formattedDate
		);
		await employeePage.submitEmployeeForm();
	});

	test('Confirms employee is added', async () => {
		await expect(employeePage.successMessage()).toBeVisible();
		await expect(employeePage.employeeConfirmation(firstNameOne)).toBeVisible();
		await employeePage.closeModalButton().click();
		await expect(employeePage.employeeProfile(firstNameOne)).toBeVisible();
	});

	test.afterAll(async () => {
		await page.close();
		await context.close();
	});
});

test.describe.serial('Add a second employee', () => {
	let context;
	let page;
	let employeePage;

	test.beforeAll(async ({ browser }) => {
		context = await browser.newContext({
			storageState: path.resolve(__dirname, '../playwright/.auth/user.json'),
		});
		page = await context.newPage();
		employeePage = new EmployeePage(page);

		await employeePage.navigateToDashboard();
		await employeePage.navigateToEmployeeHub();
	});

	test('Opens Add employee modal', async () => {
		await employeePage.openAddEmployeeModal();
		await expect(page.locator(employeePage.modalTitle)).toBeVisible();
		await expect(
			page.locator(employeePage.saveNewEmployeeButton)
		).toBeDisabled();
	});

	test('Completes Add employee form', async () => {
		await employeePage.fillEmployeeForm(
			firstNameTwo,
			lastNameTwo,
			emailTwo,
			phoneTwo,
			jobTitleTwo,
			todayDate
		);
		await expect(page.locator(employeePage.dateSelector)).toHaveText(
			formattedDate
		);
		await employeePage.submitEmployeeForm();
	});

	test('Confirms employee is added', async () => {
		await expect(employeePage.successMessage()).toBeVisible();
		await expect(employeePage.employeeConfirmation(firstNameTwo)).toBeVisible();
		await employeePage.closeModalButton().click();

		// Verify both employees are visible
		await expect(employeePage.employeeProfile(firstNameOne)).toBeVisible();
		await expect(employeePage.employeeProfile(firstNameTwo)).toBeVisible();
	});

	test.afterAll(async () => {
		await page.close();
		await context.close();
	});
});
