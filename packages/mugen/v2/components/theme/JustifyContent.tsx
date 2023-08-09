import { FlowProps } from "solid-js";
import { Split } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { ThemeDescription } from "../../types";

type AvailableJustifyContentProps = {
  center?: boolean;
  end?: boolean;
  start?: boolean;
  between?: boolean;
  around?: boolean;
  evenly?: boolean;
  value?: "start" | "end" | "center" | "between" | "around" | "evenly";
};

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
  theme.add("justifyContent", () => themeJustifyContentHandler(theme, props));
  return props.children;
};
