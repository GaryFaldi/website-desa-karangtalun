// src/theme.js

const theme = {
  colors: {
    // Brand
    primary: "#96D539",
    primaryLight: "#E8F7DD",
    primaryDark: "#6FAE2D",

    // Neutral
    white: "#FFFFFF",
    background: "#F8FAF8",
    surface: "#FFFFFF",

    // Text
    textPrimary: "#151B1F",
    textSecondary: "#313A48",
    textMuted: "#6B7280",

    // Border
    border: "#E5E7EB",

    // Status
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },

  typography: {
    fontFamily: "'Poppins', sans-serif",

    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
      hero: "48px",
    },

    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    section: "96px",
  },

  shadow: {
    sm: "0 2px 6px rgba(0,0,0,.08)",
    md: "0 4px 12px rgba(0,0,0,.12)",
    lg: "0 10px 24px rgba(0,0,0,.15)",
  },

  transition: {
    fast: "0.2s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
  },

  layout: {
    maxWidth: "1200px",
    navbarHeight: "72px",
    footerHeight: "320px",
  },

  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
    wide: "1440px",
  },
};

export default theme;