class Board {

    get addBoardButton() {
        return cy.get('li[class="vs-c-my-organization__board vs-c-my-organization__board-new"]').first();
    }

    get boardTitleInput() {
        return cy.get('input[name="name"]');
    }

    get goNextButton() {
        return cy.get('button[name="next_btn"]')
    }

    get boardTypeRadioButton() {
        return cy.get('span[class="vs-c-radio-check"]').first();
    }

    get boardConfigurationButton() {
        return cy.get('ul[class="vs-c-list"]')
            .children()
            .last();
    }

    get deleteBoardButton() {
        return cy.get('button[class="vs-c-btn vs-c-btn--warning vs-c-btn--spaced"]');
    }

    get confirmDeleteButton() {
        return cy.get('button[name="save-btn"]');
    }

    get backlogElement() {
        return cy.get('div[class="vs-c-col__head"]').first();
    }

    createNewBoard(boardTitle) {
        this.addBoardButton.click();
        this.boardTitleInput.type(boardTitle);
        this.goNextButton.click();
        this.boardTypeRadioButton.click();
        this.goNextButton.click();
        this.goNextButton.click();
        this.goNextButton.click();
        this.goNextButton.click();
    }

    deleteBoard() {
        this.boardConfigurationButton.click();
        this.deleteBoardButton.click();
        this.confirmDeleteButton.click();
    }

    validateBackgroundColor(selector, matchingColor) {
        selector.should('have.css', 'background-color', matchingColor);
    }

}

export const myBoard = new Board();