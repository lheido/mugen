import {
  createGlobalTheme,
  createVar,
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
  light.l = Math.min(light.l + lightModifier, 100);
  const lightHex = rgbToHex(hslToRgb(light));
  const dark = rgbToHsl(hexToRgb(color));
  dark.l = Math.max(dark.l - darkModifier, 0);
  const darkHex = rgbToHex(hslToRgb(dark));
  // TODO: calculate the content color according to the darkest and lightest color.
  return {
    [name]: color,
    [`${name}Light`]: lightHex,
    [`${name}Dark`]: darkHex,
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
      vars: {
        [backgroundColorVar]: surfaces[defaultSurface],
        [colorVar]: surfaces[`${defaultSurface}Content`],
      },
      backgroundColor: backgroundColorVar,
      color: colorVar,
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
