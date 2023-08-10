import { FlowProps } from "solid-js";
import { Either, Split, ThemeDescription } from "../../../types";
import { MugenTheme } from "../../MugenTheme";
import { useMugenThemeContext } from "../../context";
import { themeDisplayFlexHandler } from "./displayFlexHandler";

type JustifyContentValues =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";

type AvailableJustifyContentProps = Either<
  {
    [k in JustifyContentValues]?: boolean;
  },
  { value?: JustifyContentValues }
>;

export type JustifyContentProps = Split<AvailableJustifyContentProps>;

export function themeJustifyContentHandler<T extends ThemeDescription>(
  theme: MugenTheme<T>,
  props: JustifyContentProps
) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
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
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `justify-content: ${
            (theme.description as any)["justifyContent"][value]
          }`,
        ],
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

export const JustifyContent = <T extends ThemeDescription>(
  props: FlowProps & JustifyContentProps
) => {
  const theme = useMugenThemeContext<T>();
  theme.add("flex", () => themeDisplayFlexHandler(theme));
  theme.add("justifyContent", () => themeJustifyContentHandler(theme, props));
  return props.children;
};
