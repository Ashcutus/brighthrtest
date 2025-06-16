# BrightHR Technical Test

This project contains Playwright-based end-to-end tests for Employee Management within BrightHR Lite. It validates the functionality of adding new employees through a modal interface using dynamically generated data.

## Features

- Authenticated user session with `storageState`
- Tests employee creation flow via modal forms
- Utilizes dynamic test data with `@faker-js/faker` and `dayjs`
- CI integration with GitHub Actions
- Code formatting and linting with ESLint + Prettier
- Environment configuration via `.env`

## Getting Started

### Install dependencies
Clone the repo and run `npm install`

You will need to create a `.env` file in the root of the project with the following:

```
AUTH_URL=
BASE_URL=
USER_EMAIL=
USER_PASSWORD=
```

### Running tests
To run the tests headlessly, simply run `npx playwright test` or `npm run test`
If you would like the interactive mode simply append `--ui` to the npx command or run `npm run interactive`

### Github Actions
This project is set to run a Githib action workflow on push or PR to `main`