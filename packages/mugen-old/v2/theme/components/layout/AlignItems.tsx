import { FlowProps } from "solid-js";
import { Either, Split, ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { themeDisplayFlexHandler } from "./displayFlexHandler";

type AlignItemsValues = "start" | "end" | "center" | "baseline" | "stretch";

type AvailableAlignItemsProps = Either<
  {
    [k in AlignItemsValues]?: boolean;
  },
  { value?: AlignItemsValues }
>;

export type AlignItemsProps = Split<AvailableAlignItemsProps>;

export function themeAlignItemsHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: AlignItemsProps) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
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
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`align-items: ${(theme.description as any)["alignItems"][value]}`],
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

export const AlignItems = <T extends ThemeDescription>(props: FlowProps & AlignItemsProps) => {
  const theme = useMugenThemeContext();
  theme.add("flex", () => themeDisplayFlexHandler(theme));
  theme.add("alignItems", () => themeAlignItemsHandler(theme, props));
  return props.children;
};
