import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";

export type FontSizeProps<T extends ThemeDescription> = {
  value?: keyof T["fontSize"];
};

export function themeFontSizeHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: FontSizeProps<T>) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.value) {
    const className = `fz-${props.value as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      let values = (theme.description as any)["fontSize"][props.value];
      values = Array.isArray(values) ? values : [values];
      cls.push({
        className,
        properties: values.map((value: string | { raw: string }) =>
          typeof value === "string" ? `font-size: ${value}` : value.raw
        ),
      });
    }
  }

  if (cls.length > 0) {
    cls.forEach(({ className, properties }) => {
      theme.insertRule(className, properties);
    });
  }
  return result;
}

export const FontSize = <T extends ThemeDescription>(props: FlowProps & FontSizeProps<T>) => {
  const theme = useMugenThemeContext<T>();
  theme.add("fontSize", () => themeFontSizeHandler<T>(theme, props));
  return props.children;
};
useMugenThemeContext;
