import { submitWithCorrectCredentials } from './auth'
import { checkSingleProductSection, loadProducts } from './products'
import { checkEmptyCart } from './cart'

describe('Sikuro FE Interview - Product to Cart', () => {
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

  // Check if the cart is empty before add a new product
  checkEmptyCart()

  // Then go to The Product Page (check if the product page is loaded)
  checkSingleProductSection()

  // Now check Labels and Reviews in a proper way (and add to cart)
  it('Should Check product Single Product Details', () => {
    // Get the First box where there are the product details (and scroll into view)
    const singleProductSheet = cy.getElementByTestId(
      'single-product-1',
      'div',
      5000
    )
    singleProductSheet
      .scrollIntoView()
      .should('be.visible')
      .as('singleProductSheet')

    // Check product Details
    cy.get('@singleProductSheet')
      .invoke('attr', 'data-testid')
      .then((testId) => {
        // Extract the product ID from the test ID
        const productId = testId?.replace('single-product-', '')

        // Verify each sub-component exists using the product ID
        cy.getElementByTestId(`single-product-${productId}-image`, 'div', 5000)
          .should('exist')
          .and('be.visible')
        cy.getElementByTestId(`single-product-${productId}-body`, 'div', 5000)
          .should('exist')
          .and('be.visible')
          .as('productBody')

        // Now verify other properties of the body (like title, description, price and rating)
        cy.get('@productBody').find('h4').should('exist').and('be.visible') // Title

        // Rating
        cy.get('@productBody')
          .find('[data-testid="product-rating"]')
          .should('exist')
          .and('be.visible')
          .as('productRating')
        // Rating Value
        cy.get('@productRating').find('span').should('exist').and('be.visible')
        // Stars Rating
        cy.get('@productRating')
          .find('[data-testid="stars-rating"]')
          .should('exist')
          .and('be.visible')

        // Description
        cy.get('@productBody')
          .find('[data-testid="product-description"]')
          .should('exist')
          .and('be.visible')

        // Cart Action and Price

        // Product Additional Information
        cy.get('@productBody')
          .find('[data-testid="product-additional-info"]')
          .should('exist')
          .and('be.visible')
          .as('productAdditionalInfo')
        cy.get('@productAdditionalInfo')
          .find('[data-testid="label-Minimum order quantity"]')
          .should('exist')
          .and('be.visible') // Minimum Order Quantity
        cy.get('@productAdditionalInfo')
          .find('[data-testid="label-Category"]')
          .should('exist')
          .and('be.visible') // Minimum Order Quantity
        cy.get('@productAdditionalInfo')
          .find('[data-testid="label-Brand"]')
          .should('exist')
          .and('be.visible') // Minimum Order Quantity
        cy.get('@productAdditionalInfo')
          .find('[data-testid="label-Dimensions"]')
          .should('exist')
          .and('be.visible') // Minimum Order Quantity
        cy.get('@productAdditionalInfo')
          .find('[data-testid="label-Return policy"]')
          .should('exist')
          .and('be.visible') // Minimum Order Quantity
        cy.get('@productAdditionalInfo')
          .find('[data-testid="label-Availability"]')
          .should('exist')
          .and('be.visible') // Minimum Order Quantity
        cy.get('@productAdditionalInfo')
          .find('[data-testid="label-Stock Quantity"]')
          .should('exist')
          .and('be.visible') // Minimum Order Quantity
        cy.get('@productAdditionalInfo')
          .find('[data-testid="label-Shipping Information"]')
          .should('exist')
          .and('be.visible') // Minimum Order Quantity
        cy.get('@productAdditionalInfo')
          .find('[data-testid="label-SKU"]')
          .should('exist')
          .and('be.visible') // Minimum Order Quantity
      })
  })
})
