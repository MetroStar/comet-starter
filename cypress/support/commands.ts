/// <reference types="cypress" />

// Sign-in command
Cypress.Commands.add('signIn', (username, password) => {
  cy.get('input[name="username"]').type(`${username}`).should('have.value', `${username}`);
  cy.get('input[name="password"]').type(`${password}`).should('have.value', `${password}`);
  cy.get('#submit').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      signIn(email: string, password: string): Chainable<void>;
    }
  }
}
