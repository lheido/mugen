import { FlowProps, splitProps } from "solid-js";
import { Either } from "../../../types";
import { useMugenThemeContext } from "../../context";
import { AlignItemsValues, ALIGN_ITEMS_KEY, themeAlignItemsHandler } from "./AlignItems";
import { FLEX_LAYOUT_KEY, themeDisplayFlexHandler } from "./displayFlexHandler";
import { FLEX_DIRECTION_KEY, themeFlexDirectionHandler } from "./FlexDirection";
import { FLEX_WRAP_KEY, themeFlexWrapHandler } from "./FlexWrap";
import { GapValues, GAP_KEY, themeGapHandler } from "./Gap";
import { JustifyContentValues, JUSTIFY_CONTENT_KEY, themeJustifyContentHandler } from "./JustifyContent";

export type ThemeLayoutProps = {
  justify?: JustifyContentValues;
  items?: AlignItemsValues;
  gap?: GapValues;
  column?: boolean;
  reverse?: boolean;
} & Either<{ wrap?: boolean; wrapReverse?: boolean }, { nowrap?: boolean }>;

export const ThemeLayout = (props: FlowProps & ThemeLayoutProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const theme = useMugenThemeContext();
  theme.add(FLEX_LAYOUT_KEY, () => themeDisplayFlexHandler(theme));
  if (local.justify) {
    theme.add(JUSTIFY_CONTENT_KEY, () => themeJustifyContentHandler(theme, { value: local.justify }));
  }
  if (local.items) {
    theme.add(ALIGN_ITEMS_KEY, () => themeAlignItemsHandler(theme, { value: local.items }));
  }
  if (local.gap) {
    theme.add(GAP_KEY, () => themeGapHandler(theme, { value: local.gap }));
  }
  if (local.column || local.reverse) {
    theme.add(FLEX_DIRECTION_KEY, () =>
      themeFlexDirectionHandler(theme, { column: local.column, reverse: local.reverse })
    );
  }
  if (local.wrap || local.wrapReverse) {
    theme.add(FLEX_WRAP_KEY, () => themeFlexWrapHandler(theme, { wrap: local.wrap, reverse: local.wrapReverse }));
  }
  if (local.nowrap) {
    theme.add(FLEX_WRAP_KEY, () => themeFlexWrapHandler(theme, { nowrap: local.nowrap }));
  }
  return flow.children;
};
