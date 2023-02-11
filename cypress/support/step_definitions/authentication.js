import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Then(/^the UI presents the anonymous user view$/, function() {
//   // the sing-in link should be replaced by the sign-out link, if the user is signed-in
//   // the will be other indicators, but this is a nice one
//   cy.get("nav a").contains("Sign In").should("be.exist");
// });

Then(/^the user is known as "([^"]*)"$/, function(name) {
  cy.get("h1").contains(name);
});

When(/^the user signs\-in with username "([^"]*)" and password "([^"]*)"$/, function(address, password) {
  cy.get("#email").clear().type(address);
  cy.get("#password").clear().type(password);
  cy.get("#doIt").click();
  cy.waitForSpinnerToGo();
});

When(/^the user signs\-in with unmatchable credentials$/, function() {
  cy.get("#email").clear().type(chance.email());
  cy.get("#password").clear().type(chance.word({ length: 15 }));
  cy.get("#doIt").click();
  cy.waitForSpinnerToGo();
});

Then(/^the credential fields (can|can not) be seen$/, function(flag) {
  let criterion = "not.exist";
  if (flag === "can") {
    criterion = "exist";
  }
  cy.get("#email").should(criterion);
  cy.get("#password").should(criterion);
  cy.get("#doIt").should(criterion);
});