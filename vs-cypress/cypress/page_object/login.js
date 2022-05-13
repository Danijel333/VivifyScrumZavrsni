class Login {

    get loginPageBackground() {
        return cy.get('div[class="vs-c-modal vs-c-modal--primary vs-c-modal--page vs-u-scroll-y-auto"]');
    }

    get homePageBackground() {
        return cy.get('div[class="vs-l-my-organizations__content"]');
    }

    get loginEmailInput() {
        return cy.get('input[name="email"]');
    }

    get loginPasswordInput() {
        return cy.get('input[name="password"]').first();
    }

    get loginButton() {
        return cy.get('form[class="el-form"]')
            .find('button');
    }

    userLoginWithUI(email, password) {
        cy.intercept({
            method: 'POST',
            url: Cypress.env('api_url')
        }).as('successulLogin');

        this.loginEmailInput.type(email);
        this.loginPasswordInput.type(password);
        this.loginButton.click();

        cy.wait('@successulLogin').then(interception => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
            expect(interception.response.body.user.id).eq(1284);
        })
    }

    validateBackgroundColor(selector, matchingColor) {
        selector.should('have.css', 'background-color', matchingColor);
    }
}

export const loginPage = new Login();