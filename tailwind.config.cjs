/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        accent: "#7C3AED",
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      }
    },
  },
  plugins: [],
}

