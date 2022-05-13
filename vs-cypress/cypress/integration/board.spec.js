/// <reference types="cypress"/>
import {
    myBoard
} from "../page_object/board.js";
import {
    loginPage
} from "../page_object/login.js";
import {
    faker
} from '@faker-js/faker';

describe('create new board', () => {

    let boardName = '';
    let boardId = '';

    before('user login and validation', () => {
        cy.visit('login');
        loginPage.userLoginWithUI(
            Cypress.env('login_email'),
            Cypress.env('login_password')
        );
        loginPage.validateBackgroundColor(loginPage.homePageBackground, 'rgb(244, 244, 244)');

        boardName = faker.name.jobTitle();
    })

    it('create new board with valid data', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards'
        }).as('boardCreated');

        myBoard.createNewBoard(boardName);
        cy.validatePageUrl('/board');
        myBoard.validateBackgroundColor(myBoard.backlogElement, 'rgb(254, 87, 35)');

        cy.wait('@boardCreated').then(interception => {
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.statusMessage).eq('Created');
            expect(interception.response.body.name).eq(boardName);
            boardId = interception.response.body.id
        })
    })

    it('delete board', () => {
        cy.intercept({
            method: 'DELETE',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards/' + boardId
        }).as('boardDeleted');

        myBoard.deleteBoard();

        cy.wait('@boardDeleted').then(interception => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
            expect(interception.response.body.id).eq(boardId);
            expect(interception.response.body.name).eq(boardName);
        })
    })
})