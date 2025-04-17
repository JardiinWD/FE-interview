import {
  submitWithCorrectCredentials,
  submitWithoutEmail,
  submitWithoutPassword,
  submitWithWrongCredentials
} from './auth'

describe('Sikuro FE Interview - Authentication Flow', () => {
  // Error scenarios
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

  // Success scenarios
  describe('Successful Login', () => {
    before('Landing on Login Page', () => {
      cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/login`)
    })

    // Try to submit the Form with correct credentials
    submitWithCorrectCredentials()

    // Stay on Homepage
    after('Stay on homepage', () => {
      // Check if the URL is correct
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
    })
  })
})
