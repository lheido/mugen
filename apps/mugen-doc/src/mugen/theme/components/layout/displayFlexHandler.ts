import { MugenTheme } from "../../MugenTheme";

export const FLEX_LAYOUT_KEY = "displayFlex";

export function themeDisplayFlexHandler(theme: MugenTheme) {
  if (!theme.classExists("flex")) {
    theme.insertRule("flex", ["display: flex"]);
  }
  return { flex: true };
}
