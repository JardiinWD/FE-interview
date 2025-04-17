import { submitWithCorrectCredentials } from './auth'

describe('Sikuro FE Interview - Logout Flow', () => {
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

  describe('Logout - Error Scenarios', () => {
    it('Should Land on Wrong Page and display an error box, Then return at home', () => {
      // Go to the Wrong Page
      cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/user_info`)
      // Get the Box Error wrapper
      cy.getElementByTestId(`error-page`, 'section', 5000)
        .should('be.visible')
        .as('errorBoxWrapper')
      // Get the box Child values
      cy.get('@errorBoxWrapper')
        .find('h3')
        .should('be.visible')
        .and('have.text', 'Ops! Something went wrong')
      cy.get('@errorBoxWrapper').find('p').should('be.visible')
      cy.get('@errorBoxWrapper')
        .find('button')
        .should('be.visible')
        .and('have.text', 'Try Again')
        .click()
      // Then the url should be the homepage
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
    })

    it('Should Land on The correct page without clicking on User Pill, so expect another error box', () => {
      // Go to the Wrong Page
      cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/user-info`)
      // Get the Box Error wrapper
      cy.getElementByTestId(`error-landing`, 'div', 5000)
        .should('be.visible')
        .as('errorBoxWrapper')
      // Get the box Child values
      cy.get('@errorBoxWrapper')
        .find('h3')
        .should('be.visible')
        .and('have.text', "This user doesn't have any data!")
      cy.get('@errorBoxWrapper').find('p').should('be.visible')
      cy.get('@errorBoxWrapper')
        .find('button')
        .should('be.visible')
        .and('have.text', 'Try Again')
        .click()
      // Then the url should be the homepage
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
    })
  })

  // Success scenarios
  describe('Logout - Success Scenarios', () => {
    it('Should Click and be redirect on User Info Page', () => {
      cy.getElementByTestId(`user-pill`, 'a', 5000).should('be.visible').click()
      // Land on User Info Page
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/user-info`)
      // Find the user Box wrapper for information
      cy.getElementByTestId(`user-info`, 'section', 5000)
        .should('be.visible')
        .as('userInfoWrapper')

      // Then the User Info Wrapper has to side -> The left one with button and pro pic and the right one with the user information
      cy.get('@userInfoWrapper')
        .find('[data-testid="user-info-left-side"]')
        .should('be.visible')
        .as('userInfoLeftSide')
      cy.get('@userInfoWrapper')
        .find('[data-testid="user-info-right-side"]')
        .should('be.visible')
        .as('userInfoRightSide')

      // Check the left side
      cy.get('@userInfoLeftSide')
        .find('[data-testid="user-image"]')
        .should('be.visible')
      cy.get('@userInfoLeftSide')
        .find('[data-testid="logout-button"]')
        .should('be.visible')
        .should('have.text', 'Logout')
        .click()

      // Then a modal will appear
      cy.getElementByTestId(`logout-modal`, 'div', 5000)
        .should('be.visible')
        .as('logoutModalWrapper')

      // Check the modal
      cy.get('@logoutModalWrapper')
        .find('[data-testid="company-logo"]')
        .should('be.visible')
        .should('exist')
      cy.get('@logoutModalWrapper')
        .find('[data-testid="logout-modal-title"]')
        .should('be.visible')
        .should('have.text', 'Logout')
      cy.get('@logoutModalWrapper')
        .find('[data-testid="logout-modal-text"]')
        .should('be.visible')
        .should('have.text', 'Are you sure you want to logout?')
      cy.get('@logoutModalWrapper')
        .find('[data-testid="logout-modal-buttons"]')
        .should('be.visible')
        .as('logoutModalButtonsWrapper')

      // Check the buttons inside the modal
      cy.get('@logoutModalButtonsWrapper')
        .find('[data-testid="logout-button"]')
        .should('be.visible')
        .should('have.text', 'Confirm')
      cy.get('@logoutModalButtonsWrapper')
        .find('[data-testid="logout-modal-dismiss-button"]')
        .should('be.visible')
        .should('have.text', 'Dismiss')
        .click()
      // Check if the modal is closed
      cy.get('@logoutModalWrapper').should('not.exist')
      // Check if the user is still on the same page
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/user-info`)
      // Check if the user info wrapper is still visible
      cy.get('@userInfoWrapper').should('be.visible')

      // Then Logout again and check if the user is redirected to the login page
      cy.get('@userInfoLeftSide')
        .find('[data-testid="logout-button"]')
        .should('be.visible')
        .should('have.text', 'Logout')
        .click()

      // Then a modal will appear
      cy.getElementByTestId(`logout-modal`, 'div', 5000)
        .should('be.visible')
        .as('logoutModalWrapper')

      // Check the modal and finally logout
      cy.get('@logoutModalWrapper')
        .find('[data-testid="company-logo"]')
        .should('be.visible')
        .should('exist')
      cy.get('@logoutModalWrapper')
        .find('[data-testid="logout-modal-title"]')
        .should('be.visible')
        .should('have.text', 'Logout')
      cy.get('@logoutModalWrapper')
        .find('[data-testid="logout-modal-text"]')
        .should('be.visible')
        .should('have.text', 'Are you sure you want to logout?')
      cy.get('@logoutModalWrapper')
        .find('[data-testid="logout-modal-buttons"]')
        .should('be.visible')
        .as('logoutModalButtonsWrapper')
      cy.get('@logoutModalButtonsWrapper')
        .find('[data-testid="logout-button"]')
        .should('be.visible')
        .should('have.text', 'Confirm')
        .click()

      // Check if the user is redirected to the login page
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/login`)
      // Check if the login form is visible
      cy.getElementByTestId(`login-form`, 'form', 5000)
        .should('be.visible')
        .as('loginFormWrapper')
    })
  })
})
