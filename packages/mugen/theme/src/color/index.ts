import { Color, RgbColor } from "./color.types";
import { getContrastRatio } from "./contrast";
import { toHsl, toRgb } from "./converter";

export * from "./color.types";
export * from "./contrast";
export * from "./converter";

export function getBestContentColor(baseColor: Color) {
  const rgbColor = toRgb(baseColor);
  const baseContentColors = [toRgb("#000000"), toRgb("#ffffff")];
  let startColorRatio = 0;
  let startColor!: RgbColor;

  for (let color of baseContentColors) {
    let tmp = getContrastRatio(color, rgbColor);
    if (tmp > startColorRatio) {
      startColorRatio = tmp;
      startColor = color;
    }
  }
  if (startColorRatio > 7) {
    const startLuminance = toHsl(startColor).l;
    return _getBestContentColor(
      rgbColor,
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
  const nextColor = toHsl(startColor);
  const baseHsl = toHsl(base);
  nextColor.h = baseHsl.h;
  nextColor.s = baseHsl.s;
  nextColor.l =
    startLuminance === 100
      ? Math.max(nextColor.l - 1, 0)
      : Math.min(nextColor.l + 1, 100);
  return _getBestContentColor(
    base,
    toRgb(nextColor),
    startColor,
    startLuminance
  );
}
