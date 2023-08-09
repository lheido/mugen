import { ThemeDescription } from "../theme/types";

export class MugenTheme {
  style = new CSSStyleSheet();
  mediaStyleSheets = new Map<string, CSSStyleSheet>();
  handlers = new Map<string, () => string[]>();
  classNameRefs = new Map<string, boolean>();

  constructor(public description: ThemeDescription) {
    Object.entries(this.description.breakpoints ?? {}).forEach(
      ([name, minWidth]) => {
        this.mediaStyleSheets.set(
          name,
          new CSSStyleSheet({
            media: `(min-width: ${minWidth})`,
          })
        );
      }
    );
  }

  insertRule(
    className: string,
    properties: string[],
    breakpoint?: keyof ThemeDescription["breakpoints"]
  ) {
    if (this.classNameRefs.has(className)) return;
    this.classNameRefs.set(className, true);
    const rule = `.${className}{${properties.join(";")}}`;
    if (breakpoint) {
      this.mediaStyleSheets.get(breakpoint)?.insertRule(rule);
    } else {
      this.style.insertRule(rule);
    }
  }

  add(name: string, handler: () => string[]) {
    this.handlers.set(name, handler);
  }
}
