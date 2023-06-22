import { launchData } from '../fixtures/data';

describe('dashboard spec', () => {
  beforeEach(() => {
    // Test Setup
    cy.viewport('macbook-16');
  });

  it('verifies access to dashboard after signing in', () => {
    // Navigate to Homepage
    cy.visit(Cypress.env('base_url'));

    // Setup Accessibility Testing
    cy.injectAxe();

    // Verify Homepage
    cy.get('h1').should('contain', 'Welcome Guest');

    // Sign In
    cy.get('#auth-link').click();
    cy.signIn('test', 'test');

    // Mock launch data
    cy.intercept('GET', '/api/*', {
      statusCode: 200,
      body: {
        results: launchData,
      },
    });

    // Navigate to Dashboard
    cy.get('#dashboard-link').click();
    cy.get('h1').should('contain', 'My Dashboard');

    // Verify no accessibility violations
    cy.checkA11y();

    // Mock launch data
    cy.intercept('GET', '/api/*', {
      statusCode: 200,
      body: launchData[0],
    });

    // Click on table item and verify details
    cy.get('[id*="details-link-"]:first').click();
    cy.get('h1').should('contain', 'Launch Details');

    // Verify no accessibility violations
    cy.checkA11y();
  });
});
