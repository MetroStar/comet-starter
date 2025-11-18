# Comet Starter Project

This project is a starter template for building web applications using React, TypeScript, and the MetroStar Comet component library. It includes features like SSO authentication, unit testing, code quality checks, and more.

## Project Features

This project is built using the following tools and libraries:

- React with TypeScript
- Vite for managing React Development and Bundling
- MetroStar Comet components as our Component Library
- React Router for routing
- React Query and Axios to support making API calls
- Jotai for Global State Management
- Tanstack Form with Zod for Form Validation

## Development Guidelines

- Use TypeScript for type safety.
- Use the Comet Component Library for UI components.
- Do not use any third-party libraries that are not already included in the project.
- Comet components are documented at [Comet Documentation](https://metrostar.github.io/comet).
- Use the Comet MCP tools to gather details about Comet components, including available props, usage examples, and best practices.
- Use the Comet Icon component for icons.
- All comet-uswds and comet-extras components should include an `id` attribute.
- Use comet-data-viz components for BarGraph, AreaGraph, LineGraph, PolarAxis, PieChart, ScatterGraph, StackGraph.
- Dashboard pages should include all code in a single component, no need to break out into multiple components.
- Dashboard pages do not need unit tests unless specifically requested.
- Use arrow functions for components and hooks.
- Use functional components instead of class components.
- Use PascalCase for component names.
- Use kebab-case for file names and directories.
- Components should return `React.ReactElement`.
- Use named exports for components and pages.
- Use custom hooks for calling APIs.
- New components should be added to their own directory and should include a component and a test file.
- New pages should be added with a protected route.
- New pages should be included in the top navigation, by adding to the `src/utils/constants.ts` - `HEADER_LINKS_SIGNED_IN` array.

## Styling Guidelines

- Use SCSS for styling.
- Global styles should be in `src/styles/global.scss`.
- Component level styling should be in a `.scss` file with the same name as the component.
- Use USWDS utility classes where possible.
- Use USWDS grid system for layout.
- Use USWDS flex system for flexbox layouts.
- Do attempt to add custom styling to override USWDS styles.
- Ensure cards used for data visualizations sized appropriately for the content.

## Unit Testing

- Use Vitest for unit testing, never use Jest.
- Use React Testing Library for testing React components.
- Use 'test' instead of 'it' for test names.

## Code Quality

- Use ESLint for code analysis.
- Use Prettier for code formatting.

## Accessibility

- Ensure HTML is WCAG 2.1 AA and Section 508 compliant.
- Ensure HTML meets accessibility best practices for screen readers, keyboard navigation, and color contrast.
- Use semantic HTML and ARIA roles appropriately.

## Important Copilot Instructions

- The app already contains a header, footer, and search component. No need to add these again.
- No need to add or update tests unless specifically requested.
- Wait until work is complete before trying to fix formatting issues.
