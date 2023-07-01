import { themeDescriptionDefaults } from "mugen/theme";

export const theme = {
  ...themeDescriptionDefaults,
  colors: {
    transparent: "transparent",
    current: "currentColor",
    primary: "#8d8dd8",
    "primary-focus": "#7e7ed3",
    secondary: "#6b7280",
    "secondary-focus": "#6b8080",
    page: "#30304F",
    pageTo: "#07090B",
  },
  themes: {
    light: {
      colors: {
        primary: "#8cbaf1",
        "primary-focus": "#6ea6e9",
        secondary: "#97a0b3",
        "secondary-focus": "#868e9f",
        page: "#30304F",
        pageTo: "#efefef",
      },
    },
  },
  sizes: {
    "1": "16px",
    "2": "32px",
    "3": "64px",
    "4": "128px",
    "5": "200px",
    screen: "100vh",
    safeScreen: "100svh",
    "2screen": "200svh",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};
