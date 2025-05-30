/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('getElementByTestId', (testId, elementAs, timeoutTime) => {
  cy.get(
    `[data-testid="${testId}"]`,
    timeoutTime ? { timeout: timeoutTime } : {}
  ).as(elementAs ? elementAs : '')
})

Cypress.Commands.add('getElementById', (elementId, elementAs, timeoutTime) => {
  cy.get(`#${elementId}`, timeoutTime ? { timeout: timeoutTime } : {}).as(
    elementAs
  )
})

Cypress.Commands.add(
  'getElementByClassName',
  (className, elementAs, timeoutTime) => {
    cy.get(`${className}`, timeoutTime ? { timeout: timeoutTime } : {}).as(
      elementAs
    )
  }
)

/* LANDING LOGIC */
Cypress.Commands.add('firstExecution', (urlToVisit, shouldClearEverything) => {
  // URL to Visit
  cy.visit(urlToVisit)
  // Check if cookies and local storage should be cleared
  if (shouldClearEverything) {
    cy.clearCookies()
    cy.clearLocalStorage()
  }
})

// Comando personalizzato per eseguire il login tramite API
Cypress.Commands.add('loginViaApi', (username, password) => {
  // Esegui una vera richiesta POST all'API di autenticazione
  cy.request({
    method: 'POST',
    url: `${Cypress.env('CYPRESS_DUMMYJSON_BASEURL')}/auth/login`,
    body: {
      username,
      password
    },
    failOnStatusCode: false // In case of a non-200 response
  }).then((response) => {
    // Check the Log
    cy.log('API Response:', JSON.stringify(response.body))

    if (response.status === 200 && response.body) {
      // Save the token in local storage
      cy.window().then((win) => {
        // SaVE the token in local storage
        if (response.body.token)
          win.localStorage.setItem('authToken', response.body.token)
        else if (response.body.accessToken)
          win.localStorage.setItem('authToken', response.body.accessToken)

        // Save the userId in Zustand store
        if (win.useAuthStore && win.useAuthStore.setState) {
          win.useAuthStore.setState({
            userId: response.body.id,
            allUserData: response.body,
            expirationDate: new Date(Date.now() + 86400000)
          })
        }
      })

      // Visit the main page
      cy.visit('/')
    } else {
      // Handle the error
      cy.log('Login failed:', response.status, response.body)
    }
  })
})

// Check Key and Value in Additional Info
Cypress.Commands.add(
  'additionalInfoCheckKeyValue',
  (
    dataTestIdKey: string,
    dataTestIdValue: string,
    dynamicValue: string | number,
    dataWrapper: string
  ) => {
    // Check if the key exists
    cy.get(dataWrapper)
      .find(`[data-testid="label-${dataTestIdKey}"]`)
      .should('exist')
      .and('be.visible')

    // Check values
    cy.get(dataWrapper)
      .find(`[data-testid="info-${dataTestIdValue}"]`)
      .should('exist')
      .and('be.visible')
      .and('contain.text', dynamicValue)
  }
)
