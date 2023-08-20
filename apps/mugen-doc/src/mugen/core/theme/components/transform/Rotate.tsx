import { FlowProps, splitProps } from "solid-js";
import { HandlerRuleData, ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { getNegative } from "../../utils/handler";

export type RotateProps<K = keyof ThemeDescription["transformRotate"], V = K | `-${K extends string ? K : never}`> = {
  value?: V;
};

export function themeRotateHandler(theme: MugenTheme, props: RotateProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const negative = getNegative(props.value);
    const className = `${negative}rotate-${props.value}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`rotate: ${negative}${(theme.description as any)["transformRotate"][props.value] ?? props.value}`],
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

export const ROTATE_KEY = "rotate";

export const Rotate = (props: FlowProps & RotateProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(ROTATE_KEY, () => themeRotateHandler(theme, local));
  return flow.children;
};
