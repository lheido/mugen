import { ThemeDescription } from "../types";
import { escapeClassName } from "./utils/escapeClassName";

export class MugenTheme<T extends ThemeDescription> {
  private style = new CSSStyleSheet();
  private mediaStyleSheets = new Map<string, CSSStyleSheet>();
  private classNameRefs = new Map<string, boolean>();
  private handlers = new Map<string, () => string[]>();

  constructor(public description: T) {
    document.adoptedStyleSheets.push(this.style);
    Object.entries(this.description.breakpoints ?? {}).forEach(([name, minWidth]) => {
      const mediaStyleSheets = new CSSStyleSheet({
        media: `(min-width: ${minWidth})`,
      });
      this.mediaStyleSheets.set(name, mediaStyleSheets);
      document.adoptedStyleSheets.push(mediaStyleSheets);
    });
  }

  classExists(className: string) {
    return this.classNameRefs.has(className);
  }

  insertRule(className: string, properties: string[], breakpoint?: keyof T["breakpoints"]) {
    if (this.classNameRefs.has(className)) return;
    this.classNameRefs.set(className, true);
    const rule = `.${escapeClassName(className)}{${properties.join(";")}}`;
    if (breakpoint) {
      this.mediaStyleSheets.get(breakpoint as string)?.insertRule(rule);
    } else {
      this.style.insertRule(rule);
    }
  }

  hasHandler(name: string) {
    return this.handlers.has(name);
  }

  add(name: string, handler: () => string[]) {
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
