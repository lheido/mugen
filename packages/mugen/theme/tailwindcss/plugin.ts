import plugin from "tailwindcss/plugin";
import type { DarkModeConfig } from "tailwindcss/types/config";
import { MugenThemeConfig } from "./types";
import {
  buildColors,
  getColorsForTailwind,
  parseVariantSelector,
} from "./utils";

export function mugenThemePlugin(config: MugenThemeConfig) {
  const mode = config.mode ?? "light-dark";
  return plugin(
    (api) => {
      // base theming features
      const darkMode = api.config("darkMode") as DarkModeConfig;
      const defaultColors = buildColors(
        mode === "light-dark" ? "light" : config.defaultTheme!,
        config
      );
      api.addBase({
        ":root": defaultColors,
      });
      if (mode === "light-dark") {
        const darkColors = buildColors("dark", config);
        if (darkMode === "media") {
          api.addBase({
            "@media (prefers-color-scheme: dark)": darkColors,
          });
        } else if (darkMode === "selector") {
          api.addBase({
            [`.${api.config("prefix")}dark`]: darkColors,
          });
        } else if (Array.isArray(darkMode) && darkMode[0] === "selector") {
          api.addBase({
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
              api.addBase({
                [`@media ${mediaQuery}`]: {
                  [todoSelector]: darkColors,
                },
              });
            } else {
              api.addBase({
                [todoSelector]: darkColors,
              });
            }
          }
        }
      } else {
        // TODO: add support for multiple themes
      }

      // component theming features
      if (config.components) {
        for (const component of config.components) {
          component({ ...api, mugen: config });
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
        colors: {
          transparent: "transparent",
          current: "currentColor",
          ...getColorsForTailwind(config),
        },
      },
    }
  );
}
