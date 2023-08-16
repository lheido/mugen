import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type PositionProps<T extends ThemeDescription> = {
  top?: keyof T["spacing"];
  right?: keyof T["spacing"];
  bottom?: keyof T["spacing"];
  left?: keyof T["spacing"];
  zIndex?: number;
};

export type PositionType = "relative" | "absolute" | "fixed" | "static" | "sticky";

export function themePositionHandler<T extends ThemeDescription>(
  theme: MugenTheme<T>,
  props: PositionProps<T>,
  prop: PositionType
) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  result.push(prop);
  if (!theme.classExists(prop)) {
    cls.push({
      className: prop,
      properties: [`position: ${prop}`],
    });
  }
  if (props.top) {
    const className = `top-${props.top as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`top: ${(theme.description as any)["spacing"][props.top]}`],
      });
    }
  }
  if (props.right) {
    const className = `right-${props.right as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`right: ${(theme.description as any)["spacing"][props.right]}`],
      });
    }
  }
  if (props.bottom) {
    const className = `bottom-${props.bottom as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`bottom: ${(theme.description as any)["spacing"][props.bottom]}`],
      });
    }
  }
  if (props.left) {
    const className = `left-${props.left as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`left: ${(theme.description as any)["spacing"][props.left]}`],
      });
    }
  }
  if (props.zIndex) {
    const className = `z-${props.zIndex}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`z-index: ${props.zIndex}`],
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

export const Position = <T extends ThemeDescription>(props: FlowProps & PositionProps<T> & { type: PositionType }) => {
  const theme = useMugenThemeContext<T>();
  theme.add(props.type, () => themePositionHandler<T>(theme, props, props.type));
  return props.children;
};

export const Relative = <T extends ThemeDescription>(props: FlowProps & PositionProps<T>) => (
  <Position {...props} type="relative" />
);

export const Absolute = <T extends ThemeDescription>(props: FlowProps & PositionProps<T>) => (
  <Position {...props} type="absolute" />
);

export const Fixed = <T extends ThemeDescription>(props: FlowProps & PositionProps<T>) => (
  <Position {...props} type="fixed" />
);

export const Static = <T extends ThemeDescription>(props: FlowProps & PositionProps<T>) => (
  <Position {...props} type="static" />
);

export const Sticky = <T extends ThemeDescription>(props: FlowProps & PositionProps<T>) => (
  <Position {...props} type="sticky" />
);
