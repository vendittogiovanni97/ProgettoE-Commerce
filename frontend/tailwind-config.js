/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Adatta questo percorso al tuo progetto
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Puoi aggiungere qui colori personalizzati
        'accent': '#3B82F6',   // Blu medio
        'warning': '#F97316'   // Arancione
      }
    },
  },
  plugins: [],
}
