# Sikuro Group - FE Interview

## Table of Content

- [API Layer](./src/api/README.md) - Documentation of API modules, endpoints and interfaces
- [Components](#components)
  - [Atoms](./src/components/atoms/README.md) - Base UI building blocks
  - [Molecules](./src/components/molecules/README.md) - Composite UI elements
  - [Organisms](./src/components/organisms/README.md) - Complex UI sections
- [Custom Hooks](./src/hooks/README.md) - Reusable logic and component functionality
- [Pages](./src/pages/README.md) - Application views and routes
- [Providers](./src/providers/README.md) - Context providers and dependency injection
- [State Management](./src/store/README.md) - Zustand stores and persistence

## Installation

For installing the necessary dependencies launch the following command

```bash
yarn install && yarn dev
```

The application should now be running at `http://localhost:4005`

### Environments

The application requires a `.env` file in the root directory of the project with the following environment variable:

```bash
VITE_DUMMY_JSON_BASEURL = 'https://dummyjson.com'
```

This environment variable is essential for connecting to the DummyJSON API, which provides all the product data, user authentication, and cart functionality for the application.Without this configuration, the application will not be able to fetch data or perform API operations.

### Scripts

The project includes several npm/yarn scripts to streamline development:

| Script              | Description                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `yarn dev`          | Starts the development server using Vite with hot module replacement. The application will be available at http://localhost:4005. |
| `yarn build`        | Creates a production-ready build. First runs TypeScript compiler for type checking, then uses Vite to bundle and optimize assets. |
| `yarn preview`      | Serves the production build locally for preview and testing before deployment.                                                    |
| `yarn prettier`     | Formats all source code files according to the project's style guidelines using Prettier.                                         |
| `yarn open:cypress` | Opens the Cypress test runner UI for interactive end-to-end testing.                                                              |
| `yarn run:cypress`  | Runs Cypress tests in headless mode, suitable for CI environments or quick test execution.                                        |

To run any of these scripts, use:

```bash
yarn <script-name>
```

### Tests

The application includes comprehensive end-to-end tests using Cypress. These tests simulate real user interactions and verify that all core functionality works correctly across different flows.

#### Running Tests

To run the tests in interactive mode open your terminal and then run this command:

```bash
yarn open:cypress
```

To run tests in headless mode (CI environments):

```bash
yarn run:cypress
```

#### Test Structure

Tests are organized into numbered flow files and supporting modules in feature-specific folders (`auth/`, `cart/`, `products/`).

| Test File                      | Description                                                                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `01_authentication-flow.cy.ts` | Tests all authentication scenarios including successful login, validation errors when omitting required fields, and handling invalid credentials      |
| `02_api-check-flow.cy.ts`      | Verifies API integration by checking product data loading, API responses, and correct display of fetched content                                      |
| `03_product_page-flow.cy.ts`   | Tests the product detail page functionality including error handling for invalid products, product information display, and add-to-cart functionality |
| `04_home_product-flow.cy.ts`   | Tests product interactions from the home page including product listing, adding single and multiple products to cart, and cart management             |
| `05_logout-flow.cy.ts`         | Tests the logout flow including modal confirmation, successful logout redirection, and handling error scenarios                                       |

Each test file uses modular test components from the feature folders:

- `auth/` - Authentication-related test modules (login with various credential scenarios)
- `cart/` - Shopping cart test modules (empty cart, adding products, checkout process)
- `products/` - Product-related test modules (listing, details, adding to cart)

## Disclaimer

Spero le uniche note che troverete in italiano nel mio elaborato 😂

### DummyJSON Api - Cart Action

**Nota importante sulla gestione del carrello:**

Il servizio DummyJSON è stato utilizzato come backend per questa applicazione, ma presenta alcune limitazioni importanti da considerare:

#### Limitazioni delle API

Mentre DummyJSON fornisce API funzionanti in modalità GET per recuperare dati relativi a prodotti, utenti e carrelli, **non supporta completamente le operazioni di modifica (POST/PUT/DELETE) per la gestione del carrello**. In particolare:

- Le chiamate POST per la creazione di nuovi carrelli
- Le chiamate PUT per l'aggiornamento dei carrelli esistenti
- Le chiamate DELETE per la rimozione di prodotti dal carrello

restituiscono risposte simulate ma non modificano effettivamente alcun dato sul server.

#### Soluzione implementata

Per soddisfare i requisiti del progetto che richiedono una gestione completa del carrello, è stata implementata una soluzione ibrida:

1. **Utilizzo di Zustand** per la gestione dello stato locale del carrello
2. **Simulazione delle risposte API** mantenendo la struttura e i formati di risposta previsti da DummyJSON
3. **Persistenza locale** dei dati del carrello specifica per utente attraverso localStorage

Questa soluzione permette di mantenere un'interfaccia coerente con quella che sarebbe stata utilizzata con API completamente funzionanti.

#### Implicazioni

Questo approccio significa che:

- I carrelli creati sono visibili solo all'utente corrente e persistono solo sul dispositivo utilizzato.
- Le modifiche al carrello non sono sincronizzate tra dispositivi diversi.
- In un'implementazione di produzione, queste funzionalità dovrebbero essere sostituite con chiamate API reali a un backend completo.

Questa implementazione è stata realizzata come compromesso per soddisfare i requisiti di progetto, mantenendo comunque un'architettura che rispecchia le migliori pratiche di sviluppo front-end.

#### Flusso di Autenticazione e Gestione Carrelli

##### Scenari di interazione col carrello

1. **Utenti con carrelli pre-esistenti nelle API**

   - Questi utenti possono navigare nell'applicazione e visualizzare i prodotti.
   - Possono tentare di aggiungere prodotti al carrello tramite l'interfaccia.
   - **Limitazione importante**: Non vedranno i nuovi prodotti aggiunti nel loro carrello, poiché l'API `getCarts` restituisce solo i carrelli pre-esistenti nel sistema DummyJSON.
   - Le operazioni di Zustand non possono modificare i dati restituiti dall'API.

2. **Utenti senza carrelli pre-esistenti**
   - Questi utenti vedranno la creazione di un nuovo carrello tramite Zustand.
   - Potranno gestire completamente questo carrello (aggiungere prodotti, modificare quantità, rimuovere prodotti).
   - I dati del carrello verranno persistiti localmente attraverso il sistema di storage di Zustand.
   - L'esperienza sarà completamente funzionale all'interno dell'applicazione.

Questa differenza di comportamento è dovuta alle limitazioni delle API DummyJSON e alla necessità di mantenere una simulazione coerente dell'esperienza di e-commerce, pur rispettando i vincoli tecnici del backend utilizzato.

Comunque sia, nella `public/docs` folder trovate gli screen della documentazione di dummyJSON che indicano appunto questo comportamento

#### Utenze

Dopo tale premessa, di seguito fornisco credenziali necessarie per accedere ai due flussi

##### Utente con carrello API

```
username: oliviaw
password: oliviawpass
```

##### Utente con carrello gestito in Zustand

```
username: lilyb
password: lilybpass
```

---

### DummyJSON Api - Images

Durante l'esperienza e il giro per analizzare il flusso, potreste notare che le immagini che riceviamo tramite API sono effettivamente troppo lente a renderizzare. Questo é dovuto al fatto che, tramite l'api di DummyJSON, recuperiamo immagini in `.png` dal peso minimo di `1.5 - 1.8mb`. In tutto ciò ho provato ad implementare tramite `LazyImage` il caricamento delle immagini con un `Spinner` di Fallback ma senza ottenere il risultato sperato. In una condizione ideale le immagini che riceviamo tramite API dovrebbero essere in formato `.webp` in modo da alleggerirle quanto più possibile.

---

### DummyJSON Api - Environments e Dati Sensibili

Potreste appunto aver notato che in questo file readme ho fornito la env necessaria per dummyJSON e le credenziali d'accesso. **Ovviamente non sono solito lasciare variabili d'ambiente o credenziali in un readme** a disposizione di tutti, ho quindi pensato di fornirvele per evitarvi lo sbatti di cercarle nella documentazione ufficiale 😂

Nel caso lascio qui i link utili di Dummy JSON per credenziali e altro per fare un giro con eventuali utenti differenti con carrello API o meno.

- [Authentication](https://dummyjson.com/docs/auth) -> Link autenticazione di DummyJSON
- [Users](https://dummyjson.com/docs/users#users-all) -> Link Utenti di DummyJSON
- [User1-Credential](https://dummyjson.com/user/1) -> Dati Necessari di Utente 1.
