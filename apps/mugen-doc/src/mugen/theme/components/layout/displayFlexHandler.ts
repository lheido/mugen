import { MugenTheme } from "../../MugenTheme";

export const FLEX_LAYOUT_KEY = "displayFlex";

export function themeDisplayFlexHandler(theme: MugenTheme) {
  if (!theme.classExists("flex")) {
    theme.insertRule({ className: "flex", properties: ["display: flex"] });
  }
  return { flex: true };
}
