const {defineConfig} = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

async function setupNodeEvents(on, config) {
    // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
    await preprocessor.addCucumberPreprocessorPlugin(on, config);

    on(
        "file:preprocessor",
        webpack({
            webpackOptions: {
                resolve: {
                    extensions: [".ts", ".js"],
                },
                module: {
                    rules: [
                        {
                            test: /\.feature$/,
                            use: [
                                {
                                    loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                                    options: config,
                                },
                            ],
                        },
                    ],
                },
            },
        })
    );

    // Make sure to return the config object as it might have been modified by the plugin.
    return config;
}

/*
You have to define a baseUrl, otherwise cypress will be unable to understand simple relative urls  (like '/')
You have to give a port as well. Sadly `npm run`dev` wil occupy a different port from `npn run preview` unless you are
specific.
However, being specific appears to cause problems within github actions ToDo: find out how to get around this
 */
module.exports = defineConfig({
    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
    },
        e2e: {
            baseUrl: "http://localhost:8080/",
            projectId: "vwhed1",
            specPattern: "**/*.{feature,features,spec.js}",
            excludeSpecPattern: ["*.md", "**/samples/**"],
            chromeWebSecurity: false,
            setupNodeEvents,
        }
    });
