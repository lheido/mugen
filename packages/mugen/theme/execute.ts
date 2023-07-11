import { mugen } from "./global";
import { compute } from "./properties";
import { ClassList } from "./types";

export function execute(
  key: string,
  value: any,
  classList: ClassList,
  emod?: string,
  media?: string
) {
  if (mugen.themeDescription.eventNames[key] !== undefined) {
    Object.entries(value).forEach(([k, v]) => {
      execute(k, v, classList, key, media);
    });
  } else if (key in mugen.themeDescription.breakpoints) {
    Object.entries(value).forEach(([k, v]) => {
      execute(k, v, classList, emod, key as string);
    });
  } else {
    Object.assign(classList, compute(key, value, emod, media));
  }
}
