import { FlowProps, splitProps } from "solid-js";
import { HandlerRuleData, ThemeDescription } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { MugenTheme } from "../../MugenTheme";
import { getNegative, getValue } from "../../utils/handler";

export type TranslateProps<K = keyof ThemeDescription["spacing"], V = K | `-${K extends string ? K : never}`> = {
  x?: V;
  y?: V;
};

export function themeTranslateHandler(theme: MugenTheme, props: TranslateProps) {
  const cls: HandlerRuleData[] = [];
  const result: Record<string, boolean> = {};
  if (props.x || props.y) {
    result["translate"] = true;
    if (!theme.classExists("translate")) {
      cls.push({
        className: "translate",
        properties: [`translate: var(--mugen-translate-x, 0) var(--mugen-translate-y, 0)`],
      });
    }
    if (props.x) {
      const negative = getNegative(props.x);
      const value = getValue(props.x) as keyof ThemeDescription["spacing"];
      const className = `${negative}translate-x-${value}`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          properties: [`--mugen-translate-x: ${negative}${theme.description["spacing"][value] ?? value}`],
        });
      }
    }
    if (props.y) {
      const negative = getNegative(props.y);
      const value = getValue(props.y) as keyof ThemeDescription["spacing"];
      const className = `${negative}translate-y-${value}`;
      result[className] = true;
      if (!theme.classExists(className)) {
        cls.push({
          className,
          properties: [`--mugen-translate-y: ${negative}${theme.description["spacing"][value] ?? value}`],
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

export const TRANSLATE_KEY = "translate";

export const Translate = (props: FlowProps & TranslateProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(TRANSLATE_KEY, () => themeTranslateHandler(theme, local));
  return flow.children;
};
