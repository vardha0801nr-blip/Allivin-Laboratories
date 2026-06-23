export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B2E4A",
          blue: "#1769AA",
          sky: "#DDF1FF",
          teal: "#0FA3B1",
          ink: "#102033"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 70px rgba(15, 35, 55, 0.14)"
      }
    }
  },
  plugins: []
};
