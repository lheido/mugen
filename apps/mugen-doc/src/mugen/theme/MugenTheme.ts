import { PseudoClasses, ThemeDescription } from "../types";
import { getContrast50, hexToRgb } from "./colors";
import { escapeClassName } from "./utils/escapeClassName";

export const COLOR_VAR_PREFIX = "--mugen-color-" as const;
export const RGB_COLOR_VAR_PREFIX = "--mugen-rgb-color-" as const;
export const NON_CONTENT_COLORS = ["transparent", "inherit", "initial", "unset", "currentColor"] as const;

export type ThemeHandler = () => Record<string, boolean>;

export type AutoContentColorHandler = (color: string) => string;

export const defaultAutoContentColor = (color: string) =>
  getContrast50(color.replace("#", "")) === "black" ? "#000" : "#fff";

export class MugenTheme {
  private style = new CSSStyleSheet();
  private classNameRefs = new Map<string, boolean>();
  private handlers = new Map<string, ThemeHandler>();

  constructor(public description: ThemeDescription, public autoContentColor = defaultAutoContentColor) {
    document.adoptedStyleSheets.push(this.style);
    const themeCustomProperties: string[] = [];
    Object.entries(this.description.colors ?? {}).forEach(([key, value]) => {
      const propName = `${COLOR_VAR_PREFIX}${key}`;
      themeCustomProperties.push(`${propName}: ${value}`);
      if (value.startsWith("#")) {
        const propRgbName = `${RGB_COLOR_VAR_PREFIX}${key}`;
        const rgbValue = hexToRgb(value).join(" ");
        themeCustomProperties.push(`${propRgbName}: ${rgbValue}`);
      }
      if (!NON_CONTENT_COLORS.includes(value as any)) {
        themeCustomProperties.push(`${propName}-content: ${autoContentColor(value)}`);
      }
    });

    this.style.insertRule(`:root {${themeCustomProperties.join(";")}}`);
  }

  classExists(className: string) {
    return this.classNameRefs.has(className);
  }

  insertRule(className: string, properties: string[], pseudoClasse?: PseudoClasses) {
    if (this.classNameRefs.has(className)) return;
    this.classNameRefs.set(className, true);
    const rule = `.${escapeClassName(className)}${pseudoClasse ? `:${pseudoClasse}` : ""}{${properties.join(";")}}`;
    this.style.insertRule(rule);
  }

  hasHandler(name: string) {
    return this.handlers.has(name);
  }

  add(name: string, handler: ThemeHandler) {
    if (this.hasHandler(name)) return;
    this.handlers.set(name, handler);
  }

  consume(name: string) {
    const handler = this.handlers.get(name)!;
    this.handlers.delete(name);
    return handler;
  }

  consumeAvailable() {
    return Array.from(this.handlers.keys()).map((k) => this.consume(k));
  }
}
