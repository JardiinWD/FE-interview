export const checkSingleProductSection = () => {
  it('Should load product details when clicking on a product card', () => {
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

    // Get the product ID from the first card's data-testid attribute and click on Redirect
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
          .as('cardFooter')
        // Click on the product card to navigate to the product details page
        cy.get('@cardFooter')
          .find('a')
          .should('exist')
          .and('be.visible')
          .and('have.attr', 'href')
          .should('include', `/product/${productId}`)
        cy.get('@cardFooter').find('a').click()

        // Once Arrived to the Product Page, intercept the Api call
        cy.url().should(
          'include',
          `${Cypress.env('CYPRESS_BASE_URL')}/product/${productId}`
        )

        // Intercept the product details API call with the dynamic product ID
        cy.intercept(
          'GET',
          `${Cypress.env('CYPRESS_DUMMYJSON_BASEURL')}/products/${productId}`
        ).as('getProductById')

        // Wait for the products API call to complete
        cy.wait('@getProductById').then((interception) => {
          // Verify successful response
          expect(interception.response?.statusCode).to.eq(200)
          // Verify that products array exists and is not empty (and the product ID is correct)
          expect(interception.response?.body).to.exist
          expect(interception.response?.body.id).to.eq(Number(productId))
        })
        // Product Details (in this test Reviews Box, Recommended and Main Box should at least be visible)
        cy.getElementByTestId(`single-product-${productId}`, 'div', 5000)
          .scrollIntoView()
          .should('exist')
          .and('be.visible')
        cy.getElementByTestId(`reviews-carousel-${productId}`, 'div', 5000)
          .scrollIntoView()
          .should('exist')
          .and('be.visible')
        cy.getElementByTestId(`recommended-products-list`, 'section', 5000)
          .scrollIntoView()
          .should('exist')
          .and('be.visible')
      })
  })
}
