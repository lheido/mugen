import { FlowProps, splitProps } from "solid-js";
import { useMugenThemeContext } from "../../context";
import { FontSizeProps, FONT_SIZE_KEY, themeFontSizeHandler } from "./FontSize";
import { FontWeightProps, FONT_WEIGHT_KEY, themeFontWeightHandler } from "./FontWeight";

export type FontProps = {
  size?: FontSizeProps["value"];
  weight?: FontWeightProps["value"];
};

export const Font = (props: FlowProps & FontProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  if (local.size) {
    theme.add(FONT_SIZE_KEY, () => themeFontSizeHandler(theme, { value: local.size }));
  }
  if (local.weight) {
    theme.add(FONT_WEIGHT_KEY, () => themeFontWeightHandler(theme, { value: local.weight }));
  }
  return flow.children;
};
