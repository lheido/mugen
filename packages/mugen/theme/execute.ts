import { global } from "./global";
import { compute } from "./style-sheet";
import { ClassList } from "./types";

export function execute(
  key: string,
  value: any,
  classList: ClassList,
  emod?: string,
  media?: string
) {
  if (global.themeDescription.eventNames[key] !== undefined) {
    Object.entries(value).forEach(([k, v]) => {
      execute(k, v, classList, key, media);
    });
  } else if (key in global.themeDescription.breakpoints) {
    Object.entries(value).forEach(([k, v]) => {
      execute(k, v, classList, emod, key as string);
    });
  } else {
    Object.assign(classList, compute(key, value, emod, media));
  }
}
