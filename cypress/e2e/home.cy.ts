describe('home spec', () => {
  beforeEach(() => {
    // Test Setup
    cy.viewport('macbook-16');
  });

  it('navigates to home', () => {
    // Navigate to Homepage
    cy.visit(Cypress.env('base_url'));

    // Verify Homepage
    cy.get('h1').should('contain', 'Welcome Guest');
    cy.get('#sign-in-alert').should('exist');
  });
});
