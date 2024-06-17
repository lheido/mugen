import { Color, HexColor, HslColor, RgbColor } from "./color.types";

export function hexToRgb(hex: HexColor): RgbColor {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

export function rgbToHex(rgb: RgbColor): HexColor {
  const toHex = (component: number) => {
    const hex = component.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function rgbToHsl(rgb: RgbColor): HslColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h *= 360;
  s *= 100;
  l *= 100;

  return { h, s, l };
}

export function hslToRgb(hsl: HslColor): RgbColor {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return { r, g, b };
}

/**
 * Convert RGB component to linear space.
 * @param {number} value - The RGB component (0-255).
 * @returns {number} - The linear space value.
 */
export function rgbCmpToLinear(value: number): number {
  value /= 255;
  return value <= 0.03928
    ? value / 12.92
    : Math.pow((value + 0.055) / 1.055, 2.4);
}

export function rgbToLuminance(color: RgbColor): number {
  const linearR = rgbCmpToLinear(color.r);
  const linearG = rgbCmpToLinear(color.g);
  const linearB = rgbCmpToLinear(color.b);
  return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
}

export function toRgb(color: Color): RgbColor {
  if (typeof color === "string") {
    return hexToRgb(color);
  } else if ("h" in color) {
    return hslToRgb(color);
  }
  return color;
}

export function toHsl(color: Color): HslColor {
  if (typeof color === "string") {
    return rgbToHsl(hexToRgb(color));
  } else if ("r" in color) {
    return rgbToHsl(color);
  }
  return color;
}

export function toHex(color: Color): HexColor {
  if (typeof color === "string") {
    return color;
  } else if ("r" in color) {
    return rgbToHex(color);
  }
  return rgbToHex(hslToRgb(color));
}

export function toCSSVarValue(color: Color): string {
  if (typeof color === "string") {
    return color;
  } else if ("r" in color) {
    return `${color.r}, ${color.g}, ${color.b}`;
  }
  return `${color.h}, ${color.s}%, ${color.l}%`;
}
