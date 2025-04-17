export const getSingleCard = (cardId: number) => {
  it(`Should Get a Card with Id -> ${cardId}`, () => {
    // Should Check the actual URL
    cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/`)

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
    const productCard = cy.getElementByTestId(
      `product-card-${cardId}`,
      'div',
      5000
    )
    productCard.scrollIntoView().should('be.visible').as('productCard')

    cy.get('@productCard')
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
          .as('productCardFooter')
        // Click the "Add to Cart" button
        cy.get('@productCardFooter')
          .find('button')
          .contains('Add to Cart')
          .click()
      })
  })
}
