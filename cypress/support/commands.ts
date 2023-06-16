/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// Sign-in command
Cypress.Commands.add('signIn', (username, password) => {
  cy.get('#auth-link').click();
  cy.get('input[name="username"]').type(`${username}`).should('have.value', `${username}`);
  cy.get('input[name="password"]').type(`${password}`).should('have.value', `${password}`);
  cy.get('#submit').click();
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      signIn(email: string, password: string): Chainable<void>;
    }
  }
}
