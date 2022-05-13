/// <reference types="cypress"/>
import {
    loginPage
} from "../page_object/login.js";

describe('user login', () => {

    before('visit login page', () => {
        cy.visit('login');
    })

    it('validate login page', () => {
        cy.validatePageUrl('/login');
        cy.validatePageHeader('Log in with your existing account');
        loginPage.validateBackgroundColor(loginPage.loginPageBackground, 'rgb(78, 174, 147)');
    })

    it('user login with valid credentials', () => {
        loginPage.userLoginWithUI(
            Cypress.env('login_email'),
            Cypress.env('login_password')
        );

    })

    it('validate home page after login', () => {
        loginPage.validateBackgroundColor(loginPage.homePageBackground, 'rgb(244, 244, 244)');
        cy.validatePageUrl('/my-organizations');
    })
})