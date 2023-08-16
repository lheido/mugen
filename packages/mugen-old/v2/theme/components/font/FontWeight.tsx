import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";

export type FontWeightProps<T extends ThemeDescription> = {
  value?: keyof T["fontWeight"];
};

export function themeFontWeightHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: FontWeightProps<T>) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.value) {
    const className = `fw-${props.value as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`font-weight: ${(theme.description as any)["fontWeight"][props.value]}`],
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

export const FontWeight = <T extends ThemeDescription>(props: FlowProps & FontWeightProps<T>) => {
  const theme = useMugenThemeContext<T>();
  theme.add("fontWeight", () => themeFontWeightHandler<T>(theme, props));
  return props.children;
};
useMugenThemeContext;
