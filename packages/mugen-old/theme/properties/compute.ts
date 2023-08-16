import { mugen } from "../global";
import { ClassList, ThemeDescription } from "../types";
import { buildCssRules } from "./buildCssRules";
import { escapeClassName } from "./escapeClassName";

export function compute(
  key: string,
  value: any,
  emod?: string,
  media?: keyof ThemeDescription["breakpoints"],
  ps?: string
): ClassList {
  const classes: string[] = [];

  for (const data of buildCssRules(key, value, emod, media)) {
    classes.push(data.className);
    if (data.content) {
      const _evt = emod ? `:${emod}` : "";
      const __ps = ps ? `::${ps}` : "";
      const rule = String.raw`.${escapeClassName(
        data.className
      )}${_evt}${__ps} {${data.content
        .map((v: any) => v.join?.("; ") ?? v)
        .join(";")}}`;
      let ss = mugen.styleSheet;
      if (media) {
        if (!mugen.mediaStyleSheets.has(media)) {
          const newMediaStyleSheet = new CSSStyleSheet({
            media: `(min-width: ${mugen.themeDescription.breakpoints[media]})`,
          });
          document.adoptedStyleSheets.push(newMediaStyleSheet);
          mugen.mediaStyleSheets.set(media, newMediaStyleSheet);
        }
        ss = mugen.mediaStyleSheets.get(media)!;
      }
      ss.insertRule(rule);
    }
  }

  return classes.reduce((list, className) => {
    list[className] = true;
    return list;
  }, {} as ClassList);
}
