export const submitWithoutPassword = () => {
    it('Should Try to submit the Form without filled input (Password)', () => {
        // Form
        const loginForm = cy.getElementByTestId('login-form', 'form', 2000)
        loginForm.scrollIntoView().should('be.visible')
        // Email
        const inputEmail = cy.getElementByTestId('user-email', 'input', 2000)
        inputEmail
            .scrollIntoView()
            .should('be.visible')
            .clear()
            .type(Cypress.env('CYPRESS_USER_APICART_NAME'))
        // Button
        const formButton = cy.getElementByTestId('login-button', 'button', 2000)
        formButton.scrollIntoView().should('be.visible').click()
        // Error Message for Password should be visible
        const inputPasswordErrorMessage = cy.getElementByTestId('user-password-error', 'label', 4000)
        inputPasswordErrorMessage
            .scrollIntoView()
            .should('be.visible')

        // Password
        const inputPassword = cy.getElementByTestId('user-password', 'input', 2000)
        inputPassword
            .scrollIntoView()
            .should('be.visible')
            .clear()
            .type(`${Cypress.env('CYPRESS_USER_APICART_PASSWORD')}_`, { force: true })

        // Button
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
