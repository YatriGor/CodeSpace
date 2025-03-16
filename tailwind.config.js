/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        typing: "typing 4s steps(40, end) 1s 1 normal both, blink-cursor 0.75s step-end infinite",
        "fade-in": "fadeIn 1s ease-in-out",
        "fade-in-up": "fadeInUp 1s ease-in-out",
      },
      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "blink-cursor": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-hero-patterns')
  ],
};
