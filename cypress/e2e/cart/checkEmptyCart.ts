export const checkEmptyCart = () => {
  it('Should show empty cart when no products are added', () => {
    // Get the header element and ensure it's visible
    const headerElement = cy.getElementByTestId('header', 'div', 5000)
    headerElement.scrollIntoView().should('be.visible')

    // Find the cart icon and click on it
    const cartIcon = cy.getElementByTestId('cart-icon', 'a', 5000)
    cartIcon.scrollIntoView().should('be.visible').click()

    // Access the window object to get the userId from Zustand store
    cy.window().then((win) => {
      // Access Zustand store state using ts-ignore to bypass type checking
      // @ts-ignore - Ignore type checking to access the store's getState method
      const authState = (win.useAuthStore as any).getState
        ? (win.useAuthStore as any).getState()
        : {}
      const userId = authState.userId || authState.allUserData?.id

      // Ensure userId exists
      expect(userId).to.exist

      // Intercept the cart API call with the dynamic user ID
      cy.intercept(
        'GET',
        `${Cypress.env('CYPRESS_DUMMYJSON_BASEURL')}/carts/user/${userId}`
      ).as('getUserCart')

      // Navigate to cart page
      cy.visit('/cart')

      // Wait for the API call to complete
      cy.wait('@getUserCart').then((interception) => {
        // Verify successful response
        expect(interception.response?.statusCode).to.eq(200)

        // Check cart data structure in response
        if (interception.response?.body.carts) {
          // If response contains an array of carts
          expect(interception.response?.body.carts).to.be.an('array')
        } else {
          // If response is a single cart object
          expect(interception.response?.body).to.have.property('id')
          expect(interception.response?.body.userId).to.eq(userId)
        }
      })
    })

    // Then if Everything is fine check for emptyCard
    const emptyCartCard = cy.getElementByTestId('cart-error-state', 'div', 5000)
    emptyCartCard.scrollIntoView().should('be.visible').as('errorState')

    cy.get('@errorState')
      .invoke('attr', 'data-testid')
      .then(() => {
        // Now verify each sub-component exists using the product ID
        cy.getElementByTestId(`cart-error-state-card`, 'div', 5000)
          .should('exist')
          .and('be.visible')
          .as('errorStateCard')
        // Verify Headings, dev Message and Button (and click it)
        cy.get('@errorStateCard')
          .find('h3')
          .should('exist')
          .and('be.visible')
          .and('have.text', 'Your cart is empty!')
        cy.get('@errorStateCard')
          .find('button')
          .should('exist')
          .and('be.visible')
          .and('have.text', 'Start Shopping')
          .click()
      })

    // Check if the URL is correct
    cy.url().should('include', `${Cypress.env('CYPRESS_BASE_URL')}/`)
  })
}
