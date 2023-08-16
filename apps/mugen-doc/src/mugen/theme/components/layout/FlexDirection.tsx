import { FlowProps } from "solid-js";
import { HandlerRuleData } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { FLEX_LAYOUT_KEY, themeDisplayFlexHandler } from "./displayFlexHandler";

export type FlexDirectionProps = {
  reverse?: boolean;
  column?: boolean;
};

export function themeFlexDirectionHandler(theme: MugenTheme, props: FlexDirectionProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.column) {
    const className = `flex-col`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-direction: column`],
      });
    }
  }
  if (props.column && props.reverse) {
    const className = `flex-col-reverse`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-direction: column-reverse`],
      });
    }
  }
  if (props.reverse && !props.column) {
    const className = `flex-row-reverse`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-direction: row-reverse`],
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

export const FLEX_DIRECTION_KEY = "flexDirection";

export const FlexDirection = (props: FlowProps & FlexDirectionProps) => {
  const theme = useMugenThemeContext();
  theme.add(FLEX_LAYOUT_KEY, () => themeDisplayFlexHandler(theme));
  theme.add(FLEX_DIRECTION_KEY, () => themeFlexDirectionHandler(theme, props));
  return props.children;
};

export const Row = (props: FlowProps & Omit<FlexDirectionProps, "column">) => {
  return <FlexDirection {...props} />;
};

export const Column = (props: FlowProps & Omit<FlexDirectionProps, "column">) => {
  return <FlexDirection {...props} column />;
};
