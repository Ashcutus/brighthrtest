class EmployeePage {
	constructor(page) {
		this.page = page;

		// Navigation
		this.employeesSection = '[data-e2e="employees"]';
		this.dashboardURL = `${process.env.BASE_URL}/dashboard`;
		this.employeeHubURL = `${process.env.BASE_URL}/employee-hub`;

		// Employee modal
		this.addEmployeeButton = 'button:has-text("Add employee")';
		this.modalTitle = 'h1:has-text("Add employee")';
		this.saveNewEmployeeButton = 'button:has-text("Save new employee")';

		// Employee form fields
		this.firstNameField = '#firstName';
		this.lastNameField = '#lastName';
		this.emailField = '#email';
		this.registrationEmailCheckbox = '#registrationEmail';
		this.phoneField = '#phoneNumber';
		this.startDatePicker = '#startDate';
		this.dayPickerBody = (date) =>
			`[class="DayPicker-Body"] div[aria-label="${date}"]`;
		this.dateSelector = '[data-testid="input-selector"] span';
		this.jobTitleField = '#jobTitle';

		// Confirmation (returns locators for use in spec assertions)
		this.successMessage = () =>
			this.page.locator('h1:has-text("Success! New employee added")');
		this.employeeConfirmation = (name) =>
			this.page.locator(
				`[data-testid="background"] .flex.items-center.p-6:has-text("${name} added to BrightHR Lite")`
			);
		this.closeModalButton = () =>
			this.page.locator('button[aria-label="Close modal"]');
		this.employeeProfile = (name) =>
			this.page.locator(`h1:has-text("${name}")`);
	}

	// ✅ Navigation Methods
	async navigateToDashboard() {
		await this.page.goto(this.dashboardURL);
		await this.page.waitForURL(this.dashboardURL);
	}

	async navigateToEmployeeHub() {
		await this.page.locator(this.employeesSection).click();
		await this.page.waitForURL(this.employeeHubURL);
	}

	// ✅ Employee Modal Methods
	async openAddEmployeeModal() {
		await this.page.locator(this.addEmployeeButton).click();
	}

	// ✅ Employee Form Methods
	async fillEmployeeForm(
		firstName,
		lastName,
		email,
		phone,
		jobTitle,
		formattedDate
	) {
		await this.page.locator(this.firstNameField).fill(firstName);
		await this.page.locator(this.lastNameField).fill(lastName);
		await this.page.locator(this.emailField).fill(email);
		await this.page.locator(this.phoneField).fill(phone);
		await this.page.fill(this.jobTitleField, jobTitle);

		await this.page.click(this.startDatePicker);
		await this.page
			.locator(this.dayPickerBody(formattedDate))
			.scrollIntoViewIfNeeded();
		await this.page.locator(this.dayPickerBody(formattedDate)).click();
	}

	async submitEmployeeForm() {
		await this.page.locator(this.saveNewEmployeeButton).click();
	}
}

module.exports = EmployeePage;
