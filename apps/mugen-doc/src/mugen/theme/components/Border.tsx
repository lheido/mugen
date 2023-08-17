import { FlowProps, splitProps } from "solid-js";
import { HandlerRuleData, ThemeDescription, WithPseudoClasse } from "../../types";
import { useMugenThemeContext } from "../context";
import { MugenTheme } from "../MugenTheme";
import { getKeyAndModifier } from "../utils/handler";

export type BorderProps = Partial<
  Record<WithPseudoClasse<"color">, keyof ThemeDescription["colors"]> &
    Record<WithPseudoClasse<"width">, keyof ThemeDescription["borderWidth"]> &
    Record<WithPseudoClasse<"style">, keyof ThemeDescription["borderStyle"]>
>;

export type BorderEdges = "top" | "right" | "bottom" | "left";

export function themeBorderHandler(theme: MugenTheme, props: BorderProps, edge?: BorderEdges) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  const baseCls = `border-${edge ? `${edge?.[0]}-` : ""}`;
  const baseProp = `border-${edge ? `${edge}-` : ""}`;
  Object.entries(props).forEach(([key, value]) => {
    const [k, pseudoClass] = getKeyAndModifier(key);
    const psdCls = pseudoClass ? `${pseudoClass}:` : "";
    if (k === "color") {
      const className = `${psdCls}${baseCls}${value}`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          pseudoClass,
          properties: [`${baseProp}color: var(--mugen-color-${value})`],
        });
      }
    }
    if (k === "width") {
      const className = `${psdCls}${baseCls}width-${value}`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          pseudoClass,
          properties: [
            `${baseProp}width: ${
              theme.description["borderWidth"][value as keyof ThemeDescription["borderWidth"]] ?? value
            }`,
          ],
        });
      }
    }
    if (k === "style") {
      const className = `${psdCls}${baseCls}style-${value}`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          pseudoClass,
          properties: [
            `${baseProp}style: ${
              theme.description["borderStyle"][value as keyof ThemeDescription["borderStyle"]] ?? value
            }`,
          ],
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

export const BORDER_KEY = "border";
export const BORDER_TOP_KEY = "borderTop";
export const BORDER_RIGHT_KEY = "borderRight";
export const BORDER_BOTTOM_KEY = "borderBottom";
export const BORDER_LEFT_KEY = "borderLeft";

export const Border = (props: FlowProps & BorderProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(BORDER_KEY, () => themeBorderHandler(theme, local));
  return flow.children;
};

export const BorderTop = (props: FlowProps & BorderProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(BORDER_TOP_KEY, () => themeBorderHandler(theme, local, "top"));
  return flow.children;
};

export const BorderRight = (props: FlowProps & BorderProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(BORDER_RIGHT_KEY, () => themeBorderHandler(theme, local, "right"));
  return flow.children;
};

export const BorderBottom = (props: FlowProps & BorderProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(BORDER_BOTTOM_KEY, () => themeBorderHandler(theme, local, "bottom"));
  return flow.children;
};

export const BorderLeft = (props: FlowProps & BorderProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(BORDER_LEFT_KEY, () => themeBorderHandler(theme, local, "left"));
  return flow.children;
};
