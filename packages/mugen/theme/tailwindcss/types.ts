import { PluginAPI } from "tailwindcss/types/config";
import { Color, isColor } from "../color";

export type AutoThemeColor = Color;
export type SpecificThemeColor = {
  DEFAULT: Color;
  content: Color;
  variant: Color;
  "variant-content": Color;
  border: Color;
};

export type ThemeColor = AutoThemeColor | SpecificThemeColor;

export type MugenThemeColors = Record<string, ThemeColor>;

export type ComponentFunction = (api: ComponentFunParameters) => void;

export type ComponentFunParameters = PluginAPI & {
  mugen: MugenThemeConfig;
};

export type MugenThemeConfig = {
  mode?: "light-dark" | "todo-multi-theme";
  /** With the mode set to "todo-multi-theme" this property is required. */
  defaultTheme?: string;
  themes: Record<"light" | "dark" | string, MugenThemeColors>;
  components?: ComponentFunction[];
};

export function isAutoColor(color: ThemeColor): color is Color {
  return isColor(color);
}

export function isSpecificColor(
  color: ThemeColor
): color is SpecificThemeColor {
  return !isAutoColor(color) && "DEFAULT" in color;
}
