import { submitWithCorrectCredentials, submitWithoutEmail, submitWithoutPassword, submitWithWrongCredentials } from "./auth"

describe('Sikuro FE Interview - Authentication Flow', () => {
  // Gruppo per i test di errore
  describe('Login Error Scenarios', () => {
    beforeEach('Landing on Login Page', () => {
      cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/login`)
    })

    // Try to submit the Form without filled input (Password)
    submitWithoutPassword()

    // Try to submit the Form without filled input (Email)
    submitWithoutEmail()

    // Try to submit the Form with wrong credentials
    submitWithWrongCredentials()
  })

  // Gruppo separato per il test di successo
  describe('Successful Login', () => {
    before('Landing on Login Page', () => {
      cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/login`)
    })

    // Try to submit the Form with correct credentials
    submitWithCorrectCredentials()

    // Importante: Non avere un beforeEach qui, così il test non torna alla login page
    after('Stay on homepage', () => {
      // Verifica che siamo ancora nella homepage
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
    })
  })
})