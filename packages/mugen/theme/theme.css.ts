import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
} from "@vanilla-extract/css";
import "./reset.css";
import {
  HexColor,
  getBestContentColor,
  toCSSVarValue,
  toHsl,
} from "./src/color";
import { FullSurfaceColors } from "./src/surface/surface.types";
import data from "./theme.json";

export * from "./layers.css";
export const { breakpoints } = data;

export type ColorKeys = keyof typeof data.colors;

export const surfaces = createThemeContract(
  Object.keys(data.colors).reduce((acc, name) => {
    return {
      ...acc,
      [name]: "",
      [`${name}-content`]: "",
    };
  }, {} as FullSurfaceColors<typeof data.colors>)
);

export const spacings = createThemeContract(
  Object.keys(data.spacings).reduce((acc, name) => {
    return {
      ...acc,
      [name]: "",
    };
  }, {} as Record<keyof typeof data.spacings, string>)
);

export const defaultTheme = createGlobalTheme(
  ":root",
  surfaces,
  Object.keys(data.colors).reduce((acc, name) => {
    const value = data.colors[name as keyof typeof data.colors] as HexColor;
    const color = toCSSVarValue(toHsl(value));
    const contentColor = toCSSVarValue(toHsl(getBestContentColor(value)));
    return {
      ...acc,
      [name]: color,
      [`${name}-content`]: contentColor,
    };
  }, {} as FullSurfaceColors<typeof data.colors>)
);

export const defaultSpacing = createGlobalTheme(
  ":root",
  spacings,
  Object.keys(spacings).reduce((acc, name) => {
    const value = data.spacings[name as keyof typeof data.spacings];
    return {
      ...acc,
      [name]: value,
    };
  }, {} as Record<keyof typeof spacings, any>)
);

export const darkTheme = createTheme(
  surfaces,
  Object.keys(data.colors).reduce((acc, name) => {
    const value = data.darkColors[
      name as keyof typeof data.darkColors
    ] as HexColor;
    const color = toCSSVarValue(toHsl(value));
    const contentColor = toCSSVarValue(toHsl(getBestContentColor(value)));
    return {
      ...acc,
      [name]: color,
      [`${name}-content`]: contentColor,
    };
  }, {} as FullSurfaceColors<typeof data.colors>)
);
