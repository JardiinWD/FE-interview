export const submitWithCorrectCredentials = () => {
  it('Submit and Log in with correct credentials', () => {
    // Use the custom command to log in via API
    cy.loginViaApi(
      Cypress.env('CYPRESS_USER_STORECART_NAME'),
      Cypress.env('CYPRESS_USER_STORECART_PASSWORD')
    )

    // Check if the login was successful based on the URL
    cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
  })
}
