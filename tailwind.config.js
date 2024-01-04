/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "orange": "#F7411B",
        "red": "#F7411B",
        "blue": "#040627",
        "black": "#000000",
        "gray": "#9192A5",
        "white": "#FFFFFF",
      },
    },
  },
  plugins: [
      require("daisyui"),
      require("@tailwindcss/forms"),
  ],
}

