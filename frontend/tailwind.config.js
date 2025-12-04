/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Verifique se este caminho está correto para seu projeto
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Deve incluir .tsx!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}