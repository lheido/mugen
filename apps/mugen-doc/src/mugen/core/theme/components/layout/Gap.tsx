import { FlowProps, splitProps } from "solid-js";
import { Either, HandlerRuleData, ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { FLEX_LAYOUT_KEY, themeDisplayFlexHandler } from "./displayFlexHandler";

export type GapValues = keyof ThemeDescription["spacing"];

export type GapProps = Either<
  {
    x?: GapValues;
    y?: GapValues;
  },
  { value?: GapValues }
>;

export function themeGapHandler(theme: MugenTheme, props: GapProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const className = `gap-${props.value as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`gap: ${(theme.description as any)["spacing"][props.value]}`],
      });
    }
  }
  if (props.x) {
    const className = `gap-x-${props.x as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`column-gap: ${(theme.description as any)["spacing"][props.x]}`],
      });
    }
  }
  if (props.y) {
    const className = `gap-y-${props.y as string}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`row-gap: ${(theme.description as any)["spacing"][props.y]}`],
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

export const GAP_KEY = "gap";

export const Gap = (props: FlowProps & GapProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  if (props.value !== undefined) {
    theme.add(FLEX_LAYOUT_KEY, () => themeDisplayFlexHandler(theme));
  } else {
    console.warn("TODO: implement grid handler");
  }
  theme.add(GAP_KEY, () => themeGapHandler(theme, local as GapProps));
  return flow.children;
};
