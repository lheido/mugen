import { RgbColor } from "../color.types";
import { rgbToLuminance } from "../converter";

export const WCAG_BEST_RATIO = 7;

export function getContrastRatio(color1: RgbColor, color2: RgbColor): number {
  const luminance1 = rgbToLuminance(color1);
  const luminance2 = rgbToLuminance(color2);

  const brighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (brighter + 0.05) / (darker + 0.05);
}
