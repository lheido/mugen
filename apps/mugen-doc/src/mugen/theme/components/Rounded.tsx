import { FlowProps } from "solid-js";
import { HandlerRuleData, ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type RoundedProps<K = keyof ThemeDescription["rounded"]> = {
  value?: K;
  top?: K;
  right?: K;
  bottom?: K;
  left?: K;
  topLeft?: K;
  topRight?: K;
  bottomLeft?: K;
  bottomRight?: K;
};

export function themeRoundedHandler(theme: MugenTheme, props: RoundedProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const className = `rounded-${props.value as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-radius: ${(theme.description as any)["rounded"][props.value]}`],
      });
    }
  }
  if (props.top) {
    const className = `rounded-t-${props.top as string}`;
    result[className] = true;
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
    result[className] = true;
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
    result[className] = true;
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
    result[className] = true;
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
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-top-left-radius: ${(theme.description as any)["rounded"][props.topLeft]}`],
      });
    }
  }
  if (props.topRight) {
    const className = `rounded-tr-${props.topRight as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-top-right-radius: ${(theme.description as any)["rounded"][props.topRight]}`],
      });
    }
  }
  if (props.bottomLeft) {
    const className = `rounded-bl-${props.bottomLeft as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-bottom-left-radius: ${(theme.description as any)["rounded"][props.bottomLeft]}`],
      });
    }
  }
  if (props.bottomRight) {
    const className = `rounded-br-${props.bottomRight as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`border-bottom-right-radius: ${(theme.description as any)["rounded"][props.bottomRight]}`],
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

export const Rounded = (props: FlowProps & RoundedProps) => {
  const theme = useMugenThemeContext();
  theme.add("rounded", () => themeRoundedHandler(theme, props));
  return props.children;
};
