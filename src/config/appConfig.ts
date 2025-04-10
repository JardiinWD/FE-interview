import { DEFAULT_LANG, DEFAULT_SUPPORTED_LANGUAGE } from '@/utils/constants'

// --> Possible Application Locales
export type TLocales = 'en' | 'it' | 'de'

// --> Application Metadata and Configuration
export type TAppConfig = {
  appName: string
  appDescription: string
  appDeployedUrl: string
  appAuthors: { name: string; url: string }[]
  appVersion: string
  defaultLanguage: TLocales
  supportedLanguages: string[]
  helmets: {
    [key: string]: {
      title: string
      description: string
      keywords: string[]
      route?: string
    }
  }
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
    cart: {
      title: 'Cart',
      description: 'Your shopping cart',
      keywords: ['cart', 'checkout', 'products'],
      route: '/cart'
    },
    error: {
      title: 'Error',
      description: 'An error occurred',
      keywords: ['error', 'not found']
    }
  }
}
