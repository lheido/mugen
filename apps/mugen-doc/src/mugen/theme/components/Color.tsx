import { FlowProps, splitProps } from "solid-js";
import { Either, HandlerRuleData, ThemeDescription, WithPseudoClasse } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";
import { getKeyAndModifier } from "../utils/handler";

export type GradientDirectionValues = "bottom" | "top" | "left" | "right";

export type ColorProps<C = keyof ThemeDescription["colors"], O = keyof ThemeDescription["gradientOffset"]> = Either<
  Partial<Record<WithPseudoClasse<"value">, C>>,
  {
    from?: C;
    to?: C;
    direction?: GradientDirectionValues;
    fromOffset?: O;
    toOffset?: O;
  }
>;

export type ColorType = "color" | "background-color";

export function themeColorHandler(
  theme: MugenTheme,
  props: ColorProps,
  prop: ColorType,
  useAutoContentColor?: boolean
) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  const prefix = prop === "color" ? "text" : "bg";
  Object.entries(props).forEach(([key, value]) => {
    const [k, pseudoClass] = getKeyAndModifier(key);
    if (k === "value") {
      const className = `${pseudoClass ? `${pseudoClass}:` : ""}${prefix}-${value}${
        useAutoContentColor ? "-content" : ""
      }`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          pseudoClass,
          properties: [`${prop}: var(--mugen-color-${value}${useAutoContentColor ? "-content" : ""})`],
        });
      }
    }
  });
  if (props.from) {
    const rootCls = `${prefix}-gradient`;
    result[rootCls] = true;
    if (!theme.classExists(rootCls)) {
      cls.push({
        className: rootCls,
        properties: [
          `background-image: linear-gradient(to var(--mugen-gradient-direction, left), var(--mugen-gradient-from, transparent) var(--mugen-gradient-from-offset, 0%), var(--mugen-gradient-to, transparent) var(--mugen-gradient-to-offset, 100%))`,
          ...(prop === "color"
            ? [
                "background-repeat: repeat",
                "background-size: 100%",
                "background-clip: text",
                "-webkit-background-clip: text",
                "color: transparent",
              ]
            : []),
        ],
      });
    }
    const fromCls = `from-${props.from}`;
    result[fromCls] = true;
    if (!theme.classExists(fromCls)) {
      cls.push({
        className: fromCls,
        properties: [`--mugen-gradient-from: var(--mugen-color-${props.from})`],
      });
    }
    if (props.to) {
      const toCls = `to-${props.to}`;
      result[toCls] = true;
      if (!theme.classExists(toCls)) {
        cls.push({
          className: toCls,
          properties: [`--mugen-gradient-to: var(--mugen-color-${props.to})`],
        });
      }
    }
    if (props.direction) {
      const directionCls = `direction-${props.direction}`;
      result[directionCls] = true;
      if (!theme.classExists(directionCls)) {
        cls.push({
          className: directionCls,
          properties: [`--mugen-gradient-direction: ${props.direction}`],
        });
      }
    }
    if (props.fromOffset) {
      const fromOffsetCls = `from-offset-${props.fromOffset}`;
      result[fromOffsetCls] = true;
      if (!theme.classExists(fromOffsetCls)) {
        cls.push({
          className: fromOffsetCls,
          properties: [
            `--mugen-gradient-from-offset: ${
              theme.description["gradientOffset"][props.fromOffset] ?? props.fromOffset
            }`,
          ],
        });
      }
    }
    if (props.toOffset) {
      const toOffsetCls = `to-offset-${props.toOffset}`;
      result[toOffsetCls] = true;
      if (!theme.classExists(toOffsetCls)) {
        cls.push({
          className: toOffsetCls,
          properties: [
            `--mugen-gradient-to-offset: ${theme.description["gradientOffset"][props.toOffset] ?? props.toOffset}`,
          ],
        });
      }
    }
  }

  if (cls.length > 0) {
    cls.forEach((data) => {
      theme.insertRule(data);
    });
  }

  return result;
}

export const Color = (props: ColorProps & FlowProps) => {
  const theme = useMugenThemeContext();
  theme.add("color", () => themeColorHandler(theme, props, "color"));
  return props.children;
};

export const BackgroundColor = (
  props: ColorProps &
    FlowProps & {
      disableAutoColor?: boolean;
    }
) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add("bgColor", () => themeColorHandler(theme, local as ColorProps, "background-color"));
  if (!props.disableAutoColor) {
    theme.add("color", () => themeColorHandler(theme, local as ColorProps, "color", true));
  }
  return flow.children;
};
