import { DEFAULT_LANG, DEFAULT_SUPPORTED_LANGUAGE } from '@/utils/constants'

// --> Possible Application Locales
export type TLocales = 'en' | 'it' | 'de'

// --> Application Helmets type
export type THelmet = {
  [key: string]: {
    title: string
    description: string
    keywords: string[]
    route?: string
  }
}

// --> Application Metadata and Configuration
export type TAppConfig = {
  appName: string
  appDescription: string
  appDeployedUrl: string
  appAuthors: { name: string; url: string }[]
  appVersion: string
  defaultLanguage: TLocales
  supportedLanguages: string[]
  helmets: THelmet
}

export const appConfig: TAppConfig = {
  appName: 'Sikuro Group - FE Interview',
  appDescription:
    'Sikuro Group - FE Interview Application is a showcase for frontend development skills and techniques',
  appDeployedUrl: 'https://myapp.com', // --> To be updated after deployment on Netlify
  appAuthors: [
    {
      name: 'Alessandro Pecorilla',
      url: 'https://www.linkedin.com/in/alessandro-pecorilla/'
    }
  ],
  appVersion: '1.0.0',
  defaultLanguage: DEFAULT_LANG,
  supportedLanguages: DEFAULT_SUPPORTED_LANGUAGE,
  helmets: {
    default: {
      title: 'Home',
      description: 'Discover our fantastic products and services',
      keywords: ['home', 'products', 'cart', 'services'],
      route: '/'
    },
    home: {
      title: 'Home',
      description: 'Discover our fantastic products and services',
      keywords: ['home', 'products', 'cart', 'services'],
      route: '/'
    },
    product: {
      title: 'Single Product',
      description: 'Discover the properties of our product',
      keywords: ['product', 'details', 'cart'],
      route: '/product/:id'
    },
    'user-info': {
      title: `Your Information`,
      description: 'Discover the user information',
      keywords: ['user', 'authenticated-user', 'auth'],
      route: '/user-info'
    },
    login: {
      title: 'Login',
      description: 'Discover Our fantastic Products and Services! Log in now!',
      keywords: ['login', 'authenticatication', 'auth'],
      route: '/login'
    },
    cart: {
      title: 'Cart',
      description: 'Your shopping cart',
      keywords: ['cart', 'checkout', 'products'],
      route: '/cart'
    },
    checkout: {
      title: 'Checkout',
      description: 'Checkout',
      keywords: ['checkout', 'carts', 'products'],
      route: '/checkout'
    },
    error: {
      title: 'Error',
      description: 'An error occurred',
      keywords: ['error', 'not found']
    }
  }
}
