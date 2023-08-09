import { FlowProps } from "solid-js";
import { MugenTheme } from "../../MugenTheme";
import { useMugenThemeContext } from "../../context";
import { ThemeDescription } from "../../types";
import { escapeClassName } from "../../utils/escapeClassName";

export type GapProps<T extends ThemeDescription> = {
  value?: keyof T["spacing"];
  x?: keyof T["spacing"];
  y?: keyof T["spacing"];
};

export function themeGapHandler<T extends ThemeDescription>(
  theme: MugenTheme<T>,
  props: GapProps<T>
) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.value) {
    const className = escapeClassName(`gap-${props.value as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `gap: ${(theme.description as any)["spacing"][props.value]}`,
        ],
      });
    }
  }
  if (props.x) {
    const className = escapeClassName(`gap-x-${props.x as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `column-gap: ${(theme.description as any)["spacing"][props.x]}`,
        ],
      });
    }
  }
  if (props.y) {
    const className = escapeClassName(`gap-y-${props.y as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `row-gap: ${(theme.description as any)["spacing"][props.y]}`,
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

export const Gap = <T extends ThemeDescription>(
  props: FlowProps & GapProps<T>
) => {
  const theme = useMugenThemeContext<T>();
  theme.add("gap", () => themeGapHandler(theme, props));
  return props.children;
};
