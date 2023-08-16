import { FlowProps, splitProps } from "solid-js";
import { Either, HandlerRuleData, ThemeDescription, WithPseudoClasse } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { getKeyAndModifier } from "../../utils/handler";

export type ScaleProps<K = keyof ThemeDescription["transformScale"]> = Either<
  Partial<Record<WithPseudoClasse<"value">, K>>,
  Partial<Record<WithPseudoClasse<"x"> | WithPseudoClasse<"y">, K>>
>;

export function themeScaleHandler(theme: MugenTheme, props: ScaleProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  Object.entries(props).forEach(([key, value]) => {
    const [k, pseudoClass] = getKeyAndModifier(key);
    const rootCls = `scale`;
    result[rootCls] = true;
    if (!theme.classExists(rootCls)) {
      const properties = [`scale: var(--mugen-scale-x, 1) var(--mugen-scale-y, 1)`];
      cls.push({
        className: rootCls,
        properties,
      });
    }
    if (k === "value") {
      const className = `${pseudoClass ? `${pseudoClass}:` : ""}scale-${value}`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          pseudoClass,
          properties: [
            `--mugen-scale-x: ${(theme.description as any)["transformScale"][value]}`,
            `--mugen-scale-y: ${(theme.description as any)["transformScale"][value]}`,
          ],
        });
      }
    }
    if (k === "x") {
      const className = `${pseudoClass ? `${pseudoClass}:` : ""}scale-x-${value}`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          pseudoClass,
          properties: [`--mugen-scale-x: ${(theme.description as any)["transformScale"][value]}`],
        });
      }
    }
    if (k === "y") {
      const className = `${pseudoClass ? `${pseudoClass}:` : ""}scale-y-${value}`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          pseudoClass,
          properties: [`--mugen-scale-y: ${(theme.description as any)["transformScale"][value]}`],
        });
      }
    }
  });
  if (cls.length > 0) {
    cls.forEach((data) => {
      theme.insertRule(data);
    });
  }
  return result;
}

export const SCALE_KEY = "scale";

export const Scale = (props: FlowProps & ScaleProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(SCALE_KEY, () => themeScaleHandler(theme, local as ScaleProps));
  return flow.children;
};
