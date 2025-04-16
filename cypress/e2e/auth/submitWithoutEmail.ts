export const submitWithoutEmail = () => {
    it('Should Try to submit the Form without filled input (Email/Username)', () => {
        // Form
        const loginForm = cy.getElementByTestId('login-form', 'form', 2000)
        loginForm.scrollIntoView().should('be.visible')

        // Password (iniziamo inserendo solo la password)
        const inputPassword = cy.getElementByTestId('user-password', 'input', 2000)
        inputPassword
            .scrollIntoView()
            .should('be.visible')
            .clear()
            .type(Cypress.env('CYPRESS_USER_APICART_PASSWORD'))

        // Button - click per tentare il submit
        const formButton = cy.getElementByTestId('login-button', 'button', 2000)
        formButton.scrollIntoView().should('be.visible').click()

        // Error Message for Email should be visible
        const inputEmailErrorMessage = cy.getElementByTestId('user-email-error', 'label', 4000)
        inputEmailErrorMessage
            .scrollIntoView()
            .should('be.visible')

        // Email - ora compiliamo anche l'email ma con un valore errato
        const inputEmail = cy.getElementByTestId('user-email', 'input', 2000)
        inputEmail
            .scrollIntoView()
            .should('be.visible')
            .clear()
            .type(`${Cypress.env('CYPRESS_USER_APICART_NAME')}_wrong`, { force: true })

        // Button - click di nuovo
        formButton.scrollIntoView().should('be.visible').click()

        // Intercept Errors
        cy.intercept('POST', `${Cypress.env('CYPRESS_DUMMYJSON_BASEURL')}/auth/login`, {
            statusCode: 400,
        }).as('wrongCredentials')

        // Submit Action
        formButton.scrollIntoView().should('be.visible').click()

        // Wait 400 status code from the API call
        cy.wait('@wrongCredentials').its('response.statusCode').should('eq', 400)

        // Submit Error Message
        const submitErrorMessage = cy.getElementByTestId('login-error-message', 'span', 2000)
        submitErrorMessage.scrollIntoView().should('be.visible').should('contain.text', 'Request failed with status code 400')
    })
}