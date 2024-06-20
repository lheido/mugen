import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
} from "@vanilla-extract/css";
import "./reset.css";
import { Color, getBestContentColor, toCSSVarValue, toHsl } from "./src/color";
import { FullSurfaceColors } from "./src/surface/surface.types";
export * from "./layers.css";

export type Colors = {
  base: Color;
  primary: Color;
  secondary: Color;
  error: Color;
  warning: Color;
};

export const colors: Colors = {
  base: "#FFFFFF",
  primary: "#4289F0",
  secondary: "#34A853",
  error: "#EA4335",
  warning: "#FBBC05",
};

export const darkColors: Colors = {
  base: "#232323",
  primary: "#4289F0",
  secondary: "#34A853",
  error: "#EA4335",
  warning: "#FBBC05",
};

export const roundedValues = {
  none: "0",
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.5rem",
  xl: "1rem",
  "2xl": "2rem",
  "3xl": "4rem",
  full: "9999px",
} as const;

export const spacingValues = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  13: "3.25rem",
  14: "3.5rem",
  15: "3.75rem",
  16: "4rem",
} as const;

export const surfaces = createThemeContract(
  Object.keys(colors).reduce((acc, name) => {
    return {
      ...acc,
      [name]: "",
      [`${name}-content`]: "",
    };
  }, {} as FullSurfaceColors<Colors>)
);

export const spacings = createThemeContract(
  Object.keys(spacingValues).reduce((acc, name) => {
    return {
      ...acc,
      [name]: "",
    };
  }, {} as Record<keyof typeof spacingValues, string>)
);

export const defaultTheme = createGlobalTheme(
  ":root",
  surfaces,
  Object.keys(colors).reduce((acc, name) => {
    const color = toCSSVarValue(toHsl(colors[name as keyof Colors]));
    const contentColor = toCSSVarValue(
      toHsl(getBestContentColor(colors[name as keyof Colors]))
    );
    return {
      ...acc,
      [name]: color,
      [`${name}-content`]: contentColor,
    };
  }, {} as FullSurfaceColors<Colors>)
);
export const defaultSpacing = createGlobalTheme(
  ":root",
  spacings,
  Object.keys(spacings).reduce((acc, name) => {
    return {
      ...acc,
      [name]: spacingValues[name as unknown as keyof typeof spacingValues],
    };
  }, {} as Record<keyof typeof spacings, any>)
);

export const darkTheme = createTheme(
  surfaces,
  Object.keys(colors).reduce((acc, name) => {
    const color = toCSSVarValue(toHsl(darkColors[name as keyof Colors]));
    const contentColor = toCSSVarValue(
      toHsl(getBestContentColor(darkColors[name as keyof Colors]))
    );
    return {
      ...acc,
      [name]: color,
      [`${name}-content`]: contentColor,
    };
  }, {} as FullSurfaceColors<Colors>)
);
