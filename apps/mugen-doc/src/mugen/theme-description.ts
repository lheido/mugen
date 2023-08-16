import { themeDescriptionDefaults } from "./theme/default";

export const theme = {
  ...themeDescriptionDefaults,
  spacing: {
    ...themeDescriptionDefaults.spacing,
    "2/1": "200%",
  },
  colors: {
    transparent: "transparent",
    current: "currentColor",
    primary: "#8d8dd8",
    "primary-focus": "#7e7ed3",
    accent: "#e7c069",
    secondary: "#6b7280",
    "secondary-focus": "#6b8080",
    page: "#30304F",
    pageTo: "#07090B",
    code: "#1b1b2c",
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
  shadow: {
    ...themeDescriptionDefaults.shadow,
    "neon-primary": "0 0 10px rgb(var(--mugen-rgb-color-primary)), 0 0 32px rgb(var(--mugen-rgb-color-primary) / 0.4)",
    "neon-teal": "0 0 10px rgb(0 255 125), 0 0 32px rgb(0 255 125 / 0.4)",
  },
} as const;
