export const submitWithCorrectCredentials = () => {
  it('Submit and Log in with correct credentials', () => {
    // Utilizza direttamente il comando personalizzato invece della compilazione manuale del form
    cy.loginViaApi(
      Cypress.env('CYPRESS_USER_APICART_NAME'),
      Cypress.env('CYPRESS_USER_APICART_PASSWORD')
    )

    // Verifica che siamo stati reindirizzati alla home page
    cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
  })
}
