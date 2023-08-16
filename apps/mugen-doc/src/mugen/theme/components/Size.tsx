import { FlowProps } from "solid-js";
import { HandlerRuleData, ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type SizeProps = {
  value?: keyof ThemeDescription["sizes"];
  min?: keyof ThemeDescription["sizes"];
  max?: keyof ThemeDescription["sizes"];
};

export type SizeType = "width" | "height";

export function themeSizeHandler(theme: MugenTheme, props: SizeProps, prop: SizeType) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const className = `${prop[0]}-${props.value as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`${prop}: ${(theme.description as any)["sizes"][props.value]}`],
      });
    }
  }
  if (props.min) {
    const className = `min-${prop[0]}-${props.min as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`min-${prop}: ${(theme.description as any)["sizes"][props.min]}`],
      });
    }
  }
  if (props.max) {
    const className = `max-${prop[0]}-${props.max as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`max-${prop}: ${(theme.description as any)["sizes"][props.max]}`],
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

export const Width = (props: FlowProps & SizeProps) => {
  const theme = useMugenThemeContext();
  theme.add("width", () => themeSizeHandler(theme, props, "width"));
  return props.children;
};

export const Height = (props: FlowProps & SizeProps) => {
  const theme = useMugenThemeContext();
  theme.add("height", () => themeSizeHandler(theme, props, "height"));
  return props.children;
};
