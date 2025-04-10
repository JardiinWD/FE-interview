// --> Possible Application Locales
export type TLocales = 'en' | 'it' | 'de';

// --> Application Metadata and Configuration
export type TAppConfig = {
    appName: string;
    appDescription: string;
    appDeployedUrl: string;
    appAuthors: { name: string; url: string }[];
    appVersion: string;
    defaultLanguage: TLocales;
    supportedLanguages: string[];
    helmets: {
        [key: string]: {
            title: string;
            description: string;
            keywords: string[];
        };
    };
};