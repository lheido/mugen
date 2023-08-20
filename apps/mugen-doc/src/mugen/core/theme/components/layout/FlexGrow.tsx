import { FlowProps, splitProps } from "solid-js";
import { HandlerRuleData } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";

export type FlexGrowProps = {
  value: number;
};

export function themeFlexGrowHandler(theme: MugenTheme, props: FlexGrowProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const className = `flex-grow-${props.value}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`flex-grow: ${props.value}`],
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

export const FlexGrow = (props: FlowProps & FlexGrowProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add("flexGrow", () => themeFlexGrowHandler(theme, local));
  return flow.children;
};

export const Fill = (props: FlowProps) => {
  return <FlexGrow value={1} {...props} />;
};
