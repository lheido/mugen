import { FlowProps, splitProps } from "solid-js";
import { Either, HandlerRuleData, ThemeDescription } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";

export type TransitionProps = Either<
  {
    value?: keyof ThemeDescription["transitionProperties"];
  },
  { all?: boolean; none?: boolean }
> & {
  duration?: keyof ThemeDescription["transitionDuration"];
  timing?: keyof ThemeDescription["transitionTimingFunction"];
};

export function themeTransitionHandler(theme: MugenTheme, props: TransitionProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.value) {
    const className = `transition-${props.value}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `transition: ${
            (theme.description as any)["transitionProperties"][props.value]
          } var(--mugen-transition-duration, 200ms) var(--mugen-transition-timing, linear)`,
        ],
      });
    }
  }
  if (props.all) {
    const className = "transition-all";
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`transition: all var(--mugen-transition-duration, 200ms) var(--mugen-transition-timing, linear)`],
      });
    }
  }
  if (props.none) {
    const className = "transition-none";
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [`transition: none`],
      });
    }
  }
  if (props.duration) {
    const className = `transition-duration-${props.duration}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `--mugen-transition-duration: ${(theme.description as any)["transitionDuration"][props.duration]}`,
        ],
      });
    }
  }
  if (props.timing) {
    const className = `transition-timing-${props.timing}`;
    result[className] = true;
    if (!theme.classExists(className)) {
      cls.push({
        className,
        properties: [
          `--mugen-transition-timing: ${(theme.description as any)["transitionTimingFunction"][props.timing]}`,
        ],
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

export const TRANSITION_KEY = "transition";

export const Transition = (props: FlowProps & TransitionProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(TRANSITION_KEY, () => themeTransitionHandler(theme, local as TransitionProps));
  return flow.children;
};
