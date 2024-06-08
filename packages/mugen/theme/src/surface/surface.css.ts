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
import {
  HexColor,
  RgbColor,
  getContrastRatio,
  hexToRgb,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from "../color";
import { ColorNames, FullSurfaceColors, SurfaceColors } from "./surface.types";

function getBestContentColor(base: RgbColor, light: RgbColor, dark: RgbColor) {
  const baseContentColors = [hexToRgb("#000000"), hexToRgb("#ffffff")]; // black, white
  const bases = [base, light, dark];
  let startColorRatio = 0;
  let startColor!: RgbColor;
  let selectedBaseColor!: RgbColor;

  for (let color of baseContentColors) {
    for (let base of bases) {
      let tmp = getContrastRatio(color, base);
      if (tmp > startColorRatio) {
        startColorRatio = tmp;
        startColor = color;
        selectedBaseColor = base;
      }
    }
  }
  if (startColorRatio > 7) {
    const startLuminance = rgbToHsl(startColor).l;
    return _getBestContentColor(
      selectedBaseColor,
      startColor,
      startColor,
      startLuminance
    );
  } else {
    return startColor;
  }
}

function _getBestContentColor(
  base: RgbColor,
  startColor: RgbColor,
  previousColor: RgbColor,
  startLuminance: number
) {
  const ratio = getContrastRatio(base, startColor);
  if (ratio <= 7) {
    return previousColor;
  }
  const nextColor = rgbToHsl(startColor);
  const baseHsl = rgbToHsl(base);
  nextColor.h = baseHsl.h;
  nextColor.s = baseHsl.s;
  nextColor.l =
    startLuminance === 100
      ? Math.max(nextColor.l - 1, 0)
      : Math.min(nextColor.l + 1, 100);
  return _getBestContentColor(
    base,
    hslToRgb(nextColor),
    startColor,
    startLuminance
  );
}

function createSurfaceVars(name: ColorNames, color: HexColor) {
  const baseRgb = hexToRgb(color);
  const light = rgbToHsl(baseRgb);
  light.l = Math.min(light.l + lightModifier, 100);
  const ligthRgb = hslToRgb(light);
  const lightHex = rgbToHex(ligthRgb);
  const dark = rgbToHsl(hexToRgb(color));
  dark.l = Math.max(dark.l - darkModifier, 0);
  const darkRgb = hslToRgb(dark);
  const darkHex = rgbToHex(darkRgb);
  const content = rgbToHex(getBestContentColor(baseRgb, ligthRgb, darkRgb));
  return {
    [name]: color,
    [`${name}Light`]: lightHex,
    [`${name}Dark`]: darkHex,
    [`${name}Content`]: content,
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
