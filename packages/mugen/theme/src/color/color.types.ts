export type HexColor = `#${string}`;
export type RgbColor = { r: number; g: number; b: number };
export type HslColor = { h: number; s: number; l: number };
export type Color = HexColor | RgbColor | HslColor;
