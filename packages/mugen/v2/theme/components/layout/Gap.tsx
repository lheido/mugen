import { FlowProps } from "solid-js";
import { Either, ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { themeDisplayFlexHandler } from "./displayFlexHandler";

export type GapProps<T extends ThemeDescription> = Either<
  {
    x?: keyof T["spacing"];
    y?: keyof T["spacing"];
  },
  { value?: keyof T["spacing"] }
>;

export function themeGapHandler<T extends ThemeDescription>(theme: MugenTheme<T>, props: GapProps<T>) {
  const cls: { className: string; properties: string[] }[] = [];
  const result: string[] = [];
  if (props.value) {
    const className = `gap-${props.value as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`gap: ${(theme.description as any)["spacing"][props.value]}`],
      });
    }
  }
  if (props.x) {
    const className = `gap-x-${props.x as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`column-gap: ${(theme.description as any)["spacing"][props.x]}`],
      });
    }
  }
  if (props.y) {
    const className = `gap-y-${props.y as string}`;
    result.push(className);
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`row-gap: ${(theme.description as any)["spacing"][props.y]}`],
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

export const Gap = <T extends ThemeDescription>(props: FlowProps & GapProps<T>) => {
  const theme = useMugenThemeContext<T>();
  if (props.value !== undefined) {
    theme.add("flex", () => themeDisplayFlexHandler<T>(theme));
  } else {
    console.warn("TODO: implement grid handler");
  }
  theme.add("gap", () => themeGapHandler<T>(theme, props));
  return props.children;
};
