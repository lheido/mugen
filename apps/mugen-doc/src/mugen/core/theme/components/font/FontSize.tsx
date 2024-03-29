import { FlowProps, splitProps } from "solid-js";
import { HandlerRuleData, ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";

export type FontSizeProps = {
  value?: keyof ThemeDescription["fontSize"];
};

export function themeFontSizeHandler(theme: MugenTheme, props: FontSizeProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const className = `fz-${props.value as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      let values = (theme.description as any)["fontSize"][props.value];
      values = Array.isArray(values) ? values : [values];
      cls.push({
        className,
        properties: values.map((value: string | { raw: string }) =>
          typeof value === "string" ? `font-size: ${value}` : value.raw
        ),
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

export const FONT_SIZE_KEY = "fontSize";

export const FontSize = (props: FlowProps & FontSizeProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(FONT_SIZE_KEY, () => themeFontSizeHandler(theme, local));
  return flow.children;
};
