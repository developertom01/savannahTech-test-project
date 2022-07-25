const colors = require('tailwindcss/colors');
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        primaryColor: '#000000',
        colors: {
            ...colors,
        },
        extend: {},
    },
    plugins: [],
};
