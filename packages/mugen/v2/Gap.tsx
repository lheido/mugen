import { FlowProps } from "solid-js";
import { ThemeDescription } from "../theme";
import { MugenTheme } from "./MugenTheme";
import { useMugenThemeContext } from "./context";
import { escapeClassName } from "./escapeClassName";

export type GapProps = {
  value?: keyof ThemeDescription["spacing"];
  x?: keyof ThemeDescription["spacing"];
  y?: keyof ThemeDescription["spacing"];
};

export function themeGapHandler(theme: MugenTheme, props: GapProps) {
  const cls: { className: string; properties: string[] }[] = [];
  if (props.value) {
    cls.push({
      className: escapeClassName(`gap-${props.value}`),
      properties: [`gap: ${theme.description["spacing"][props.value]}`],
    });
  }
  if (props.x) {
    cls.push({
      className: escapeClassName(`gap-x-${props.x}`),
      properties: [`column-gap: ${theme.description["spacing"][props.x]}`],
    });
  }
  if (props.y) {
    cls.push({
      className: escapeClassName(`gap-y-${props.y}`),
      properties: [`row-gap: ${theme.description["spacing"][props.y]}`],
    });
  }
  cls.forEach(({ className, properties }) => {
    theme.insertRule(className, properties);
  });
  return cls.map((c) => c.className);
}

export const Gap = (props: FlowProps & GapProps) => {
  const theme = useMugenThemeContext();
  theme.add("gap", () => themeGapHandler(theme, props));
  return props.children;
};
