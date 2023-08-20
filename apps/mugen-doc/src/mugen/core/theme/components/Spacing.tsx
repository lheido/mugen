import { FlowProps, splitProps } from "solid-js";
import { Either, HandlerRuleData, ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";
import { getNegative, getValue } from "../utils/handler";

export type SpacingProps<
  K = keyof ThemeDescription["spacing"],
  V = K | `-${K extends string ? K : never}` | "auto"
> = Either<
  {
    top?: V;
    right?: V;
    bottom?: V;
    left?: V;
    x?: V;
    y?: V;
  },
  { value?: V }
>;

export type SpacingType = "padding" | "margin";

export function themeSpacingHandler(theme: MugenTheme, props: SpacingProps, prop: SpacingType) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  const prefix = prop[0];

  const processProp = (key: keyof SpacingProps, suffix: string, properties: string[]) => {
    if (!props[key]) return;
    const negative = getNegative(props[key]!);
    const value = getValue(props[key]!) as keyof ThemeDescription["spacing"];
    const className = `${negative}${prefix}${suffix}-${value}`;
    result[className] = true;
    if (theme.classExists(className)) return;
    cls.push({
      className,
      properties: properties.map(
        (property: string) => `${property}: ${negative}${theme.description["spacing"][value] ?? value}`
      ),
    });
  };

  processProp("value", "", [prop]);
  processProp("top", "t", [`${prop}-top`]);
  processProp("right", "r", [`${prop}-right`]);
  processProp("bottom", "b", [`${prop}-bottom`]);
  processProp("left", "l", [`${prop}-left`]);
  processProp("x", "x", [`${prop}-left`, `${prop}-right`]);
  processProp("y", "y", [`${prop}-top`, `${prop}-bottom`]);

  if (cls.length > 0) {
    cls.forEach((data) => {
      theme.insertRule(data);
    });
  }
  return result;
}

export const Spacing = (props: FlowProps & SpacingProps & { type: SpacingType }) => {
  const [flow, type, local] = splitProps(props, ["children"], ["type"]);
  const theme = useMugenThemeContext();
  theme.add(type.type, () => themeSpacingHandler(theme, local as SpacingProps, type.type));
  return flow.children;
};

export const Padding = (props: FlowProps & SpacingProps) => <Spacing {...props} type="padding" />;

export const Margin = (props: FlowProps & SpacingProps) => <Spacing {...props} type="margin" />;
