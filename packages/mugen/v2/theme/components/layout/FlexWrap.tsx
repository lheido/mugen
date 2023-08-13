import { FlowProps } from "solid-js";
import { Either, ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { themeDisplayFlexHandler } from "./displayFlexHandler";

export type FlexWrapProps = {
  reverse?: boolean;
} & Either<{ wrap?: boolean }, { nowrap?: boolean }>;

export function themeFlexWrapHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: FlexWrapProps) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.wrap) {
    const className = `flex-wrap`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-wrap: wrap`],
      });
    }
  }
  if (props.nowrap) {
    const className = `flex-nowrap`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-wrap: nowrap`],
      });
    }
  }
  if (props.wrap && props.reverse) {
    const className = `flex-wrap-reverse`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-wrap: wrap-reverse`],
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

export const FlexWrap = <T extends ThemeDescription>(props: FlowProps & FlexWrapProps) => {
  const theme = useMugenThemeContext();
  theme.add("flex", () => themeDisplayFlexHandler(theme));
  theme.add("flexWrap", () => themeFlexWrapHandler(theme, props));
  return props.children;
};
