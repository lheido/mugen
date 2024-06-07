export const colors = {
  base: "#FFFFFF",
  primary: "#4289F0",
  secondary: "#34A853",
  error: "#EA4335",
  warning: "#FBBC05",
} as const;

export const defaultSurface: keyof typeof colors = "base";

export const lightModifier = 5;
export const darkModifier = 5;
