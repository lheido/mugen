import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../types";
import { MugenTheme } from "../MugenTheme";
import { useMugenThemeContext } from "../context";
import { escapeClassName } from "../utils/escapeClassName";

export type SpacingProps<T extends ThemeDescription> = {
  value?: keyof T["spacing"];
  top?: keyof T["spacing"];
  right?: keyof T["spacing"];
  bottom?: keyof T["spacing"];
  left?: keyof T["spacing"];
  x?: keyof T["spacing"];
  y?: keyof T["spacing"];
};

export type SpacingType = "padding" | "margin";

export function themeSpacingHandler<T extends ThemeDescription>(
  theme: MugenTheme<T>,
  props: SpacingProps<T>,
  prop: SpacingType
) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.value) {
    const className = escapeClassName(`p-${props.value as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        // ! TODO: fix type issue and remove the any...
        properties: [
          `${prop}: ${(theme.description as any)["spacing"][props.value]}`,
        ],
      });
    }
  }
  if (props.top) {
    const className = escapeClassName(`pt-${props.top as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `${prop}-top: ${(theme.description as any)["spacing"][props.top]}`,
        ],
      });
    }
  }
  if (props.right) {
    const className = escapeClassName(`pr-${props.right as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `${prop}-right: ${
            (theme.description as any)["spacing"][props.right]
          }`,
        ],
      });
    }
  }
  if (props.bottom) {
    const className = escapeClassName(`pb-${props.bottom as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `${prop}-bottom: ${
            (theme.description as any)["spacing"][props.bottom]
          }`,
        ],
      });
    }
  }
  if (props.left) {
    const className = escapeClassName(`pl-${props.left as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `${prop}-left: ${(theme.description as any)["spacing"][props.left]}`,
        ],
      });
    }
  }
  if (props.x) {
    const className = escapeClassName(`px-${props.x as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `${prop}-left: ${(theme.description as any)["spacing"][props.x]}`,
          `${prop}-right: ${(theme.description as any)["spacing"][props.x]}`,
        ],
      });
    }
  }
  if (props.y) {
    const className = escapeClassName(`py-${props.y as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `${prop}-top: ${(theme.description as any)["spacing"][props.y]}`,
          `${prop}-bottom: ${(theme.description as any)["spacing"][props.y]}`,
        ],
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

export const Spacing = <T extends ThemeDescription>(
  props: FlowProps & SpacingProps<T> & { type: SpacingType }
) => {
  const theme = useMugenThemeContext<T>();
  theme.add(props.type, () => themeSpacingHandler(theme, props, props.type));
  return props.children;
};

export const Padding = <T extends ThemeDescription>(
  props: FlowProps & SpacingProps<T>
) => <Spacing {...props} type="padding" />;

export const Margin = <T extends ThemeDescription>(
  props: FlowProps & SpacingProps<T>
) => <Spacing {...props} type="margin" />;
