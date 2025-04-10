import { TAppConfig } from "@/config/types";


export const appConfig: TAppConfig = {
    appName: "Sikuro Group - FE Interview",
    appDescription: "Sikuro Group - FE Interview Application is a showcase for frontend development skills and techniques",
    appDeployedUrl: "https://myapp.com", // --> To be updated after deployment on Netlify
    appAuthors: [
        { name: "Alessandro Pecorilla", url: "https://www.linkedin.com/in/alessandro-pecorilla/" },
    ],
    appVersion: "1.0.0",
    defaultLanguage: "en",
    supportedLanguages: ["en", "it", "de"],
    helmets: {
        home: {
            title: "Home",
            description: "Discover our fantastic products and services",
            keywords: ["home", "products", "cart", "services"],
        },
        cart: {
            title: "Cart",
            description: "Your shopping cart",
            keywords: ["cart", "checkout", "products"],
        },
        error: {
            title: "Error",
            description: "An error occurred",
            keywords: ["error", "not found",],
        }
    },
}