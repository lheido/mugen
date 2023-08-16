import { FlowProps } from "solid-js";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type FilterProps = {
  blur?: `${number}`;
};

export function themeFilterHandler(theme: MugenTheme, props: FilterProps) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: Record<string, boolean> = {};
  if (props.blur) {
    const className = `blur-${props.blur}`;
    result[className] = true;
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

export const Filter = (props: FlowProps & FilterProps) => {
  const theme = useMugenThemeContext();
  theme.add("filter", () => themeFilterHandler(theme, props));
  return props.children;
};
