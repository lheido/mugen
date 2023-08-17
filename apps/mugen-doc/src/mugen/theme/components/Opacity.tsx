import { FlowProps, splitProps } from "solid-js";
import { HandlerRuleData, ThemeDescription, WithPseudoClasse } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";
import { getKeyAndModifier } from "../utils/handler";

export type OpacityProps = Partial<Record<WithPseudoClasse<"value">, keyof ThemeDescription["opacity"]>>;

export function themeOpacityHandler(theme: MugenTheme, props: OpacityProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  Object.entries(props).forEach(([key, value]) => {
    const [k, pseudoClass] = getKeyAndModifier(key);
    const psdCls = pseudoClass ? `${pseudoClass}:` : "";
    if (k === "value") {
      const className = `${psdCls}opacity-${value}`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          pseudoClass,
          properties: [`opacity: ${(theme.description as any)["opacity"][value]}`],
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

export const Opacity = (props: FlowProps & OpacityProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add("opacity", () => themeOpacityHandler(theme, local));
  return flow.children;
};
