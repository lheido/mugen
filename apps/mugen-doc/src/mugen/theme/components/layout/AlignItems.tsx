import { FlowProps } from "solid-js";
import { Either, HandlerRuleData, Split } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { FLEX_LAYOUT_KEY, themeDisplayFlexHandler } from "./displayFlexHandler";

export type AlignItemsValues = "start" | "end" | "center" | "baseline" | "stretch";

export type AvailableAlignItemsProps = Either<
  {
    [k in AlignItemsValues]?: boolean;
  },
  { value?: AlignItemsValues }
>;

export type AlignItemsProps = Split<AvailableAlignItemsProps>;

export function themeAlignItemsHandler(theme: MugenTheme, props: AlignItemsProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  const value =
    props?.value || props?.start
      ? "start"
      : props?.end
      ? "end"
      : props?.center
      ? "center"
      : props?.baseline
      ? "baseline"
      : props?.stretch
      ? "stretch"
      : undefined;
  if (value) {
    const className = `items-${value}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`align-items: ${(theme.description as any)["alignItems"][value]}`],
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

export const ALIGN_ITEMS_KEY = "alignItems";

export const AlignItems = (props: FlowProps & AlignItemsProps) => {
  const theme = useMugenThemeContext();
  theme.add(FLEX_LAYOUT_KEY, () => themeDisplayFlexHandler(theme));
  theme.add(ALIGN_ITEMS_KEY, () => themeAlignItemsHandler(theme, props));
  return props.children;
};
