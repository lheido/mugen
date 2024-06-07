import { describe, expect, it } from "vitest";
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "./converter";

const colors = {
  white: {
    rgb: { r: 255, g: 255, b: 255 },
    hex: "#ffffff",
    hsl: { h: 0, s: 0, l: 100 },
  },
  black: {
    rgb: { r: 0, g: 0, b: 0 },
    hex: "#000000",
    hsl: { h: 0, s: 0, l: 0 },
  },
  red: {
    rgb: { r: 255, g: 0, b: 0 },
    hex: "#ff0000",
    hsl: { h: 0, s: 100, l: 50 },
  },
  blue: {
    rgb: { r: 0, g: 0, b: 255 },
    hex: "#0000ff",
    hsl: { h: 240, s: 100, l: 50 },
  },
  green: {
    rgb: { r: 0, g: 255, b: 0 },
    hex: "#00ff00",
    hsl: { h: 120, s: 100, l: 50 },
  },
} as const;

describe("color convertion", () => {
  Object.entries(colors).forEach(([name, values]) => {
    it(`should convert ${name} using rgbToHex`, () => {
      expect(rgbToHex(values.rgb)).toEqual(values.hex);
    });
    it(`should convert ${name} using hexToRgb`, () => {
      expect(hexToRgb(values.hex)).toEqual(values.rgb);
    });
    it(`should convert ${name} using rgbToHsl`, () => {
      expect(rgbToHsl(values.rgb)).toEqual(values.hsl);
    });
    it(`should convert ${name} using hslToRgb`, () => {
      expect(hslToRgb(values.hsl)).toEqual(values.rgb);
    });
  });
});
