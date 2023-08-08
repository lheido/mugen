import { mugen } from "./global";
import { compute } from "./properties";
import { ClassList, ThemeDescription } from "./types";

export function execute(
  key: string,
  value: any,
  classList: ClassList,
  emod?: string,
  media?: keyof ThemeDescription["breakpoints"]
) {
  if (mugen.themeDescription.eventNames[key] !== undefined) {
    Object.entries(value).forEach(([k, v]) => {
      execute(k, v, classList, key, media);
    });
  } else if (key in mugen.themeDescription.breakpoints) {
    Object.entries(value).forEach(([k, v]) => {
      execute(
        k,
        v,
        classList,
        emod,
        key as keyof ThemeDescription["breakpoints"]
      );
    });
  } else {
    Object.assign(classList, compute(key, value, emod, media));
  }
}
