import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type OpacityProps = {
  value?: keyof ThemeDescription["opacity"];
};

export function themeOpacityHandler(theme: MugenTheme, props: OpacityProps) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const className = `opacity-${props.value as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`opacity: ${(theme.description as any)["opacity"][props.value]}`],
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

export const Opacity = (props: FlowProps & OpacityProps) => {
  const theme = useMugenThemeContext();
  theme.add("opacity", () => themeOpacityHandler(theme, props));
  return props.children;
};
