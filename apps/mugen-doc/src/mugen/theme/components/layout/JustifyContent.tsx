import { FlowProps } from "solid-js";
import { Either, HandlerRuleData, Split } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { FLEX_LAYOUT_KEY, themeDisplayFlexHandler } from "./displayFlexHandler";

export type JustifyContentValues = "start" | "end" | "center" | "between" | "around" | "evenly";

export type AvailableJustifyContentProps = Either<
  {
    [k in JustifyContentValues]?: boolean;
  },
  { value?: JustifyContentValues }
>;

export type JustifyContentProps = Split<AvailableJustifyContentProps>;

export function themeJustifyContentHandler(theme: MugenTheme, props: JustifyContentProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  const value =
    props?.value || props?.start
      ? "start"
      : props?.end
      ? "end"
      : props?.center
      ? "center"
      : props?.between
      ? "between"
      : props?.around
      ? "around"
      : props?.evenly
      ? "evenly"
      : undefined;
  if (value) {
    const className = `justify-${value}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`justify-content: ${(theme.description as any)["justifyContent"][value]}`],
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

export const JUSTIFY_CONTENT_KEY = "justifyContent";

export const JustifyContent = (props: FlowProps & JustifyContentProps) => {
  const theme = useMugenThemeContext();
  theme.add(FLEX_LAYOUT_KEY, () => themeDisplayFlexHandler(theme));
  theme.add(JUSTIFY_CONTENT_KEY, () => themeJustifyContentHandler(theme, props));
  return props.children;
};
