import { themeDescriptionDefaults } from "./default";

export type ThemeDescription = typeof themeDescriptionDefaults & {
  colors: Record<string, string>;
  eventNames: Record<string, string>;
  themes: Record<string, Pick<ThemeDescription, "colors">>;
};
