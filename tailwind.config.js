/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      pre: ['Pretendard'],
    },
    extend: {
      colors: {
        customTextGray: '#CACACA', // gray톤의 text 색상
      },
    },
  },
  plugins: [],
}

