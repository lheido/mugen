import { getContrast50 } from "./colors";
import { execute } from "./execute";
import { COLOR_VAR_PREFIX, mugenGlobal, NON_CONTENT_COLORS } from "./global";
import { compute } from "./style-sheet";
import { RegisterThemeOptions, ThemeDescription } from "./types";

export function registerTheme<T extends ThemeDescription>(
  description: T,
  options?: RegisterThemeOptions<T>
): void {
  mugenGlobal.themeDescription = description;
  mugenGlobal.opts = {
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
    // description.colors[key] = `var(${propName})`;
    themeCustomProperties[":root"].push([propName, value]);
    if (
      mugenGlobal.opts.autoContentColor &&
      !NON_CONTENT_COLORS.includes(value as any)
    ) {
      themeCustomProperties[":root"].push([
        `${propName}-content`,
        mugenGlobal.opts.autoContentColor(value),
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
          mugenGlobal.opts.autoContentColor &&
          !NON_CONTENT_COLORS.includes(value as any)
        ) {
          themeCustomProperties[themeName].push([
            `${propName}-content`,
            mugenGlobal.opts.autoContentColor(value),
          ]);
        }
      });
    });
  }
  Object.entries(themeCustomProperties)
    // Make sure the :root theme is always at the end.
    .reverse()
    .forEach(([themeName, customProperties]) => {
      mugenGlobal.styleSheet.insertRule(
        `${themeName} { ${customProperties
          .map(([propName, value]) => `${propName}: ${value}`)
          .join(";")} }`
      );
    });
  if (mugenGlobal.opts.pageTheme !== undefined) {
    const bodyClassList = {};
    Object.entries(mugenGlobal.opts.pageTheme).forEach(([k, v]) => {
      execute(k, v, bodyClassList);
    });
    document.body.classList.add(...Object.keys(bodyClassList));
  } else {
    if (
      mugenGlobal.themeDescription.colors[
        mugenGlobal.opts.pageColor as string
      ] !== undefined
    ) {
      compute("background", mugenGlobal.opts.pageColor);
      document.documentElement.classList.add(
        `bg-${mugenGlobal.opts.pageColor as string}`
      );
    }
  }
  if (mugenGlobal.opts?.defaultTheme) {
    document.documentElement.classList.add(
      mugenGlobal.opts.defaultTheme as string
    );
  }
}
