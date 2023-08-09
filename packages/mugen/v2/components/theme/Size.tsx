import { FlowProps } from "solid-js";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { ThemeDescription } from "../../types";
import { escapeClassName } from "../../utils/escapeClassName";

export type SizeProps<T extends ThemeDescription> = {
  value?: keyof T["sizes"];
  min?: keyof T["sizes"];
  max?: keyof T["sizes"];
};

export type SizeType = "width" | "height";

export function themeSizeHandler<T extends ThemeDescription>(
  theme: MugenTheme<T>,
  props: SizeProps<T>,
  prop: SizeType
) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.value) {
    const className = escapeClassName(`${prop[0]}-${props.value as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `${prop}: ${(theme.description as any)["sizes"][props.value]}`,
        ],
      });
    }
  }
  if (props.min) {
    const className = escapeClassName(`min-${prop[0]}-${props.min as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `min-${prop}: ${(theme.description as any)["sizes"][props.min]}`,
        ],
      });
    }
  }
  if (props.max) {
    const className = escapeClassName(`max-${prop[0]}-${props.max as string}`);
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `max-${prop}: ${(theme.description as any)["sizes"][props.max]}`,
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

export const Width = <T extends ThemeDescription>(
  props: FlowProps & SizeProps<T>
) => {
  const theme = useMugenThemeContext<T>();
  theme.add("width", () => themeSizeHandler(theme, props, "width"));
  return props.children;
};

export const Height = <T extends ThemeDescription>(
  props: FlowProps & SizeProps<T>
) => {
  const theme = useMugenThemeContext<T>();
  theme.add("height", () => themeSizeHandler(theme, props, "height"));
  return props.children;
};
