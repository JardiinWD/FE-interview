import { appConfig } from '@/config/appConfig';

/**
 * @description Retrieves the meta tag data based on the current route.
 * @param {string} pathname - The pathname of the current route.
 * @returns the meta tag data for the current route.
 */
export const retrieveHelmetData = (pathname: string) => {
    // Rimuovi eventuali slash iniziali o finali e ottieni il primo segmento
    const path = pathname === '/' ? 'homepage' : pathname.split('/').filter((path) => path !== '')[0];

    // Recupera i dati del meta tag in base al path
    const helmetData = appConfig.helmets[path] || appConfig.helmets.default;

    return helmetData;
};
