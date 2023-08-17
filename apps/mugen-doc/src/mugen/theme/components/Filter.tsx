import { FlowProps, splitProps } from "solid-js";
import { HandlerRuleData } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type FilterProps = {
  blur?: `${number}`;
};

export function themeFilterHandler(theme: MugenTheme, props: FilterProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.blur) {
    const className = `blur-${props.blur}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`filter: blur(${props.blur}px)`],
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

export const Filter = (props: FlowProps & FilterProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add("filter", () => themeFilterHandler(theme, local));
  return flow.children;
};
