import { ThemeDescription } from "../../../types";
import { MugenTheme } from "../../MugenTheme";

export function themeDisplayFlexHandler<T extends ThemeDescription>(
  theme: MugenTheme<T>
) {
  if (!theme.classExists("flex")) {
    theme.insertRule("flex", ["display: flex"]);
  }
  return ["flex"];
}
