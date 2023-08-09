import { ThemeDescription } from "../theme/types";

export class MugenStyleSheet {
  style = new CSSStyleSheet();
  mediaStyleSheets = new Map<string, CSSStyleSheet>();

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

  insertRule(rule: string, breakpoint?: keyof ThemeDescription["breakpoints"]) {
    if (breakpoint) {
      this.mediaStyleSheets.get(breakpoint)?.insertRule(rule);
    } else {
      this.style.insertRule(rule);
    }
  }
}
