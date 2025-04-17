/**
 * Exports a function that tests product loading on the homepage
 * Verifies API response and UI elements
 */
export const loadProducts = () => {
  it('Should load products data on home page', () => {
    // Intercept the products API call
    cy.intercept(
      'GET',
      `${Cypress.env('CYPRESS_DUMMYJSON_BASEURL')}/products*`
    ).as('getProducts')

    // Wait for the products API call to complete
    cy.wait('@getProducts').then((interception) => {
      // Verify successful response
      expect(interception.response?.statusCode).to.eq(200)
      // Verify that products array exists and is not empty
      expect(interception.response?.body.products).to.exist
      expect(interception.response?.body.products.length).to.be.greaterThan(0)
    })

    // Verify products list is rendered in the UI
    const productList = cy.getElementByTestId('products-list', 'div', 5000)
    productList.scrollIntoView().should('be.visible')

    // Verify at least one product card is displayed
    const firstProductCard = cy.getElementByTestId(
      'product-card-1',
      'div',
      5000
    )
    firstProductCard
      .scrollIntoView()
      .should('be.visible')
      .as('firstProductCard')

    // Get the product ID from the first card's data-testid attribute
    cy.get('@firstProductCard')
      .invoke('attr', 'data-testid')
      .then((testId) => {
        // Extract the product ID from the test ID
        const productId = testId?.replace('product-card-', '')
        // Now verify each sub-component exists using the product ID
        cy.getElementByTestId(`product-card-${productId}-image`, 'div', 5000)
          .should('exist')
          .and('be.visible')
        cy.getElementByTestId(`product-card-${productId}-body`, 'div', 5000)
          .should('exist')
          .and('be.visible')
        cy.getElementByTestId(`product-card-${productId}-footer`, 'div', 5000)
          .should('exist')
          .and('be.visible')
      })
  })
}
