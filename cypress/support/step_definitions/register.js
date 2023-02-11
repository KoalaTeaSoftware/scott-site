import {Then, When} from "@badeball/cypress-cucumber-preprocessor";

Then(/^the register page is well formed$/, function () {
    cy.get("#username").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("#register").should("be.enabled");
});