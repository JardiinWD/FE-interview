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
    failOnStatusCode: false // Per gestire le risposte di errore
  }).then((response) => {
    // Log della risposta completa per debug
    cy.log('API Response:', JSON.stringify(response.body))

    if (response.status === 200 && response.body) {
      // Salva il token nel localStorage
      cy.window().then((win) => {
        // Salva il token (potrebbe essere in diversi formati)
        if (response.body.token) {
          win.localStorage.setItem('authToken', response.body.token)
        } else if (response.body.accessToken) {
          win.localStorage.setItem('authToken', response.body.accessToken)
        }

        // Salva i dati utente nello store (se usi Zustand)
        if (win.useAuthStore && win.useAuthStore.setState) {
          win.useAuthStore.setState({
            userId: response.body.id,
            allUserData: response.body,
            expirationDate: new Date(Date.now() + 86400000)
          })
        }
      })

      // Visita la home page dopo il login
      cy.visit('/')
    } else {
      // Gestisci il caso di errore
      cy.log('Login failed:', response.status, response.body)
    }
  })
})
