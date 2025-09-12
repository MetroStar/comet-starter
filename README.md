# Welcome to the Comet Starter App!

The goal of this project is to provide a React with TypeScript starter application, which comes pre-configured with the USWDS-based [Comet Component Library](https://github.com/MetroStar/comet) as well as other tools to accelerate development. Some of these tools are as follows:

- Tooling: [Vite](https://vitejs.dev/)
- Platform: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- Component Library: [Comet Component Library](https://github.com/MetroStar/comet)
- Data Visualization: [Victory Charts](https://formidable.com/open-source/victory/)
- Global State Management: [Jotai](https://jotai.org/)
- Asynchronous State Management: [Tanstack Query](https://tanstack.com/query/v3/)
- API Support: [Axios](https://axios-http.com/)
- Form Validation: [TanStack Form](https://tanstack.com/form/latest) with [Zod](https://zod.dev/)
- Unit Testing: [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Code Analysis: [ESLint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)
- End-to-End (E2E) Testing: [Playwright](https://playwright.dev/)
- Accessibility Testing: [Unlighthouse](https://unlighthouse.dev/)
- API Testing: [Jupyter Notebooks](https://jupyter.org/)
- Authentication Support: [Keycloak](https://www.keycloak.org/)

## Table of Contents

1. [Running the Project Locally](#running-the-project-locally)
2. [Running with Docker](#running-with-docker)
3. [Running Unit Tests](#running-unit-tests)
4. [Running Code Quality Checks](#running-code-quality-checks)
5. [Running End-to-End (E2E) Tests](#running-end-to-end-e2e-tests)
6. [Running Accessibility (a11y) Tests](#running-accessibility-a11y-tests)
7. [Contributing](#contributing)
8. [Next Steps](#next-steps)

## Running the Project Locally

1. To install dependencies, run the following:

```sh
npm install
```

2. Install the [Comet MCP](https://github.com/MetroStar/comet/tree/main/packages/comet-mcp) (optional):

3. Install Recommended VS Code Extensions (optional)

4. To run locally with SSO, add a file called `.env.local` to the `comet-starter` directory. Copy and paste the template below and replace the placeholder values with your own (optional):

```
VITE_SSO_AUTHORITY=[SOME_KEYCLOAK_REALM_URL] # Ex: http://localhost:8088/realms/dev
VITE_SSO_CLIENT_ID=[SOME_CLIENT_ID] # Ex: dev-client
```

5. To start the app, run the following:

```sh
npm run dev
```

## Running with Docker

1. To build the image, run the following:

```sh
docker build . -t comet-starter
```

2. To run the container, run the following:

```sh
docker run -p 8080:8080 --name comet-starter comet-starter
```

3. Access the app by navigating to: `http://localhost:8080`

## Running Unit Tests

To make sure your changes do not break any unit tests, run the following:

```sh
npm run test
```

Ensure to review the coverage directory for code coverage details.

```sh
npm run test:coverage
```

## Running Code Quality Checks

To make sure your changes adhere to additional code quality standards, run the following:

```sh
npm run lint
npm run format
```

You can also see the `.vscode/settings.json` file to find how to enable auto-formatting on save.

## Running End-to-End (E2E) Tests

Note: running E2E tests requires a deployed or running app.

1. To run against a deployed app, add the following to your .env.local (optional):

```
VITE_BASE_URL=SOME_URL # Ex: 'https://metrostar.github.io/comet-starter/'
```

2. To install playwright dependencies, run the following (only required the first time):

```sh
npx playwright install
```

3. To run e2e tests, run the following:

```sh
npm run e2e
```

## Running Accessibility (a11y) Tests

Note: running accessibility tests requires a deployed or running app.

1. To run against a deployed app, add the following to your .env.local (optional):

```
VITE_BASE_URL=SOME_URL # Ex: 'https://metrostar.github.io/comet-starter/'
```

2. To run accessibility tests, run the following:

```sh
npm run a11y
```

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature_a`)
3. Commit your Changes (`git commit -m 'Added new feature_a'`)
4. Push to the Branch (`git push origin feature_a`)
5. Open a Pull Request

## Next Steps

The following provides a short list of tasks which are potential next steps for this project. These could be steps in making use of this baseline or they could be for learning purposes.

- [ ] Apply/clean-up basic branding (title, header, footer, logo, favicon, etc)
- [ ] Add/Update Dashboard, About, Contact Us pages with applicable content
- [ ] Enhance Dashboard table functionality (filter, search, paging)
- [ ] Add Profile page and Profile Menu to Header (include Sign In/Sign Out, Profile, etc)
- [ ] Integrate with some API (Ex. [Comet API](https://github.com/MetroStar/comet-api))
- [ ] Integrate with some Identity Provider to support Single Sign-On (SSO)
- [ ] Deploy to cloud infrastructure
