module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: "#050B16",
          navbar: "#0A0F1E",
          card: "#0F1628",
        },
        neon: {
          blue: "#00E7F9",
        },
        text: {
          primary: "#E6F1FF",
          secondary: "#8797B2",
        }
      },
      boxShadow: {
        'neon-blue': '0 0 12px rgba(0, 231, 249, 0.25)',
      }
    }

  },
  plugins: [],
}
