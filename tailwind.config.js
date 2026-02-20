import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                gold: {
                    50: '#fbf8eb',
                    100: '#f5efcd',
                    200: '#ede09b',
                    300: '#e3cb62',
                    400: '#dcb837',
                    500: '#d0aa21', // Base gold
                    600: '#b48618',
                    700: '#906015',
                    800: '#774c17',
                    900: '#643f17',
                    950: '#392109',
                },
            },
        },
    },

    plugins: [forms],
};
