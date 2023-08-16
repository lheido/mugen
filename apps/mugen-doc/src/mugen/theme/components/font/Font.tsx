import { FlowProps } from "solid-js";
import { useMugenThemeContext } from "../../context";
import { FontSizeProps, themeFontSizeHandler } from "./FontSize";
import { FontWeightProps, themeFontWeightHandler } from "./FontWeight";

export type FontProps = {
  size?: FontSizeProps["value"];
  weight?: FontWeightProps["value"];
};

export const Font = (props: FlowProps & FontProps) => {
  const theme = useMugenThemeContext();
  if (props.size) {
    theme.add("fontSize", () => themeFontSizeHandler(theme, { value: props.size }));
  }
  if (props.weight) {
    theme.add("fontWeight", () => themeFontWeightHandler(theme, { value: props.weight }));
  }
  return props.children;
};
