import { FlowProps } from "solid-js";
import { Either, ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type SpacingProps<T extends ThemeDescription, K = keyof T["spacing"] | "auto"> = Either<
  {
    top?: K;
    right?: K;
    bottom?: K;
    left?: K;
    x?: K;
    y?: K;
  },
  { value?: K }
>;

export type SpacingType = "padding" | "margin";

export function themeSpacingHandler<T extends ThemeDescription>(
  theme: MugenTheme<T>,
  props: SpacingProps<T>,
  prop: SpacingType
) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  const prefix = prop[0];
  if (props.value) {
    const className = `${prefix}-${props.value as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        // ! TODO: fix type issue and remove the any...
        properties: [`${prop}: ${(theme.description as any)["spacing"][props.value] ?? props.value}`],
      });
    }
  }
  if (props.top) {
    const className = `${prefix}t-${props.top as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`${prop}-top: ${(theme.description as any)["spacing"][props.top] ?? props.top}`],
      });
    }
  }
  if (props.right) {
    const className = `${prefix}r-${props.right as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`${prop}-right: ${(theme.description as any)["spacing"][props.right] ?? props.right}`],
      });
    }
  }
  if (props.bottom) {
    const className = `${prefix}b-${props.bottom as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`${prop}-bottom: ${(theme.description as any)["spacing"][props.bottom]}`],
      });
    }
  }
  if (props.left) {
    const className = `${prefix}l-${props.left as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`${prop}-left: ${(theme.description as any)["spacing"][props.left] ?? props.left}`],
      });
    }
  }
  if (props.x) {
    const className = `${prefix}x-${props.x as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `${prop}-left: ${(theme.description as any)["spacing"][props.x] ?? props.x}`,
          `${prop}-right: ${(theme.description as any)["spacing"][props.x] ?? props.x}`,
        ],
      });
    }
  }
  if (props.y) {
    const className = `${prefix}y-${props.y as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `${prop}-top: ${(theme.description as any)["spacing"][props.y] ?? props.y}`,
          `${prop}-bottom: ${(theme.description as any)["spacing"][props.y] ?? props.y}`,
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

export const Spacing = <T extends ThemeDescription>(props: FlowProps & SpacingProps<T> & { type: SpacingType }) => {
  const theme = useMugenThemeContext<T>();
  theme.add(props.type, () => themeSpacingHandler<T>(theme, props, props.type));
  return props.children;
};

export const Padding = <T extends ThemeDescription>(props: FlowProps & SpacingProps<T>) => (
  <Spacing {...props} type="padding" />
);

export const Margin = <T extends ThemeDescription>(props: FlowProps & SpacingProps<T>) => (
  <Spacing {...props} type="margin" />
);
