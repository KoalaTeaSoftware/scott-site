import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

Then(/^the existing roles of user "([^"]*)" are found to be$/, function(userEmail) {
  // first, enter this address into the query field
  cy.get("#username").type(userEmail);
  // then try to get the data
  cy.get("#fetch").click();
  // finally, check the retrieved data
  cy.get("#results").get(".role").contains("admin");
});

Then(/^the user to affect field is empty$/, function() {
  cy.get("#emailAddress").should("be.empty");
});

Then(/^the get user roles button is (disabled|enabled)$/, function(state) {
  cy.get("#fetch").should("be." + state);
});

Then(/^the get user roles button is clicked$/, function() {
  cy.get("#fetch").click();
  cy.waitForSpinnerToShow();
  cy.waitForSpinnerToGo();
});

Then(/^the set user role button is (disabled|enabled)$/, function(state) {
  cy.get("#set").should("be." + state);

});
Then(/^the set user role button is clicked$/, function() {
  cy.get("#set").click();
  cy.waitForSpinnerToShow();
  cy.waitForSpinnerToGo();
});

When(/^the user to affect field contains "([^"]*)"$/, function(givenAddress) {
  cy.get("#emailAddress").type(givenAddress);
});


When(/^the user's role is set to "([^"]*)"$/, function(roleName) {
  cy.get("#" + roleName).click(); // use click so as to invoke the native only-one-selected thing
});

Then(/^the user's role shows as "([^"]*)"$/, function(role) {
  cy.get("#" + role).should("be.checked");
});
Then(/^a message indicating that they should specify the user's email is  displayed$/, function() {
  // OK rather a short comparison, byt we are just wanting to see that the right trance of UI is on display
  cy.get('h2').contains('Provide')
});