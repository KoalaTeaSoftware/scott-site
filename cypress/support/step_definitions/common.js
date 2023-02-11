import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
// because it is declared here, chance is available in all of the more specific step definitions
// see https://chancejs.com/web/email.html
const Chance = require("chance");

const chance = new Chance();

/**
 * NOTE: this is using visit - it puts this address into the browser's address bar, thereby starting a new browser session
 */
Given(/^the "([^"]+)" page is open$/, (relativePath) => {
  cy.visit(relativePath);

  cy.window().then((win) => {
    cy.log(`Location is now: [${win.location}]`)
  })
});

/**
 * The 'title tag' is the HTML header, as distinct from what the user sees as the main heading on the page
 */
Then(/^the page's title tag is "([^"]*)"$/, (title) => {
  cy.title({ timeout: 10000 }).should("eq", title); // case-sensitive - Note have.text does not work here
});

// The following could be used to make an assertion less fussy about letter-case by looking omitting capitals from a fragment of what is expected
Then(/^the page's title tag contains "([^"]*)"$/, (title) => {
  cy.title().contains(title); // case-sensitive
});

/**
 * The page's 'main heading' is what the user sees as the first important heading on the page
 */
Then(/^the page's main heading is "([^"]*)"$/, function(titleText) {
  cy.get("h1").should("have.text", titleText);
});

Then(/^the page's main heading contains "([^"]*)"$/, function(mainHeading) {
  cy.get("h1").contains(mainHeading);
});

/**
 * If you are wanting to find a browser-native alert, you ned to call this BEFORE to perform that action that
 * you expect will trigger that alert
 */
Given(/^the alert catcher is prepared to see "([^"]*)"$/, function(expectedMessageFragment) {
  cy.on("window:alert", (str) => {
    console.log("Inside of the alert listener");
    expect(str).to.contain(expectedMessageFragment);
  });
});


/**
 * The loading spinner is used to ensure that async tasks finish,
 * so Cypress is given a generous very generous time-out (by default)
 * could enhance this to give it a shaper, more directed, timeout.
 */
Then(/^the loading spinner becomes (visible|invisible)$/, function(flag) {
  if (flag === "visible") {
    cy.get(".loadingSpinner").should("be.visible", { timeout: 60000 });
  } else {
    cy.get(".loadingSpinner").should("not.be.visible", { timeout: 60000 });
  }
});

/**
 * A feedback P is likely to exist on many pages
 */
Then(/^the feedback message is empty$/, function() {
  cy.get("#feedback").should("not.exist");
});

Then(/^the feedback message contains "([^"]+)"$/, function(expectedMessageFragment) {
  cy.get("#feedback").contains(expectedMessageFragment);
});

Then(/^a message indicating a lack of permission is displayed$/, function() {
  cy.get('h2').should('exist').should('contain.text', 'You need to be logged in')
});

Then(/^the page has all of its main parts$/, function () {
  /*
  This website's pages are structured in this way
   */
  cy.get("body", {timeout: 10000}).should('exist' )
  cy.get("#app", {timeout: 1000}).should('exist' )
  cy.get("#banner-box").should('exist' )
  cy.get("#pageContents").should('exist' )
  cy.get("#footerBox").should('exist' )
});

/**
 * The following has been grabbed from a StackOverflow example. It is fast enough.
 * If it had to be made faster, then filtering by visibility could be used
 * I am not sure why filtering by having a src attribute is useful - surely, if the attribute is not populated, that is a fault
 * naturalWidth _will_ be 0 if the image can't be found (despote some browsers use of a 'broken' img)
 * maybe it is the use of naturalWidth that makes it faster than basing the test on the width, or height
 * or maybe map is faster than .each and wrap
 */
Then(/^all images are displayed$/, function () {
  cy.get('img', { includeShadowDom: true })
      // .filter('[src]')
      // .filter(':visible')
      .should(($imgs) =>
          $imgs.map((i, /** @type {HTMLImageElement} */ img) =>
              expect(img.naturalWidth).to.be.greaterThan(0)));
});