import { RegisterThemeOptions } from "./registerTheme";
import { ThemeDescription } from "./types";

let themeDescription: ThemeDescription;
let opts: RegisterThemeOptions<ThemeDescription>;
const styleSheet = new CSSStyleSheet();
const mediaStyleSheets = new Map<string, CSSStyleSheet>();
const classNameRefs = new Map<string, boolean>();

export const COLOR_VAR_PREFIX = "--mugen-color-" as const;
export const RGB_COLOR_VAR_PREFIX = "--mugen-rgb-color-" as const;
export const NON_CONTENT_COLORS = [
  "transparent",
  "inherit",
  "initial",
  "unset",
  "currentColor",
] as const;

export const global = {
  get themeDescription() {
    return themeDescription;
  },
  set themeDescription(value: ThemeDescription) {
    themeDescription = value;
  },
  get opts() {
    return opts;
  },
  set opts(value: RegisterThemeOptions<ThemeDescription>) {
    opts = value;
  },
  styleSheet,
  mediaStyleSheets,
  classNameRefs,
};
