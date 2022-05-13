// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
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

// -- Function that validates page header--
Cypress.Commands.add('validatePageHeader', (matchingString) => {
    cy.get('h1').should('have.text', matchingString);
})

// --Function that validates that page URL includes given string--
Cypress.Commands.add('validatePageUrl', (matchingString) => {
    cy.url().should('include', matchingString)
})

//-- Login using backend --

Cypress.Commands.add('loginWithBackend', () => {
    cy.request({
        method: 'POST',
        url: Cypress.env('api_url'),
        body: {
            email: Cypress.env('login_email'),
            password: Cypress.env('login_password')
        }
    }).its('body').then(response => {
        window.localStorage.setItem('user_id', response.user.id);
        window.localStorage.setItem('user', response.user);
        window.localStorage.setItem('token', response.token);
    })
})