import { submitWithCorrectCredentials } from './auth'
import { checkSingleProductSection, loadProducts } from './products'
import {
  checkEmptyCart,
  proceedToCheckout,
  purchaseSingleProduct
} from './cart'

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

  describe('Product Page - Error Scenarios', () => {
    // SCENARIO 1
    it('Should Land on The Product Page from URL, so expect an error box', () => {
      // Go to the Wrong Page
      cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/product/_wrong_id_`)
      // Get the Box Error wrapper
      cy.getElementByTestId(`product-error-landing`, 'div', 5000)
        .should('be.visible')
        .as('errorBoxWrapper')
      // Get the box Child values
      cy.get('@errorBoxWrapper')
        .find('h3')
        .should('be.visible')
        .and('have.text', 'This product is not available!')
      cy.get('@errorBoxWrapper').find('p').should('be.visible')
      cy.get('@errorBoxWrapper')
        .find('button')
        .should('be.visible')
        .and('have.text', 'Start Shopping')
        .click()
      // Then the url should be the homepage
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
    })

    // SCENARIO 2
    it('Should Land on The Product Page from URL, Without Clicking the card', () => {
      // Go to the Wrong Page
      cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/product/1`)
      // Get the Box Error wrapper
      cy.getElementByTestId(`product-error-landing`, 'div', 5000)
        .should('be.visible')
        .as('errorBoxWrapper')
      // Get the box Child values
      cy.get('@errorBoxWrapper')
        .find('h3')
        .should('be.visible')
        .and('have.text', 'This product is not available!')
      cy.get('@errorBoxWrapper').find('p').should('be.visible')
      cy.get('@errorBoxWrapper')
        .find('button')
        .should('be.visible')
        .and('have.text', 'Start Shopping')
        .click()
      // Then the url should be the homepage
      cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
    })
  })

  describe('Product Page - Success Scenarios', () => {
    // Load Products
    loadProducts()

    // Check if the cart is empty before add a new product
    checkEmptyCart()

    // Then go to The Product Page (check if the product page is loaded)
    checkSingleProductSection()

    it('Should Check product Single Product Details', () => {
      // Define the default product ID
      const defaultProductId = 1
      // Go to the Product Page
      cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/product/${defaultProductId}`)

      // Intercept the API call
      cy.intercept(
        'GET',
        `${Cypress.env('CYPRESS_DUMMYJSON_BASEURL')}/products/${defaultProductId}`
      ).as('getProductById')

      // Verify we're on the correct URL
      cy.url().should(
        'include',
        `${Cypress.env('CYPRESS_BASE_URL')}/product/${defaultProductId}`
      )

      // Reload to trigger the API call
      cy.reload()

      // Wait for API call to complete
      cy.wait('@getProductById').then((interception) => {
        // Verify API response
        expect(interception.response?.statusCode).to.eq(200)
        expect(interception.response?.body).to.exist
        expect(interception.response?.body.id).to.eq(Number(defaultProductId))

        // Store API response data for UI verification
        const productData = interception.response?.body

        // Get the product container
        const singleProductSheet = cy.getElementByTestId(
          `single-product-${defaultProductId}`,
          'div',
          5000
        )

        // Scroll into view and check visibility
        singleProductSheet
          .scrollIntoView()
          .should('be.visible')
          .as('singleProductSheet')

        // Check product details against API data
        cy.get('@singleProductSheet')
          .invoke('attr', 'data-testid')
          .then((testId) => {
            // Extract the product ID
            const productId = testId?.replace('single-product-', '')

            // Verify sub-components
            cy.getElementByTestId(
              `single-product-${productId}-image`,
              'div',
              5000
            )
              .should('exist')
              .and('be.visible')

            // Get the product body
            cy.getElementByTestId(
              `single-product-${productId}-body`,
              'div',
              5000
            )
              .should('exist')
              .and('be.visible')
              .as('productBody')

            // Verify title matches API data
            cy.get('@productBody')
              .find('h4')
              .should('exist')
              .and('be.visible')
              .and('contain.text', productData.title) // Title should match API data

            // Rating
            cy.get('@productBody')
              .find('[data-testid="product-rating"]')
              .should('exist')
              .and('be.visible')
              .as('productRating')

            // Rating value should match API data
            cy.get('@productRating')
              .find('span')
              .should('exist')
              .and('be.visible')
              .and('contain.text', Math.round(productData.rating))

            // Stars Rating
            cy.get('@productRating')
              .find('[data-testid="stars-rating"]')
              .should('exist')
              .and('be.visible')

            // Description should match API data
            cy.get('@productBody')
              .find('[data-testid="product-description"]')
              .should('exist')
              .and('be.visible')
              .and('contain.text', productData.description)

            // Product Additional Information
            cy.get('@productBody')
              .find('[data-testid="product-additional-info"]')
              .should('exist')
              .and('be.visible')
              .as('productAdditionalInfo')

            // Check Minimum Order Quantity
            cy.additionalInfoCheckKeyValue(
              'Minimum order quantity',
              'Minimum order quantity',
              productData.minimumOrderQuantity,
              '@productAdditionalInfo'
            )

            // Check Category
            cy.additionalInfoCheckKeyValue(
              'Category',
              'Category',
              productData.category,
              '@productAdditionalInfo'
            )

            // Full Dimensions
            cy.additionalInfoCheckKeyValue(
              'Dimensions',
              'Dimensions',
              `${productData.dimensions.width} x ${productData.dimensions.height} x ${productData.dimensions.depth}`,
              '@productAdditionalInfo'
            )

            // Return Policy
            cy.additionalInfoCheckKeyValue(
              'Return policy',
              'Return policy',
              productData.returnPolicy,
              '@productAdditionalInfo'
            )

            // Availability
            cy.additionalInfoCheckKeyValue(
              'Availability',
              'Availability',
              productData.availabilityStatus,
              '@productAdditionalInfo'
            )

            // Stock Quantity
            cy.additionalInfoCheckKeyValue(
              'Stock Quantity',
              'Stock Quantity',
              productData.stock,
              '@productAdditionalInfo'
            )

            // Shipping Information
            cy.additionalInfoCheckKeyValue(
              'Shipping Information',
              'Shipping Information',
              productData.shippingInformation,
              '@productAdditionalInfo'
            )

            // SKU
            cy.additionalInfoCheckKeyValue(
              'SKU',
              'SKU',
              productData.sku,
              '@productAdditionalInfo'
            )

            // Cart Action
            cy.getElementByTestId('quantity-counter', 'div', 5000)
              .should('exist')
              .and('be.visible')
              .as('quantityCounter')

            // ! Non li clicco per ora, in quanto questo prodotto ha raggiunto il suo stock,
            // Increment Button
            cy.get('@quantityCounter')
              .find('button[data-testid="increment-button"]')
              .should('exist')
              .and('be.visible')

            // Input Field
            cy.get('@quantityCounter')
              .find('input[data-testid="quantity-input"]')
              .should('exist')
              .and('be.visible')
              .and('have.value', productData.stock)

            // Decrement Button
            cy.get('@quantityCounter')
              .find('button[data-testid="decrement-button"]')
              .should('exist')
              .and('be.visible')

            // Add to Cart Button
            cy.get('@productBody')
              .find('button[data-testid="add-to-cart"]')
              .should('exist')
              .and('be.visible')
              .and('contain.text', 'Add to Cart')
              .click()
          })
      })
    })

    // It should then purchase a single product
    purchaseSingleProduct()

    // Proceed to Checkout
    proceedToCheckout()
  })
})
