/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false, // ডার্ক মোড পুরোপুরি বন্ধ
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // শুধু light theme রাখো
  },
};
