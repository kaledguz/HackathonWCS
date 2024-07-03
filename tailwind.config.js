/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(125,24,177,1) 0%, rgba(172,17,240,1) 39%, rgba(146,86,245,1) 62%, rgba(164,0,255,1) 100%)',
      },
    },
  },
  plugins: [],
}