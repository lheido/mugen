import { FlowProps } from "solid-js";
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
  const theme = useMugenThemeContext();
  theme.add(FLEX_LAYOUT_KEY, () => themeDisplayFlexHandler(theme));
  if (props.justify) {
    theme.add(JUSTIFY_CONTENT_KEY, () => themeJustifyContentHandler(theme, { value: props.justify }));
  }
  if (props.items) {
    theme.add(ALIGN_ITEMS_KEY, () => themeAlignItemsHandler(theme, { value: props.items }));
  }
  if (props.gap) {
    theme.add(GAP_KEY, () => themeGapHandler(theme, { value: props.gap }));
  }
  if (props.column || props.reverse) {
    theme.add(FLEX_DIRECTION_KEY, () =>
      themeFlexDirectionHandler(theme, { column: props.column, reverse: props.reverse })
    );
  }
  if (props.wrap || props.wrapReverse) {
    theme.add(FLEX_WRAP_KEY, () => themeFlexWrapHandler(theme, { wrap: props.wrap, reverse: props.wrapReverse }));
  }
  if (props.nowrap) {
    theme.add(FLEX_WRAP_KEY, () => themeFlexWrapHandler(theme, { nowrap: props.nowrap }));
  }
  return props.children;
};
