import {Then} from "@badeball/cypress-cucumber-preprocessor";

Then(/^all externally stored text has been retrieved$/, function () {
    /*
    This relies on component testing of the editable div, which should prove
    1) that the loading spinner will go away when the retrieval is complete (successfully or otherwise)
    2) that something sensible gets put into the block (we are not seeing that it is sensible)
     */
    cy.get(".editableDiv > .loadingSpinner")
        .each(($el, index, $list) => {
            // wrapping them allows for the use of should, and this bring in the automatic retries
            // if this needs a longer timeout, the wrap can be given the timeout option
            cy.wrap($el).should('not.be.visible')
            })
});