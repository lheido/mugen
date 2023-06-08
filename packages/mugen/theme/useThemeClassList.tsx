import { Accessor, createMemo } from "solid-js";
import { ComponentProps } from "../types";
import { compute, themeDescription } from "./style-sheet";
import {
  ClassList,
  ThemeDescription,
  ThemeElementApi,
  ThemeEventNames,
  themeEventNames,
} from "./types";

compute;

function themeObjectDiff(
  prev: ThemeElementApi<ThemeDescription>,
  current: ThemeElementApi<ThemeDescription>,
  diff: ThemeElementApi<ThemeDescription>
) {
  console.time("diff");
  Object.entries(current).forEach(([key, value]) => {
    if (prev[key]) {
      const currentVal = JSON.stringify(value);
      const prevVal = JSON.stringify(prev[key] ?? "");
      if (currentVal !== prevVal) {
        // TODO: make it recursive ?!
        diff[key] = value as any;
      }
    } else {
      diff[key] = value as any;
    }
  });
  console.timeEnd("diff");
  return diff;
}

function execute(
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
  } else if (key in themeDescription.breakpoints) {
    Object.entries(value).forEach(([k, v]) => {
      execute(k, v, classList, emod, key as string);
    });
  } else {
    Object.assign(classList, compute(key, value, emod, media));
  }
}

export function useThemeClassList(props: ComponentProps): Accessor<ClassList> {
  const theme = createMemo(
    (previousTheme: ThemeElementApi<ThemeDescription>) => {
      if (!props.theme) return {};
      return themeObjectDiff(previousTheme, props.theme, {});
    },
    {}
  );
  return createMemo((previousClassList?: ClassList) => {
    const t = theme();
    if (t) {
      console.time("execute2");
      const cls = {};
      Object.entries(t).forEach(([key, value]) => {
        execute(key, value, cls);
      });
      console.timeEnd("execute2");
      return Object.assign({}, previousClassList, cls);
    }
    // case: The "as" prop is used and a theme is already computed.
    if ((props as any).classList) return (props as any).classList;
    return {};
  });
}
