/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./ui/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {},
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/container-queries")],
  }