import { submitWithCorrectCredentials } from './auth'

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
})
