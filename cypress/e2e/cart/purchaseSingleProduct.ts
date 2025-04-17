export const purchaseSingleProduct = () => {
  it('Should Purchase a Product', () => {
    // Get the header element and ensure it's visible
    const headerElement = cy.getElementByTestId('header', 'div', 5000)
    headerElement.scrollIntoView().should('be.visible')
    // Find the cart icon and click on it
    const cartIcon = cy.getElementByTestId('cart-icon', 'a', 5000)
    cartIcon.scrollIntoView().should('be.visible').click()
    // Check if the URL is correct
    cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/cart`)
    // Now the page should be divided in 2 different sections, CartSummary and CartCheckout

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

    // Check all Cart Summary properties
    cy.getElementByTestId(`cart-summary-product-image`, 'img', 5000)
      .should('exist')
      .and('be.visible')
    cy.getElementByTestId(`cart-summary-title`, 'h6', 5000)
      .should('exist')
      .and('be.visible')
    cy.getElementByTestId(`remove-from-cart`, 'button', 5000)
      .should('exist')
      .and('be.visible')
    cy.getElementByTestId('quantity-counter', 'div', 5000)
      .should('exist')
      .and('be.visible')
      .as('quantityCounter')
    cy.getElementByTestId('cart-clearer-button', 'button', 5000)
      .should('exist')
      .and('be.visible')

    // Check all Cart Checkout properties

    // Total Amount
    cy.get('@cartCheckout')
      .find('[data-testid="total-amount-label"]')
      .should('exist')
      .and('be.visible')
    cy.get('@cartCheckout')
      .find('[data-testid="total-amount-property"]')
      .should('exist')
      .and('be.visible')

    // Discount Percentage
    cy.get('@cartCheckout')
      .find('[data-testid="discount-percentage-label"]')
      .should('exist')
      .and('be.visible')
    cy.get('@cartCheckout')
      .find('[data-testid="discount-percentage-property"]')
      .should('exist')
      .and('be.visible')

    // Discounted Price
    cy.get('@cartCheckout')
      .find('[data-testid="discounted-price-label"]')
      .should('exist')
      .and('be.visible')
    cy.get('@cartCheckout')
      .find('[data-testid="discounted-price-property"]')
      .should('exist')
      .and('be.visible')

    // Checkout Button
    cy.get('@cartCheckout')
      .find('[data-testid="checkout-button"]')
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Checkout')
      .click()
  })
}
