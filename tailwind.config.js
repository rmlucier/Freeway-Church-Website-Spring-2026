/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'fc-black': '#1C1C1C',
        'fc-black-soft': '#2A2A2A',
        'fc-teal': '#009B8D',
        'fc-teal-dark': '#007A70',
        'fc-gold': '#B5922A',
        'fc-gold-soft': '#D4B04A',
        'fc-cream': '#F5F1E8',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.18em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
