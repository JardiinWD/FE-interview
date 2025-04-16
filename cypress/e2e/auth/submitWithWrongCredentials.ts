export const submitWithWrongCredentials = () => {
    it('Should fail login with incorrect credentials', () => {
        // Form
        const loginForm = cy.getElementByTestId('login-form', 'form', 2000)
        loginForm.scrollIntoView().should('be.visible')

        // Email/Username - inserisci un username errato
        const inputEmail = cy.getElementByTestId('user-email', 'input', 2000)
        inputEmail
            .scrollIntoView()
            .should('be.visible')
            .clear()
            .type('wrong_username')

        // Password - inserisci una password errata
        const inputPassword = cy.getElementByTestId('user-password', 'input', 2000)
        inputPassword
            .scrollIntoView()
            .should('be.visible')
            .clear()
            .type('wrong_password')

        // Intercept Errors - prepara intercettazione per la risposta di errore
        cy.intercept('POST', `${Cypress.env('CYPRESS_DUMMYJSON_BASEURL')}/auth/login`, {
            statusCode: 401,
            body: {
                message: 'Invalid credentials'
            }
        }).as('loginFailed')

        // Button - click per tentare il submit
        const formButton = cy.getElementByTestId('login-button', 'button', 2000)
        formButton.scrollIntoView().should('be.visible').click()

        // Wait for the intercepted request
        cy.wait('@loginFailed').its('response.statusCode').should('eq', 401)

        // Verify error message is displayed
        const submitErrorMessage = cy.getElementByTestId('login-error-message', 'span', 4000)
        submitErrorMessage
            .scrollIntoView()
            .should('be.visible')
            .should('contain.text', 'Request failed with status code 401')

        // Bonus: verifica che l'utente rimanga nella pagina di login
        cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/login`)
    })
}