import { Then, When } from "@badeball/cypress-cucumber-preprocessor";


Then(/^a message indicating that they should provide credentials is displayed$/, function() {
  cy.get('h2').should('contain.text', 'Please provide the new user\'s credentials')
});