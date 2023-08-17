import { FlowProps, splitProps } from "solid-js";
import { Either, HandlerRuleData } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { FLEX_LAYOUT_KEY, themeDisplayFlexHandler } from "./displayFlexHandler";

export type FlexWrapProps = {
  reverse?: boolean;
} & Either<{ wrap?: boolean }, { nowrap?: boolean }>;

export function themeFlexWrapHandler(theme: MugenTheme, props: FlexWrapProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.wrap) {
    const className = `flex-wrap`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-wrap: wrap`],
      });
    }
  }
  if (props.nowrap) {
    const className = `flex-nowrap`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-wrap: nowrap`],
      });
    }
  }
  if (props.wrap && props.reverse) {
    const className = `flex-wrap-reverse`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-wrap: wrap-reverse`],
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

export const FLEX_WRAP_KEY = "flexWrap";

export const FlexWrap = (props: FlowProps & FlexWrapProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(FLEX_LAYOUT_KEY, () => themeDisplayFlexHandler(theme));
  theme.add(FLEX_WRAP_KEY, () => themeFlexWrapHandler(theme, local as FlexWrapProps));
  return flow.children;
};
