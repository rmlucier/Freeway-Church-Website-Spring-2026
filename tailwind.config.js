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
        // Month of Breakthrough campaign palette (Sept 2026)
        'brk-black': '#0A0A0A',
        'brk-cream': '#F2F2F2',
        'brk-teal': '#6FA8A2',
        'brk-teal-muted': '#8FA8A6',
        'brk-gray': '#A0A0A0',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        // Campaign-specific — Anton for hammer headlines, Bebas for kickers
        anton: ['Anton', 'Impact', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'Impact', 'sans-serif'],
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
