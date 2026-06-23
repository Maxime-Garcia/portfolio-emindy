export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cream": "#FFF8F3",
        "sage": "#9DBF8F",
        "rose": "#D4A5A5",
        "stone": "#8B8680",
        "blush": "#F5E6E0",
      },
      fontFamily: {
        "serif": ["Georgia", "serif"],
        "sans": ["Segoe UI", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
