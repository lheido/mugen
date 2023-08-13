import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type FilterProps = {
  blur?: `${number}`;
};

export function themeFilterHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: FilterProps) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.blur) {
    const className = `blur-${props.blur}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`filter: blur(${props.blur}px)`],
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

export const Filter = <T extends ThemeDescription>(props: FlowProps & FilterProps) => {
  const theme = useMugenThemeContext<T>();
  theme.add("filter", () => themeFilterHandler<T>(theme, props));
  return props.children;
};
