
// ! Disclaimer : I could add other tests to check the
// Product Card Action like increment or decrement the quantity
// But I fixed early this morning so i couln't add more tests



import { submitWithCorrectCredentials } from './auth'
import {
  checkEmptyCart,
  proceedToCheckout,
  purchaseSingleProduct
} from './cart'
import {
  addToCartSingleCard,
  checkSingleProductSection,
  loadProducts
} from './products'

describe('Sikuro FE Interview - Home Product Purchase Test Case', () => {
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

  describe('Product Page - Success Scenarios', () => {
    // Load Products
    loadProducts()

    // Check if the cart is empty
    checkEmptyCart()

    // Check single product section page
    checkSingleProductSection()

    // Should Click to add to cart button
    addToCartSingleCard(1)

    // Should Purchase the Product
    purchaseSingleProduct()

    // Should Proceed to Checkout
    proceedToCheckout()
  })

  describe('Should Emulate a Single Product Purchase and User Re-think', () => {
    // Should Click to add to cart button
    addToCartSingleCard(1)
    // Should Go To Cart and Click to remove the product
    it('Should Go To Cart and Click to remove the product', () => {
      // Get the header element and ensure it's visible
      const headerElement = cy.getElementByTestId('header', 'div', 5000)
      headerElement.scrollIntoView().should('be.visible')
      // Find the cart icon and click on it
      const cartIcon = cy.getElementByTestId('cart-icon', 'a', 5000)
      cartIcon.scrollIntoView().should('be.visible').click()
      // Check if the URL is correct
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/cart`)

      // Get the Main Section
      cy.getElementByTestId(`cart-content`, 'section', 5000)
        .scrollIntoView()
        .should('be.visible')
        .as('singleCartSheet')

      // Then Check for the cart summary
      cy.get('@singleCartSheet')
        .find('[data-testid="cart-summary"]')
        .should('exist')
        .and('be.visible')
        .as('cartSummary')

      // Then Check for the cart checkout
      cy.get('@singleCartSheet')
        .find('[data-testid="cart-checkout"]')
        .should('exist')
        .and('be.visible')
        .as('cartCheckout')

      // Then Click "Remove" button
      cy.getElementByTestId('remove-from-cart', 'button', 5000)
        .should('exist')
        .and('be.visible')
        .click()
    })

    // Then Check if the Box Is now Visible
    checkEmptyCart()
  })

  describe('Should Emulate a Multiple Product Purchase and User Re-think and then Clear All Cart', () => {
    // Should Click on the first one to add to cart button
    addToCartSingleCard(1)
    // Should Click on the second one to add to cart button
    addToCartSingleCard(2)
    // Should Click on the third one to add to cart button
    addToCartSingleCard(3)

    // Should Go To Cart and Click to remove the product
    it('Should Go To Cart and Clear it', () => {
      // Get the header element and ensure it's visible
      const headerElement = cy.getElementByTestId('header', 'div', 5000)
      headerElement.scrollIntoView().should('be.visible')
      // Find the cart icon and click on it
      const cartIcon = cy.getElementByTestId('cart-icon', 'a', 5000)
      cartIcon.scrollIntoView().should('be.visible').click()
      // Check if the URL is correct
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/cart`)

      // Get the Main Section
      cy.getElementByTestId(`cart-content`, 'section', 5000)
        .scrollIntoView()
        .should('be.visible')
        .as('singleCartSheet')

      // Then Check for the cart summary
      cy.get('@singleCartSheet')
        .find('[data-testid="cart-summary"]')
        .should('exist')
        .and('be.visible')
        .as('cartSummary')

      // Then Check for the cart checkout
      cy.get('@singleCartSheet')
        .find('[data-testid="cart-checkout"]')
        .should('exist')
        .and('be.visible')
        .as('cartCheckout')

      // Then Click Remove from cart button
      cy.getElementByTestId('cart-clearer-button', 'button', 5000)
        .should('exist')
        .and('be.visible')
        .click()
    })

    // Then Check if the Box Is now Visible
    checkEmptyCart()
  })
})
