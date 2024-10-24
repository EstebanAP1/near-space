/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        primary: '#2B3C9D',
      },
      backgroundColor: {
        primary: '#2B3C9D',
      },
      fontFamily: {
        nasa: ['"Nasalization"', 'system-ui', '-apple-system'],
      },
    },
  },
  plugins: [],
}
