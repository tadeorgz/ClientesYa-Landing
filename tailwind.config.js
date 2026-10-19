/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'cy-dark': '#090b09', 'cy-panel': '#121510', 'cy-panel-light': '#191d16',
                'cy-line': '#2a3024', 'cy-lime': '#c6fa5f', 'cy-white': '#f2f3ed', 'cy-text-sec': '#a5ad9b',
            },
            fontFamily: { sans: ['Manrope', 'system-ui', 'sans-serif'] },
            backgroundImage: { 'cy-glow': 'radial-gradient(circle at 50% 0%, rgba(198,250,95,0.1) 0%, transparent 60%)' },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shine': 'shine 1.5s ease-in-out infinite',
            },
            keyframes: {
                shine: {
                    '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
                    '100%': { transform: 'translateX(200%) skewX(-12deg)' },
                },
            },
        },
    },
    plugins: [],
}
