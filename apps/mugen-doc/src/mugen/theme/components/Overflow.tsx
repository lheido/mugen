import { FlowProps } from "solid-js";
import { Either, HandlerRuleData } from "../../types";
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

export function themeOverflowHandler(theme: MugenTheme, props: OverflowProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const className = `overflow-${props.value as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`overflow: ${props.value}`],
      });
    }
  }
  if (props.x) {
    const className = `overflow-x-${props.x as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`overflow-x: ${props.x}`],
      });
    }
  }
  if (props.y) {
    const className = `overflow-y-${props.y as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`overflow-y: ${props.y}`],
      });
    }
  }
  if (cls.length > 0) {
    cls.forEach((data) => {
      theme.insertRule(data);
    });
  }
  return result;
}

export const Overflow = (props: FlowProps & OverflowProps) => {
  const theme = useMugenThemeContext();
  theme.add("overflow", () => themeOverflowHandler(theme, props));
  return props.children;
};
