import { Theme } from "mugen/theme/style-sheet";

export const AppTheme = Theme({
  spacing: {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "1/4": "25%",
  },
  colors: {
    primary: "#0070f3",
    "primary-focus": "#7070f3",
    "primary-content": "#fff",
    secondary: "#6b7280",
    "secondary-content": "#fff",
  },
  sizes: {
    "1": "16px",
    "2": "32px",
    "3": "64px",
    "4": "128px",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
});
