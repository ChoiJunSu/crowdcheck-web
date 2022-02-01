module.exports = {
  mode: "jit",
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cc-green": "#2aa090",
      },
      fontFamily: { sans: ["Pretendard Variable"] },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
