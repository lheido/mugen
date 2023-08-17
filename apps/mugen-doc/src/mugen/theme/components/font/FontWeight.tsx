import { FlowProps, splitProps } from "solid-js";
import { HandlerRuleData, ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";

export type FontWeightProps = {
  value?: keyof ThemeDescription["fontWeight"];
};

export function themeFontWeightHandler(theme: MugenTheme, props: FontWeightProps) {
  const cls: HandlerRuleData[] = [];
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
    cls.forEach((data) => {
      theme.insertRule(data);
    });
  }
  return result;
}

export const FONT_WEIGHT_KEY = "fontWeight";

export const FontWeight = (props: FlowProps & FontWeightProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(FONT_WEIGHT_KEY, () => themeFontWeightHandler(theme, local));
  return flow.children;
};
