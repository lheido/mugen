import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type RoundedProps<T extends ThemeDescription> = {
  value?: keyof T["rounded"];
  top?: keyof T["rounded"];
  right?: keyof T["rounded"];
  bottom?: keyof T["rounded"];
  left?: keyof T["rounded"];
  topLeft?: keyof T["rounded"];
  topRight?: keyof T["rounded"];
  bottomLeft?: keyof T["rounded"];
  bottomRight?: keyof T["rounded"];
};

export function themeRoundedHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: RoundedProps<T>) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.value) {
    const className = `rounded-${props.value as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-radius: ${(theme.description as any)["rounded"][props.value]}`],
      });
    }
  }
  if (props.top) {
    const className = `rounded-t-${props.top as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `border-top-left-radius: ${(theme.description as any)["rounded"][props.top]}`,
          `border-top-right-radius: ${(theme.description as any)["rounded"][props.top]}`,
        ],
      });
    }
  }
  if (props.right) {
    const className = `rounded-r-${props.right as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `border-top-right-radius: ${(theme.description as any)["rounded"][props.right]}`,
          `border-bottom-right-radius: ${(theme.description as any)["rounded"][props.right]}`,
        ],
      });
    }
  }
  if (props.bottom) {
    const className = `rounded-b-${props.bottom as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `border-bottom-left-radius: ${(theme.description as any)["rounded"][props.bottom]}`,
          `border-bottom-right-radius: ${(theme.description as any)["rounded"][props.bottom]}`,
        ],
      });
    }
  }
  if (props.left) {
    const className = `rounded-l-${props.left as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `border-top-left-radius: ${(theme.description as any)["rounded"][props.left]}`,
          `border-bottom-left-radius: ${(theme.description as any)["rounded"][props.left]}`,
        ],
      });
    }
  }
  if (props.topLeft) {
    const className = `rounded-tl-${props.topLeft as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-top-left-radius: ${(theme.description as any)["rounded"][props.topLeft]}`],
      });
    }
  }
  if (props.topRight) {
    const className = `rounded-tr-${props.topRight as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-top-right-radius: ${(theme.description as any)["rounded"][props.topRight]}`],
      });
    }
  }
  if (props.bottomLeft) {
    const className = `rounded-bl-${props.bottomLeft as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-bottom-left-radius: ${(theme.description as any)["rounded"][props.bottomLeft]}`],
      });
    }
  }
  if (props.bottomRight) {
    const className = `rounded-br-${props.bottomRight as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-bottom-right-radius: ${(theme.description as any)["rounded"][props.bottomRight]}`],
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

export const Rounded = <T extends ThemeDescription>(props: FlowProps & RoundedProps<T>) => {
  const theme = useMugenThemeContext<T>();
  theme.add("rounded", () => themeRoundedHandler<T>(theme, props));
  return props.children;
};
