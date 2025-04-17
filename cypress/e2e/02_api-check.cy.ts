import { submitWithCorrectCredentials } from './auth'
import { checkEmptyCart } from './cart'
import { checkSingleProductSection, loadProducts } from './products'

describe('Sikuro FE Interview - API Check', () => {
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

  // Load Products
  loadProducts()

  // Check if the cart is empty
  checkEmptyCart()

  // Check single product section page
  checkSingleProductSection()
})
