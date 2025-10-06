// ***********************************************************
// This example support/gui.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-xpath";
import "allure-cypress";

Cypress.on("fail", (err, runnable) => {
  const date = new Date().toISOString();
  cy.writeFile(
    `cypress_avocado_tests/logs/${date}.html`,
    Cypress.$("body").html(),
  );
  throw err;
});
Cypress.on("window:load", () => {
  return false;
});
Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
