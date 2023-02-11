// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
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

/**
 * This makes these two available all over the place. It is a good idea to put them into
 * all the places where (for example) we wait for firebase to get back to us. Use them like this:
 *  cy.waitForSpinnerToShow();
 *  cy.waitForSpinnerToGo();
 * Idea will lie about the availability of the functions, but don't be fooled, they will do their stuff
 */
Cypress.Commands.add('waitForSpinnerToShow', () =>{
  cy.get(".loadingSpinner").should("be.visible", { timeout: 60000 });
})
Cypress.Commands.add('waitForSpinnerToGo', () =>{
  cy.get(".loadingSpinner").should("not.be.visible", { timeout: 60000 });
})