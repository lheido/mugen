import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type OpacityProps<T extends ThemeDescription> = {
  value?: keyof T["opacity"];
};

export function themeOpacityHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: OpacityProps<T>) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.value) {
    const className = `opacity-${props.value as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`opacity: ${(theme.description as any)["opacity"][props.value]}`],
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

export const Opacity = <T extends ThemeDescription>(props: FlowProps & OpacityProps<T>) => {
  const theme = useMugenThemeContext<T>();
  theme.add("opacity", () => themeOpacityHandler<T>(theme, props));
  return props.children;
};
