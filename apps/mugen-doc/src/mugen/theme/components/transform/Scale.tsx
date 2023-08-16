import { FlowProps, splitProps } from "solid-js";
import { Either, PseudoClasses, ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";

export type ScaleProps<K = keyof ThemeDescription["transformScale"]> = Either<
  Partial<Record<"value" | `value:${PseudoClasses}`, K>>,
  Partial<Record<"x" | `x:${PseudoClasses}` | "y" | `y:${PseudoClasses}`, K>>
>;

export function themeScaleHandler(theme: MugenTheme, props: ScaleProps) {
  const cls: { className: string; properties: string[]; pseudoClass?: PseudoClasses }[] = [];
  const result: Record<string, boolean> = {};
  Object.entries(props).forEach(([key, value]) => {
    let [k, pseudoClass] = key.split(":") as [string, PseudoClasses | undefined];
    const rootCls = "scale";
    result[rootCls] = true;
    if (!theme.classExists(rootCls)) {
      cls.push({
        className: rootCls,
        properties: [`scale: var(--mugen-scale-x, 1) var(--mugen-scale-y, 1)`],
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
    cls.forEach(({ className, properties, pseudoClass }) => {
      theme.insertRule(className, properties, pseudoClass);
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
