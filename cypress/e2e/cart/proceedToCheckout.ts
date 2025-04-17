export const proceedToCheckout = () => {
  it('Should Leave the Page and Go to Checkout', () => {
    // Check if the URL is correct
    cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/checkout`)

    // Get the header element and ensure it's visible
    const headerElement = cy.getElementByTestId('header', 'div', 5000)
    headerElement.scrollIntoView().should('be.visible')

    // Get the cart icon and ensure it's visible
    const cartIcon = cy.getElementByTestId('cart-icon', 'a', 5000)
    cartIcon.scrollIntoView().should('be.visible')

    // Get the checkout box and ensure it's visible
    cy.getElementByTestId('checkout-box', 'div', 5000)
      .scrollIntoView()
      .should('be.visible')
      .as('checkoutBox')

    // Check the checkout box properties
    cy.get('@checkoutBox')
      .find('[data-testid="checkout-heading"]')
      .should('exist')
      .and('be.visible')

    // Check the message properties
    cy.get('@checkoutBox')
      .find('[data-testid="checkout-message"]')
      .should('exist')
      .and('be.visible')

    // Check the button properties
    cy.get('@checkoutBox')
      .find('[data-testid="go-back-shopping"]')
      .should('exist')
      .and('be.visible')
      .click()

    // Check if the URL is correct
    cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
  })
}
