module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['Comfortaa', 'cursive'],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "emerald",
  },
};

