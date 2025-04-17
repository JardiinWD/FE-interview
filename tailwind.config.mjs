/** @type {import('tailwindcss').Config} */

export default {
    content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                xs: '375px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            colors: {
                /* PRIMARY WHITE */
                primary_white_100: 'var(--primary_white_100)',
                primary_white_200: 'var(--primary_white_200)',
                /* PRIMARY BLUE */
                primary_yellow_100: 'var(--primary_yellow_100)',
                primary_yellow_200: 'var(--primary_yellow_200)',
                primary_yellow_400: 'var(--primary_yellow_400)',
                primary_yellow_500: 'var(--primary_yellow_500)',
                primary_yellow_600: 'var(--primary_yellow_600)',
                /* PRIMARY GRAY */
                primary_gray_100: 'var(--primary_gray_100)',
                primary_gray_200: 'var(--primary_gray_200)',
                primary_gray_300: 'var(--primary_gray_300)',
                primary_gray_400: 'var(--primary_gray_400)',
                /* PRIMARY BLACK */
                primary_black_500: 'var(--primary_black_500)',
                primary_black_600: 'var(--primary_black_600)',
                primary_black_700: 'var(--primary_black_700)',
            }
        }
    },
    plugins: [],
    darkMode: 'class',
}