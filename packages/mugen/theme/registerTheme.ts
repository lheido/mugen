import { getContrast50, hexToRgb } from "./colors";
import { execute } from "./execute";
import {
  COLOR_VAR_PREFIX,
  mugen,
  NON_CONTENT_COLORS,
  RGB_COLOR_VAR_PREFIX,
} from "./global";
import { preflightRules } from "./preflight";
import { compute } from "./properties";
import { ThemeDescription, ThemeElementApi } from "./types";

for (const rule of preflightRules) {
  try {
    mugen.styleSheet.insertRule(rule);
  } catch (error) {
    /* ignore preflight errors */
  }
}
try {
  document.adoptedStyleSheets.push(mugen.styleSheet);
} catch (error) {
  /** ignore */
}

export type RegisterThemeOptions<T extends ThemeDescription> = {
  defaultTheme?: keyof T["themes"];
  pageColor?: (keyof T["colors"] extends string ? string : undefined) | "page";
  pageTheme?: ThemeElementApi<T>;
  autoContentColor?: ((color: string) => string) | false;
};

export function registerTheme<T extends ThemeDescription>(
  description: T,
  options?: RegisterThemeOptions<T>
): void {
  mugen.themeDescription = description;
  mugen.opts = {
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
      mugen.opts.autoContentColor &&
      !NON_CONTENT_COLORS.includes(value as any)
    ) {
      themeCustomProperties[":root"].push([
        `${propName}-content`,
        mugen.opts.autoContentColor(value),
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
          mugen.opts.autoContentColor &&
          !NON_CONTENT_COLORS.includes(value as any)
        ) {
          themeCustomProperties[themeName].push([
            `${propName}-content`,
            mugen.opts.autoContentColor(value),
          ]);
        }
      });
    });
  }
  Object.entries(themeCustomProperties)
    // Make sure the :root theme is always at the end.
    .reverse()
    .forEach(([themeName, customProperties]) => {
      mugen.styleSheet.insertRule(
        `${themeName} { ${customProperties
          .map(([propName, value]) => `${propName}: ${value}`)
          .join(";")} }`
      );
    });
  if (mugen.opts.pageTheme !== undefined) {
    const bodyClassList = {};
    Object.entries(mugen.opts.pageTheme).forEach(([k, v]) => {
      execute(k, v, bodyClassList);
    });
    document.body.classList.add(...Object.keys(bodyClassList));
  } else {
    if (
      mugen.themeDescription.colors[mugen.opts.pageColor as string] !==
      undefined
    ) {
      compute("background", mugen.opts.pageColor);
      document.documentElement.classList.add(
        `bg-${mugen.opts.pageColor as string}`
      );
    }
  }
  if (mugen.opts?.defaultTheme) {
    document.documentElement.classList.add(mugen.opts.defaultTheme as string);
  }
}
