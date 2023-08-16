import { FlowProps } from "solid-js";
import { ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { themeDisplayFlexHandler } from "./displayFlexHandler";

export type FlexDirectionProps = {
  reverse?: boolean;
  column?: boolean;
};

export function themeFlexDirectionHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: FlexDirectionProps) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.column) {
    const className = `flex-col`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-direction: column`],
      });
    }
  }
  if (props.column && props.reverse) {
    const className = `flex-col-reverse`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-direction: column-reverse`],
      });
    }
  }
  if (props.reverse && !props.column) {
    const className = `flex-row-reverse`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-direction: row-reverse`],
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

export const FlexDirection = <T extends ThemeDescription>(props: FlowProps & FlexDirectionProps) => {
  const theme = useMugenThemeContext();
  theme.add("flex", () => themeDisplayFlexHandler(theme));
  theme.add("flexDirection", () => themeFlexDirectionHandler(theme, props));
  return props.children;
};

export const Row = <T extends ThemeDescription>(props: FlowProps & Omit<FlexDirectionProps, "column">) => {
  return <FlexDirection {...props} />;
};

export const Column = <T extends ThemeDescription>(props: FlowProps & Omit<FlexDirectionProps, "column">) => {
  return <FlexDirection {...props} column />;
};
