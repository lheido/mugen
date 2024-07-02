import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
  styleVariants,
} from "@vanilla-extract/css";
import data from "../../theme.json";
import { HexColor, getBestContentColor, toCSSVarValue, toHsl } from "../color";
import { mugen } from "./layers.css";

export type FullSurfaceColors<T> = {
  [K in keyof T & string as `${K}${"" | "-content"}`]: string;
};

export type SurfaceColors = keyof typeof data.colors;

export const surfaces = createThemeContract(
  Object.keys(data.colors).reduce((acc, name) => {
    return {
      ...acc,
      [name]: "",
      [`${name}-content`]: "",
    };
  }, {} as FullSurfaceColors<typeof data.colors>)
);

export const surfaceVariants = styleVariants(
  Object.keys(data.colors).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        "@layer": {
          [mugen]: {
            backgroundColor: `hsl(${surfaces[name as keyof typeof surfaces]})`,
            color: `hsl(${
              surfaces[`${name}-content` as keyof typeof surfaces]
            })`,
          },
        },
      },
    };
  }, {} as Record<keyof typeof data.colors, any>)
);

export const defaultSurface = createGlobalTheme(
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
