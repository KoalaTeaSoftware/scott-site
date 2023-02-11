# Features

* Feature files here.
    * written as you'd expect
    * This is specified in ~/cypress.config.js > e2e > specPattern
        * The default folder name is integration, and I don't much like that, so I have called it what it is.
* step defs in ~/cypress/support/step_definitions
    * This was arrived at after a lot of pain - the promises in the config documentation do not seem to be all that they
      are cracked up to be.
    * it'd seem that the names are arbitrary, it is just the location that is vital
    * I have chosen to put things like go to a page in common.js 