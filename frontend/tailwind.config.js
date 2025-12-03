/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#202B30",
        text: "#FDFFFC",
        accent: "#A7E97F",
      },
    },
  },
  plugins: [],
};
