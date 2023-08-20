import { FlowProps, splitProps } from "solid-js";
import { HandlerRuleData, ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";
import { getNegative, getValue } from "../utils/handler";

export type PositionProps<K = keyof ThemeDescription["spacing"], V = K | `-${K extends string ? K : never}`> = {
  top?: V;
  right?: V;
  bottom?: V;
  left?: V;
  zIndex?: `${number}` | `-${number}`;
};

export type PositionType = "relative" | "absolute" | "fixed" | "static" | "sticky";

export function themePositionHandler(theme: MugenTheme, props: PositionProps, prop: PositionType) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  result[prop] = true;
  if (!theme.classExists(prop)) {
    cls.push({
      className: prop,
      properties: [`position: ${prop}`],
    });
  }

  const processProp = (key: keyof Omit<PositionProps, "zIndex">, properties: string[]) => {
    if (!props[key]) return;
    const negative = getNegative(props[key]!);
    const value = getValue(props[key]!) as keyof ThemeDescription["spacing"];
    const className = `${negative}${key}-${value}`;
    result[className] = true;
    if (theme.classExists(className)) return;
    cls.push({
      className,
      properties: properties.map((property: string) => `${property}: ${theme.description["spacing"][value] ?? value}`),
    });
  };

  processProp("top", ["top"]);
  processProp("right", ["right"]);
  processProp("bottom", ["bottom"]);
  processProp("left", ["left"]);

  if (props.zIndex) {
    const negative = getNegative(props.zIndex);
    const className = `${negative}z-${props.zIndex}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`z-index: ${negative}${props.zIndex}`],
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

export const Position = (props: FlowProps & PositionProps & { type: PositionType }) => {
  const [flow, type, local] = splitProps(props, ["children"], ["type"]);
  const theme = useMugenThemeContext();
  theme.add(props.type, () => themePositionHandler(theme, local, type.type));
  return flow.children;
};

export const Relative = (props: FlowProps & PositionProps) => <Position {...props} type="relative" />;

export const Absolute = (props: FlowProps & PositionProps) => <Position {...props} type="absolute" />;

export const Fixed = (props: FlowProps & PositionProps) => <Position {...props} type="fixed" />;

export const Static = (props: FlowProps & PositionProps) => <Position {...props} type="static" />;

export const Sticky = (props: FlowProps & PositionProps) => <Position {...props} type="sticky" />;
