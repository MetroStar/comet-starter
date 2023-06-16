describe('signin spec', () => {
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

    // Verify Homepage after signin
    cy.get('h1').should('contain', 'Welcome John Doe');
    cy.get('#sign-in-alert').should('not.exist');
  });
});
