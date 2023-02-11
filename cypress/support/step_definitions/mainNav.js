import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

const logOutCtaLocator = "nav #logoutLink";

When(/^the user logs out$/, function() {
  cy.get(logOutCtaLocator).click();
  // this is fast, and a spinner will not be seen/used
});

Then(/^the log out action (is|is not) visible$/, function(flag) {
  if(flag === "is not"){
    cy.get(logOutCtaLocator).should("not.exist");
  }else {
    cy.get(logOutCtaLocator).should("exist");
  }
});

/**
 * using the nav-bar thereby NOT losing the identity context for the currently signed-in user
 */
When(/^the "([^"]*)" page is navigated to$/, function(linkText) {
  cy.get("nav").contains(linkText).click();
});
