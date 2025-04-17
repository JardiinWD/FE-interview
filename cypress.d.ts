export { }

interface AuthStore {
    setState: (state: {
        userId: number | null;
        allUserData: any | null;
        expirationDate: Date | null;
    }) => void;
    // Add other properties and methods as needed
}

interface CartStore {
    getState: () => {
        cartData: ICart[] | null;
    };
    setState: (state: {
        clearCart: () => void;
    }) => void;
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
            additionalInfoCheckKeyValue(
                dataTestIdKey: string,
                dataTestIdValue: string,
                dynamicValue: string | number,
                dataWrapper: string
            ): Chainable<Element>;
        }
    }

    // Extends the AUTWindow interface to include the useAuthStore property
    interface AUTWindow {
        useAuthStore: AuthStore;
        useCartStore: CartStore;
    }

    // Extends the Window interface to include the useAuthStore property
    interface Window {
        useAuthStore: AuthStore;
        useCartStore: CartStore;
    }
}

