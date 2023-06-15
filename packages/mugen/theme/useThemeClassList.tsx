import { Accessor, createMemo } from "solid-js";
import { BaseComponentProps } from "../types";
import { compute, themeDescription } from "./style-sheet";
import {
  ClassList,
  ThemeDescription,
  ThemeElementApi,
  ThemeEventNames,
  themeEventNames,
} from "./types";

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

export function useThemeClassList(
  ...props: BaseComponentProps[]
): Accessor<ClassList> {
  const theme = createMemo(
    (previousTheme: ThemeElementApi<ThemeDescription>) => {
      const theme = {} as ThemeElementApi<ThemeDescription>;
      props.forEach((p) => {
        if (p.theme) {
          themeObjectDiff(previousTheme, p.theme, theme);
        }
      });
      return theme;
    },
    {}
  );
  return createMemo((previousClassList?: ClassList) => {
    console.time("getClassList");
    const t = theme();
    let clsList = {};
    if (Object.keys(t).length > 0) {
      console.time("execute");
      const cls = {};
      Object.entries(t).forEach(([key, value]) => {
        execute(key, value, cls);
      });
      console.timeEnd("execute");
      clsList = Object.assign({}, previousClassList, cls);
    }
    props.forEach((p: any) => {
      if (p.classList) {
        clsList = { ...clsList, ...p.classList };
      }
    });
    console.timeEnd("getClassList");
    return clsList;
  });
}
