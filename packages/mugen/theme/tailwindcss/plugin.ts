import plugin from "tailwindcss/plugin";
import type { CSSRuleObject, DarkModeConfig } from "tailwindcss/types/config";
import { darken, getBestContentColor, toCSSVarValue, toRgb } from "../color";
import { isAutoColor, MugenThemeConfig, SpecificThemeColor } from "./types";

export function mugenThemePlugin(config: MugenThemeConfig) {
  const mode = config.mode ?? "light-dark";
  return plugin(
    ({ addBase, config: tConfig }) => {
      const darkMode = tConfig("darkMode") as DarkModeConfig;
      const defaultColors = buildColors(
        mode === "light-dark" ? "light" : config.defaultTheme!,
        config
      );
      addBase({
        ":root": defaultColors,
      });
      if (mode === "light-dark") {
        const darkColors = buildColors("dark", config);
        if (darkMode === "media") {
          addBase({
            "@media (prefers-color-scheme: dark)": darkColors,
          });
        } else if (darkMode === "selector") {
          addBase({
            [`.${tConfig("prefix")}dark`]: darkColors,
          });
        } else if (Array.isArray(darkMode) && darkMode[0] === "selector") {
          addBase({
            [darkMode[1]]: darkColors,
          });
        } else if (Array.isArray(darkMode) && darkMode[0] === "variant") {
          const variants = Array.isArray(darkMode[1])
            ? darkMode[1]
            : [darkMode[1]];
          for (const variant of variants) {
            const { mediaQuery, selector } = parseVariantSelector(variant);
            // TODO: fix the need to replace "&" and " *"
            const todoSelector = selector
              .replace("&", "body")
              .replace(" *", "");
            if (mediaQuery) {
              addBase({
                [`@media ${mediaQuery}`]: {
                  [todoSelector]: darkColors,
                },
              });
            } else {
              addBase({
                [todoSelector]: darkColors,
              });
            }
          }
        }
      }
    },
    {
      darkMode: [
        "variant",
        [
          "@media (prefers-color-scheme: dark) { &:not(.light *) }",
          "&:is(.dark *)",
        ],
      ],
      theme: {
        colors: getColorsForTailwind(config),
      },
    }
  );
}

const mediaQueryRegex = /@media\s+([^{}]+)\s*{/;
const selectorRegex = /{\s*([^{}]+)\s*}/;

function parseVariantSelector(variant: string) {
  const mediaQuery = variant.match(mediaQueryRegex)?.[1].trim();
  const selector = variant.match(selectorRegex)?.[1].trim() ?? variant;
  return { mediaQuery, selector };
}

function buildColors<T extends MugenThemeConfig>(
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

function getColorsForTailwind(config: MugenThemeConfig) {
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

function getColorVarNames(color: string) {
  return {
    DEFAULT: `--mugen-colors-${color}`,
    content: `--mugen-colors-${color}-content`,
    variant: `--mugen-colors-${color}-variant`,
    "variant-content": `--mugen-colors-${color}-variant-content`,
    border: `--mugen-colors-${color}-border`,
  } satisfies Record<keyof SpecificThemeColor, `--mugen-colors-${string}`>;
}

function getColorKeys(config: MugenThemeConfig) {
  return Array.from(
    new Set(
      Object.keys(config.themes).flatMap((theme) =>
        Object.keys(config.themes[theme])
      )
    )
  );
}
