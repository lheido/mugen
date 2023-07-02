import { getContrast50, hexToRgb } from "./colors";
import { execute } from "./execute";
import {
  COLOR_VAR_PREFIX,
  global,
  NON_CONTENT_COLORS,
  RGB_COLOR_VAR_PREFIX,
} from "./global";
import { compute } from "./style-sheet";
import {
  KeyOfColors,
  KeyOfThemes,
  ThemeDescription,
  ThemeElementApi,
} from "./types";

export type RegisterThemeOptions<T extends ThemeDescription> = {
  defaultTheme?: KeyOfThemes<T>;
  pageColor?: (KeyOfColors<T> extends string ? string : undefined) | "page";
  pageTheme?: ThemeElementApi<T>;
  autoContentColor?: ((color: string) => string) | false;
};

export function registerTheme<T extends ThemeDescription>(
  description: T,
  options?: RegisterThemeOptions<T>
): void {
  global.themeDescription = description;
  global.opts = {
    pageColor: "page",
    autoContentColor: (color: string) =>
      getContrast50(color.replace("#", "")) === "black" ? "#000" : "#fff",
    ...options,
  } as unknown as RegisterThemeOptions<ThemeDescription>;
  // Replace colors with custom properties.
  const themeCustomProperties: Record<string, [string, string][]> = {
    ":root": [],
  };
  Object.entries(description.colors).forEach(([key, value]) => {
    const propName = `${COLOR_VAR_PREFIX}${key}`;
    themeCustomProperties[":root"].push([propName, value]);
    if (value.startsWith("#")) {
      const propRgbName = `${RGB_COLOR_VAR_PREFIX}${key}`;
      const rgbValue = hexToRgb(value).join(" ");
      themeCustomProperties[":root"].push([propRgbName, rgbValue]);
    }
    if (
      global.opts.autoContentColor &&
      !NON_CONTENT_COLORS.includes(value as any)
    ) {
      themeCustomProperties[":root"].push([
        `${propName}-content`,
        global.opts.autoContentColor(value),
      ]);
    }
  });
  if (description.themes) {
    Object.entries(description.themes).forEach(([name, theme]) => {
      const themeName = `.${name}`;
      themeCustomProperties[themeName] = [];
      Object.entries(theme.colors).forEach(([key, value]) => {
        const propName = `${COLOR_VAR_PREFIX}${key}`;
        themeCustomProperties[themeName].push([propName, value]);
        if (
          global.opts.autoContentColor &&
          !NON_CONTENT_COLORS.includes(value as any)
        ) {
          themeCustomProperties[themeName].push([
            `${propName}-content`,
            global.opts.autoContentColor(value),
          ]);
        }
      });
    });
  }
  Object.entries(themeCustomProperties)
    // Make sure the :root theme is always at the end.
    .reverse()
    .forEach(([themeName, customProperties]) => {
      global.styleSheet.insertRule(
        `${themeName} { ${customProperties
          .map(([propName, value]) => `${propName}: ${value}`)
          .join(";")} }`
      );
    });
  if (global.opts.pageTheme !== undefined) {
    const bodyClassList = {};
    Object.entries(global.opts.pageTheme).forEach(([k, v]) => {
      execute(k, v, bodyClassList);
    });
    document.body.classList.add(...Object.keys(bodyClassList));
  } else {
    if (
      global.themeDescription.colors[global.opts.pageColor as string] !==
      undefined
    ) {
      compute("background", global.opts.pageColor);
      document.documentElement.classList.add(
        `bg-${global.opts.pageColor as string}`
      );
    }
  }
  if (global.opts?.defaultTheme) {
    document.documentElement.classList.add(global.opts.defaultTheme as string);
  }
}
