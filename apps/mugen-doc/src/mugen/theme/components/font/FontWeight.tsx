import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";

export type FontWeightProps = {
  value?: keyof ThemeDescription["fontWeight"];
};

export function themeFontWeightHandler(theme: MugenTheme, props: FontWeightProps) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const className = `fw-${props.value as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`font-weight: ${(theme.description as any)["fontWeight"][props.value]}`],
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

export const FontWeight = (props: FlowProps & FontWeightProps) => {
  const theme = useMugenThemeContext();
  theme.add("fontWeight", () => themeFontWeightHandler(theme, props));
  return props.children;
};
