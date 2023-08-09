import { FlowProps } from "solid-js";
import { ThemeDescription } from "../theme";
import { useMugenThemeContext } from "./context";

export const Gap = (
  props: FlowProps & {
    value?: keyof ThemeDescription["spacing"];
    x?: keyof ThemeDescription["spacing"];
    y?: keyof ThemeDescription["spacing"];
  }
) => {
  const theme: any = useMugenThemeContext();
  const handler = () => {
    const cls: { className: string; rule: string }[] = [];
    if (props.value) {
      cls.push({
        className: `gap-${props.value}`,
        rule: `gap: ${theme.description["spacing"][props.value]}`,
      });
    }
    if (props.x) {
      cls.push({
        className: `gap-x-${props.x}`,
        rule: `column-gap: ${theme.description["spacing"][props.x]}`,
      });
    }
    if (props.y) {
      cls.push({
        className: `gap-y-${props.y}`,
        rule: `row-gap: ${theme.description["spacing"][props.y]}`,
      });
    }
    cls.forEach(({ className, rule }) => {});
    // theme.insertRule();
  };
  theme.register("gap", {});
  return props.children;
};
