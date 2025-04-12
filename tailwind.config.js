/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      pre: ['Pretendard',],
      nunito: ['Nunito',], // 기본 sans 계열 폰트
    },
    extend: {
      colors: {
        customTextGray: '#CACACA', // gray톤의 text 색상
        customMain: '#8C52FF', //메인 색상
        customTextBlack: '#1E1E1E', //black톤의 text 색상
        customTextPercent: "#383D54", //퍼센트 text 색상
        customRed: "#EB4335", //Red색상
        customOrange: "#F09752", //Orange색상
        customYellow: "#F7D04D", //Yellow색상
        customGreen: "#B1D854", //Green색상
        customMint: "#70CCB1", //Mint색상
        customSky: "#7BBFF9", //Sky색상
        customBlue: "#4091EE", //Bule색상
        customPurple: "#8B80DD", //Purple색상
        customTower: "#774807", // 탑 기둥 색상
        customNavbar: "#F8F8F8", //navbar 배경색상
        customNavbarText: "#CCCCCC", //navbar 텍스트 색상
        customNavbarStroke: "#F3F3F3", //navbar 선색상
        customEmptyTile: "#EEEEEE", //빈 타일 색상
        gray: {
          70: '#F9F9F9', // gray-70
          125: '#ECEDEF',
        },
      },
      fontSize: {
        'xxs': '0.625rem', // 약 10px
      },
      borderWidth: {
        '0.1': '0.1px', // border-width를 0.5px로 설정
      },
      boxShadow: {
        customShadow: ["0 4px 6px rgba(0,0,0,0.05)", "0 -4px 6px rgba(0,0,0,0.05)"],
        customMainShadow: ["0 4px 6px rgba(140, 82, 255, 0.1)", "0 -4px 6px rgba(140, 82, 255, 0.1)"],
      },      
    },
  },
  plugins: [],
}

