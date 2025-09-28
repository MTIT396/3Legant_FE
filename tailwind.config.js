/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        secondary: "#6C7275",
        third: "#121212",
        saleColor: "#343839",
        saleBgColor: "#F3F5F7",
        darkGrey: "#605F5F",
        blue: "#377DFF",
        green: "#38CB89",
        red: "#FF5630",
        darkRed: "#D70018",
        grey: "#E8ECEF",
        neutral_1: "#141718",
        neutral_2: "#F3F5F7",
        cardColor: "#F3F5F7",
        lightGrey: "#B1B5C3",
        formColor: "#CBCBCB",
        neutral_3: "#353945",
      },
    },

    fontFamily: {
      primary: "Poppins, sans-serif",
      secondary: "Sirivennela, sans-serif",
      third: "Open Sans, sans-serif",
      fourth: "Roboto, sans-serif",
      inter: "Inter, sans-serif",
    },
    container: {
      padding: {
        DEFAULT: "16px",
      },
    },
    screen: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
  },
  plugins: [],
};
