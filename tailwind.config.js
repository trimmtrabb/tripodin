export default {
  content: [
    "./index.html",
    "./*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
        },
        accent: {
          blue: "#2563eb",
          purple: "#7c3aed",
          green: "#10b981",
        },
      },
    },
  },
  plugins: [],
};

