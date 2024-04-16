/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import './commands';
//
// -- This is a parent command --
Cypress.Commands.add('getUserIntercept', () => { 
  cy.intercept(
    'GET',
    '*/auth/user',
    { fixture: 'user.json' }
  ).as('getUser');
 });

 Cypress.Commands.add('getIngredientsIntercept', () => { 
  cy.intercept(
    'GET',
    '*/ingredients',
    { fixture: 'ingredients.json' }
  ).as('getIngredients');
 });
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      getUserIntercept(): Chainable<void>,
      getIngredientsIntercept(): Chainable<void>,
    }
  }
}