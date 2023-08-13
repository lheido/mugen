import { FlowProps } from "solid-js";
import { Either, ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type GradientDirectionValues = "bottom" | "top" | "left" | "right";

export type ColorProps<T extends ThemeDescription> = Either<
  {
    value: keyof T["colors"];
  },
  {
    from: keyof T["colors"];
    to?: keyof T["colors"];
    direction?: GradientDirectionValues;
    fromOffset?: keyof T["gradientOffset"];
    toOffset?: keyof T["gradientOffset"];
  }
>;

export type ColorType = "color" | "background-color";

export function themeColorHandler<T extends ThemeDescription>(
  theme: MugenTheme<T>,
  props: ColorProps<T>,
  prop: ColorType
) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  const prefix = prop === "color" ? "text" : "bg";
  if (props.value) {
    const className = `${prefix}-${props.value as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`${prop}: var(--mugen-color-${props.value as string})`],
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

export const Color = <T extends ThemeDescription>(props: ColorProps<T> & FlowProps) => {
  const theme = useMugenThemeContext<T>();
  theme.add("color", () => themeColorHandler<T>(theme, props, "color"));
  return props.children;
};

export const BackgroundColor = <T extends ThemeDescription>(props: ColorProps<T> & FlowProps) => {
  const theme = useMugenThemeContext<T>();
  theme.add("bgColor", () => themeColorHandler<T>(theme, props, "background-color"));
  return props.children;
};
