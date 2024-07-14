import { CSSRuleObject } from "tailwindcss/types/config";
import { darken, getBestContentColor, toCSSVarValue, toRgb } from "../../color";
import { isAutoColor, MugenThemeConfig, SpecificThemeColor } from "../types";

export function themeColorToCSS(color: string, op: string): string {
  return color.replace("<alpha-value>", `var(--tw-${op}-opacity, 1)`);
}

const mediaQueryRegex = /@media\s+([^{}]+)\s*{/;
const selectorRegex = /{\s*([^{}]+)\s*}/;

export function parseVariantSelector(variant: string) {
  const mediaQuery = variant.match(mediaQueryRegex)?.[1].trim();
  const selector = variant.match(selectorRegex)?.[1].trim() ?? variant;
  return { mediaQuery, selector };
}

export function buildColors<T extends MugenThemeConfig>(
  theme: keyof T["themes"],
  config: T
): CSSRuleObject {
  const baseColors = config.themes[theme as string] ?? config.themes.light;
  const colorKeys = getColorKeys(config);
  const colors = colorKeys.reduce((acc, colorName) => {
    const color = baseColors[colorName];
    const {
      DEFAULT,
      content,
      variant,
      "variant-content": variantContent,
      border,
    } = getColorVarNames(colorName);
    const isAuto = isAutoColor(color);
    const defaultColor = isAuto ? color : color.DEFAULT;
    const contentColor = isAuto ? getBestContentColor(color) : color.content;
    const variantColor = isAuto ? darken(color, 10) : color.variant;
    const variantContentColor = isAuto
      ? getBestContentColor(variantColor)
      : color["variant-content"];
    const borderColor = isAuto ? defaultColor : color.border;
    return {
      ...acc,
      [DEFAULT]: toCSSVarValue(toRgb(defaultColor)),
      [content]: toCSSVarValue(toRgb(contentColor)),
      [variant]: toCSSVarValue(toRgb(variantColor)),
      [variantContent]: toCSSVarValue(toRgb(variantContentColor)),
      [border]: toCSSVarValue(toRgb(borderColor)),
    };
  }, {} as any);
  return colors;
}

export function getColorsForTailwind(config: MugenThemeConfig) {
  const colors: Record<string, Record<keyof SpecificThemeColor, string>> = {};
  const colorKeys = getColorKeys(config);
  for (const name of colorKeys) {
    const {
      DEFAULT,
      content,
      variant,
      "variant-content": variantContent,
      border,
    } = getColorVarNames(name);
    colors[name] = {
      DEFAULT: `rgb(var(${DEFAULT}) / <alpha-value>)`,
      content: `rgb(var(${content}) / <alpha-value>)`,
      variant: `rgb(var(${variant}) / <alpha-value>)`,
      "variant-content": `rgb(var(${variantContent}) / <alpha-value>)`,
      border: `rgb(var(${border}) / <alpha-value>)`,
    };
  }
  return colors;
}

export function getColorVarNames(color: string) {
  return {
    DEFAULT: `--mugen-colors-${color}`,
    content: `--mugen-colors-${color}-content`,
    variant: `--mugen-colors-${color}-variant`,
    "variant-content": `--mugen-colors-${color}-variant-content`,
    border: `--mugen-colors-${color}-border`,
  } satisfies Record<keyof SpecificThemeColor, `--mugen-colors-${string}`>;
}

export function getColorKeys(config: MugenThemeConfig) {
  return Array.from(
    new Set(
      Object.keys(config.themes).flatMap((theme) =>
        Object.keys(config.themes[theme])
      )
    )
  );
}
