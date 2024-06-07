import {
  createGlobalTheme,
  createVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import {
  colors,
  darkModifier,
  defaultSurface,
  lightModifier,
} from "../../colors.css";
import { mugen } from "../../layers.css";
import { HexColor, hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "../color";
import { ColorNames, FullSurfaceColors, SurfaceColors } from "./surface.types";

function createSurfaceVars(name: ColorNames, color: HexColor) {
  const light = rgbToHsl(hexToRgb(color));
  light.l += lightModifier;
  const dark = rgbToHsl(hexToRgb(color));
  dark.l -= darkModifier;
  return {
    [name]: color,
    [`${name}Light`]: rgbToHex(hslToRgb(light)),
    [`${name}Dark`]: rgbToHex(hslToRgb(dark)),
    [`${name}Content`]: "#000000",
  } as FullSurfaceColors;
}

export const surfaces = createGlobalTheme(
  ":root",
  Object.entries(colors).reduce((acc, [name, color]) => {
    return { ...acc, ...createSurfaceVars(name as ColorNames, color) };
  }, {} as FullSurfaceColors)
);

const backgroundColorVar = createVar();
const colorVar = createVar();

export const surface = style({
  "@layer": {
    [mugen]: {
      backgroundColor: fallbackVar(
        backgroundColorVar,
        surfaces[defaultSurface]
      ),
      color: fallbackVar(colorVar, surfaces[`${defaultSurface}Content`]),
    },
  },
});

export const surfaceVariants = styleVariants(
  Object.keys(surfaces)
    .filter((name) => !name.includes("Content"))
    .reduce((acc, name) => {
      const prefix = name.replace(/(Light|Dark)$/, "");
      return {
        ...acc,
        [name]: {
          "@layer": {
            [mugen]: {
              vars: {
                [backgroundColorVar]: surfaces[name as ColorNames],
                [colorVar]:
                  surfaces[`${prefix}Content` as keyof FullSurfaceColors],
              },
            },
          },
        },
      };
    }, {})
) as Record<keyof SurfaceColors, HexColor>;
