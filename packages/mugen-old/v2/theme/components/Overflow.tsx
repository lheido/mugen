import { FlowProps } from "solid-js";
import { Either, ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type OverflowValues = "visible" | "hidden" | "scroll" | "auto";

export type OverflowProps = Either<
  {
    value?: OverflowValues;
  },
  {
    x?: OverflowValues;
    y?: OverflowValues;
  }
>;

export function themeOverflowHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: OverflowProps) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.value) {
    const className = `overflow-${props.value as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`overflow: ${props.value}`],
      });
    }
  }
  if (props.x) {
    const className = `overflow-x-${props.x as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`overflow-x: ${props.x}`],
      });
    }
  }
  if (props.y) {
    const className = `overflow-y-${props.y as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`overflow-y: ${props.y}`],
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

export const Overflow = <T extends ThemeDescription>(props: FlowProps & OverflowProps) => {
  const theme = useMugenThemeContext<T>();
  theme.add("overflow", () => themeOverflowHandler<T>(theme, props));
  return props.children;
};
