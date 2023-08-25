# Welcome to the Comet Starter App!

The goal of this project is to provide a React with TypeScript starter application, which comes pre-configured with the USWDS-based [Comet Component Library](https://github.com/MetroStar/comet) as well as other tools to accelerate development. Some of these tools are as follows:

- Tooling: [Vite](https://vitejs.dev/)
- Platform: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- Component Library: [Comet Component Library](https://github.com/MetroStar/comet)
- Data Visualization: [Victory Charts](https://formidable.com/open-source/victory/)
- State Management: [Recoil](https://recoiljs.org/)
- Form Validation: [React Hook Form](https://react-hook-form.com/)
- Unit Testing: [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Code Analysis: [ES Lint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)
- End-to-End (E2E) Testing: [Cypress](https://www.cypress.io/)
- Accessibility Testing: [cypress-axe](https://www.npmjs.com/package/cypress-axe)
- API support: [axios](https://axios-http.com/)
- Authentication support: [Keycloak](https://www.keycloak.org/)

## Table of Contents

1. [Running the Project Locally](#running-the-project-locally)
2. [Running Unit Tests](#running-unit-tests)
3. [Running Code Quality Checks](#running-code-quality-checks)
4. [Running End-to-End (E2E) Tests](#running-end-to-end-e2e-tests)
5. [Contributing](#contributing)

## Running the Project Locally

1. To install dependencies, run the following:

```sh
npm install
```

2. To run locally with SSO, add a file called `.env.local` to the `comet-starter` directory. Copy and paste the template below and replace the placeholder values with your own (optional):

```
SSO_AUTHORITY=[SOME_KEYCLOAK_REALM_URL] # Ex: http://localhost:8088/realms/dev
SSO_CLIENT_ID=[SOME_CLIENT_ID] # Ex: dev-client
```

3. To start the app, run the following:

```sh
npm run dev
```

## Running Unit Tests

To make sure your changes do not break any unit tests, run the following:

```sh
npm run test
```

Ensure to review the coverage directory for code coverage details.

```sh
npm run coverage
```

## Running Code Quality Checks

To make sure your changes adhere to additional code quality standards, run the following:

```sh
npm run lint
npm run format
```

You can also see the `.vscode/settings.json` file to find how to enable auto-formatting on save.

## Running End-to-End (E2E) Tests

Note: running E2E tests requires the app to be running as well, run the following:

```sh
npm run e2e
```

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature_a`)
3. Commit your Changes (`git commit -m 'Added new feature_a'`)
4. Push to the Branch (`git push origin feature_a`)
5. Open a Pull Request
