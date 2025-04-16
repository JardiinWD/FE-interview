export { }

interface AuthStore {
    setState: (state: {
        userId: number | null;
        allUserData: any | null;
        expirationDate: Date | null;
    }) => void;
    // Aggiungi altre proprietà/metodi dello store se necessario
}


declare global {
    namespace Cypress {
        interface Chainable {
            getElementByTestId(testId: string, elementAs?: string, timeoutTime?: number): Chainable
            getElementById(elementId: string, elementAs: string, timeoutTime?: number): Chainable
            getElementByClassName(className: string, elementAs: string, timeoutTime?: number): Chainable
            firstExecution(urlToVisit: string, shouldClearEverything: boolean): Chainable
            loginAction(urlEnv: string, email: string, password: string): Chainable
            loginViaApi(username: string, password: string): void;
        }
    }

    // Estendi l'interfaccia AUTWindow per includere useAuthStore
    interface AUTWindow {
        useAuthStore: AuthStore;
    }

    // Estendi anche l'interfaccia Window globale
    interface Window {
        useAuthStore: AuthStore;
    }
}

