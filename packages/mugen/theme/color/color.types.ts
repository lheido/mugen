export type HexColor = `#${string}`;
export type RgbColor = { r: number; g: number; b: number };
export type HslColor = { h: number; s: number; l: number };
export type Color = HexColor | RgbColor | HslColor;

export function isHexColor(color: Color): color is HexColor {
  return (
    typeof color === "string" && color.startsWith("#") && color.length === 7
  );
}

export function isRgbColor(color: Color): color is RgbColor {
  return !isHexColor(color) && "r" in color;
}

export function isHslColor(color: Color): color is HslColor {
  return !isHexColor(color) && !isRgbColor(color) && "h" in color;
}

export function isColor(color: any): color is Color {
  return isHexColor(color) || isRgbColor(color) || isHslColor(color);
}
