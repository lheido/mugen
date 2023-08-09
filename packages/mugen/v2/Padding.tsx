import { FlowProps } from "solid-js";
import { ThemeDescription } from "../theme";
import { MugenTheme } from "./MugenTheme";
import { useMugenThemeContext } from "./context";
import { escapeClassName } from "./escapeClassName";

export type PaddingProps = {
  value?: keyof ThemeDescription["spacing"];
  top: keyof ThemeDescription["spacing"];
  right: keyof ThemeDescription["spacing"];
  bottom: keyof ThemeDescription["spacing"];
  left: keyof ThemeDescription["spacing"];
  x?: keyof ThemeDescription["spacing"];
  y?: keyof ThemeDescription["spacing"];
};

export function themePaddingHandler(theme: MugenTheme, props: PaddingProps) {
  const cls: { className: string; properties: string[] }[] = [];
  if (props.value) {
    cls.push({
      className: escapeClassName(`p-${props.value}`),
      properties: [`padding: ${theme.description["spacing"][props.value]}`],
    });
  }
  if (props.top) {
    cls.push({
      className: escapeClassName(`pt-${props.top}`),
      properties: [`padding-top: ${theme.description["spacing"][props.top]}`],
    });
  }
  if (props.right) {
    cls.push({
      className: escapeClassName(`pr-${props.right}`),
      properties: [
        `padding-right: ${theme.description["spacing"][props.right]}`,
      ],
    });
  }
  if (props.bottom) {
    cls.push({
      className: escapeClassName(`pb-${props.bottom}`),
      properties: [
        `padding-bottom: ${theme.description["spacing"][props.bottom]}`,
      ],
    });
  }
  if (props.left) {
    cls.push({
      className: escapeClassName(`pl-${props.left}`),
      properties: [`padding-left: ${theme.description["spacing"][props.left]}`],
    });
  }
  if (props.x) {
    cls.push({
      className: escapeClassName(`px-${props.x}`),
      properties: [
        `padding-left: ${theme.description["spacing"][props.x]}`,
        `padding-right: ${theme.description["spacing"][props.x]}`,
      ],
    });
  }
  if (props.y) {
    cls.push({
      className: escapeClassName(`py-${props.y}`),
      properties: [
        `padding-top: ${theme.description["spacing"][props.y]}`,
        `padding-bottom: ${theme.description["spacing"][props.y]}`,
      ],
    });
  }
  cls.forEach(({ className, properties }) => {
    theme.insertRule(className, properties);
  });
  return cls.map((c) => c.className);
}

export const Padding = (props: FlowProps & PaddingProps) => {
  const theme = useMugenThemeContext();
  theme.add("gap", () => themePaddingHandler(theme, props));
  return props.children;
};
