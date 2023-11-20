/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#F39C12',
        secondary: '#DD4B39',
        dark: '#1E1E1E',
      },
    },
  },
  plugins: [],
}

