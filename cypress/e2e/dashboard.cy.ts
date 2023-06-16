describe('dashboard spec', () => {
  beforeEach(() => {
    // Test Setup
    cy.viewport('macbook-16');
  });

  it('navigates to home and signs in', () => {
    // Navigate to Homepage
    cy.visit(Cypress.env('base_url'));
    cy.get('h1').should('contain', 'Welcome Guest');

    // Sign In
    cy.signIn('test', 'test');

    // Navigate to Dashboard
    cy.get('#dashboard-link').click();
    cy.get('h1').should('contain', 'My Dashboard');
  });
});
