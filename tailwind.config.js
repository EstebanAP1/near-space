/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        primary: 'rgb(50, 45, 187, 0.3)',
      },
      backgroundColor: {
        primary: 'rgb(50, 45, 187, 0.23)',
      },
    },
  },
  plugins: [],
}
