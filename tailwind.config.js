
/** @type {import('tailwindcss').Config} */

export default {
  content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  
  // Path to the Tremor module
  "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {},
  },
  plugins: [],
  }

