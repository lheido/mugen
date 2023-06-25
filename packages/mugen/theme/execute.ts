import { mugenGlobal } from "./global";
import { compute } from "./style-sheet";
import { ClassList, ThemeEventNames, themeEventNames } from "./types";

export function execute(
  key: string,
  value: any,
  classList: ClassList,
  emod?: ThemeEventNames,
  media?: string
) {
  if (themeEventNames.includes(key as ThemeEventNames)) {
    Object.entries(value).forEach(([k, v]) => {
      execute(k, v, classList, key as ThemeEventNames, media);
    });
  } else if (
    mugenGlobal.themeDescription?.breakpoints &&
    key in mugenGlobal.themeDescription?.breakpoints
  ) {
    Object.entries(value).forEach(([k, v]) => {
      execute(k, v, classList, emod, key as string);
    });
  } else {
    Object.assign(classList, compute(key, value, emod, media));
  }
}
