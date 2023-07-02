export type ClassList = Record<string, boolean>;

export type ThemeDescription = {
  spacing: Record<string, string>;
  rounded: Record<string, string>;
  colors: Record<string, string>;
  sizes: Record<string, string>;
  breakpoints: Record<string, string>;
  borderWidth: Record<string, string>;
  borderStyle: Record<string, string>;
  flexBasis: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  shadow: Record<string, string>;
  transitionProperty: Record<string, string>;
  transitionDuration: Record<string, string>;
  transitionTimingFunction: Record<string, string>;
  transitionDelay: Record<string, string>;
  eventNames: Record<string, string>;
  themes: Record<string, Pick<ThemeDescription, "colors">>;
};

export type KeyOfSpacing<T extends ThemeDescription> =
  | keyof T["spacing"]
  | undefined;
export type KeyOfRounded<T extends ThemeDescription> =
  | keyof T["rounded"]
  | undefined;
export type KeyOfColors<T extends ThemeDescription> =
  | keyof T["colors"]
  | undefined;
export type KeyOfSizes<T extends ThemeDescription> =
  | keyof T["sizes"]
  | undefined;
export type KeyOfFlexBasis<T extends ThemeDescription> =
  | keyof T["flexBasis"]
  | undefined;
export type KeyOfEventNames<T extends ThemeDescription> = keyof T["eventNames"];
export type KeyOfBreakpoints<T extends ThemeDescription> =
  keyof T["breakpoints"];
export type KeyOfThemes<T extends ThemeDescription> = keyof T["themes"];
export type KeyOfBorderWidth<T extends ThemeDescription> =
  | keyof T["borderWidth"]
  | undefined;
export type KeyOfBorderStyle<T extends ThemeDescription> =
  | keyof T["borderStyle"]
  | undefined;
export type KeyOfFontSize<T extends ThemeDescription> =
  | keyof T["fontSize"]
  | undefined;
export type KeyOfFontWeight<T extends ThemeDescription> =
  | keyof T["fontWeight"]
  | undefined;
export type KeyOfShadow<T extends ThemeDescription> =
  | keyof T["shadow"]
  | undefined;
export type KeyOfTransitionProperty<T extends ThemeDescription> =
  | keyof T["transitionProperty"]
  | undefined;
export type KeyOfTransitionDuration<T extends ThemeDescription> =
  | keyof T["transitionDuration"]
  | undefined;
export type KeyOfTransitionTiming<T extends ThemeDescription> =
  | keyof T["transitionTimingFunction"]
  | undefined;
export type KeyOfTransitionDelay<T extends ThemeDescription> =
  | keyof T["transitionDelay"]
  | undefined;

export type BasicCssValue = "inherit" | "initial" | "unset";
export type ArrayExtactValues = "auto" | "extact";
export type ThemeArrayValues<
  S,
  L = 4,
  Z extends ArrayExtactValues = "auto"
> = L extends 4
  ? Z extends "auto"
    ? [S] | [S, S] | [S, S, S] | [S, S, S, S]
    : [S, S, S, S]
  : L extends 3
  ? Z extends "auto"
    ? [S] | [S, S] | [S, S, S]
    : [S, S, S]
  : L extends 2
  ? Z extends "auto"
    ? [S] | [S, S]
    : [S, S]
  : [S];
export type ThemeRecordValues<K extends string, S> = Partial<Record<K, S>>;

export type ThemePadding<T extends ThemeDescription> = Record<
  "padding" | "margin",
  | KeyOfSpacing<T>
  | ThemeArrayValues<KeyOfSpacing<T>>
  | ThemeRecordValues<
      "x" | "y" | "left" | "top" | "right" | "bottom",
      KeyOfSpacing<T>
    >
>;

export type ThemeRounded<T extends ThemeDescription> = Record<
  "rounded",
  | KeyOfRounded<T>
  | ThemeArrayValues<KeyOfRounded<T>>
  | ThemeRecordValues<
      "l" | "r" | "t" | "b" | "tl" | "tr" | "br" | "bl",
      KeyOfRounded<T>
    >
>;

export const themePositionsValues = [
  "relative",
  "absolute",
  "fixed",
  "sticky",
] as const;
export type ThemePosition<T extends ThemeDescription> = Record<
  (typeof themePositionsValues)[number],
  | ThemeArrayValues<KeyOfSpacing<T>>
  | ThemeRecordValues<"left" | "top" | "right" | "bottom", KeyOfSpacing<T>>
>;

export type ThemeGap<T extends ThemeDescription> = Record<
  "gap",
  | KeyOfSpacing<T>
  | ThemeArrayValues<KeyOfSpacing<T>, 2>
  | ThemeRecordValues<"x" | "y", KeyOfSpacing<T>>
>;

export type ThemeSize<T extends ThemeDescription> = Record<
  "width" | "height",
  | KeyOfSizes<T>
  | ThemeArrayValues<KeyOfSizes<T>, 3>
  | ThemeRecordValues<"min" | "max" | "_", KeyOfSizes<T>>
>;

export type ThemeBackground<T extends ThemeDescription> = Record<
  "background",
  | KeyOfColors<T>
  | {
      from: KeyOfColors<T>;
      to?: KeyOfColors<T>;
      linear: "bottom" | "top" | "left" | "right";
    }
>;
export type ThemeColor<T extends ThemeDescription> = Partial<
  Record<"color", KeyOfColors<T>>
>;

export type ThemeDisplay = Record<
  "display",
  | "flex"
  | "inline-flex"
  | "none"
  | "block"
  | "inline"
  | "inline-block"
  | "grid"
  | "inline-grid"
  | "contents"
  | "list-item"
  | "initial"
  | "inherit"
  | "unset"
>;

export type ThemeJustifyContentValue =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";
export type ThemeJustifyContent = Partial<
  Record<"justify-content", ThemeJustifyContentValue>
>;

export type ThemeAlignItemsValue =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";
export type ThemeAlignItems = Partial<
  Record<"align-items", ThemeAlignItemsValue>
>;

export type ThemeFlexDirectionValue =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse";
export type ThemeFlexDirection = Partial<
  Record<"flex-direction", ThemeFlexDirectionValue>
>;

export type ThemeFlexWrapValue = "nowrap" | "wrap" | "wrap-reverse";
export type ThemeFlexWrap = Partial<Record<"flex-wrap", ThemeFlexWrapValue>>;

export type ThemeUserSelectValue = "none" | "text" | "all" | "auto" | "contain";
export type ThemeUserSelect = Partial<
  Record<"user-select", ThemeUserSelectValue>
>;

export type ThemePointerEventsValue = "auto" | "none";
export type ThemePointerEvents = Partial<
  Record<"pointer-events", ThemePointerEventsValue>
>;

export type ThemeListStyleValue = "none" | "disc" | "square" | "decimal";
export type ThemeListStyle = Partial<Record<"list-style", ThemeListStyleValue>>;

export type ThemeOverflowValue = "visible" | "hidden" | "scroll" | "auto";
export type ThemeOverflow = Partial<
  Record<
    "overflow",
    | ThemeOverflowValue
    | [ThemeOverflowValue]
    | [ThemeOverflowValue | undefined, ThemeOverflowValue | undefined]
  >
>;

export type ThemeBorder<T extends ThemeDescription> = Record<
  "border",
  | {
      width: KeyOfBorderWidth<T>;
      style: KeyOfBorderStyle<T>;
      color: KeyOfColors<T>;
    }
  | {
      width: ThemeArrayValues<KeyOfBorderWidth<T>, 4, "extact">;
      style: ThemeArrayValues<KeyOfBorderStyle<T>, 4, "extact">;
      color: ThemeArrayValues<KeyOfColors<T>, 4, "extact">;
    }
  | {
      width: ThemeArrayValues<KeyOfBorderWidth<T>, 3, "extact">;
      style: ThemeArrayValues<KeyOfBorderStyle<T>, 3, "extact">;
      color: ThemeArrayValues<KeyOfColors<T>, 3, "extact">;
    }
  | {
      width: ThemeArrayValues<KeyOfBorderWidth<T>, 2, "extact">;
      style: ThemeArrayValues<KeyOfBorderStyle<T>, 2, "extact">;
      color: ThemeArrayValues<KeyOfColors<T>, 2, "extact">;
    }
  | {
      width: ThemeArrayValues<KeyOfBorderWidth<T>, 1, "extact">;
      style: ThemeArrayValues<KeyOfBorderStyle<T>, 1, "extact">;
      color: ThemeArrayValues<KeyOfColors<T>, 1, "extact">;
    }
>;

export type ThemeFlex<T extends ThemeDescription> = {
  "flex-grow": number | BasicCssValue;
  "flex-shrink": number | BasicCssValue;
  "flex-basis": KeyOfFlexBasis<T> | KeyOfSizes<T>;
};

export type ThemeTheme<T extends ThemeDescription> = Record<
  KeyOfThemes<T>,
  boolean
>;

export type ThemeFontSize<T extends ThemeDescription> = Record<
  "font-size",
  KeyOfFontSize<T>
>;

export type ThemeFontWeight<T extends ThemeDescription> = Record<
  "font-weight",
  KeyOfFontWeight<T>
>;

export type ThemeShadow<T extends ThemeDescription> = Record<
  "shadow",
  KeyOfShadow<T>
>;

export type ThemeTransition<T extends ThemeDescription> = Record<
  "transition",
  | KeyOfTransitionProperty<T>
  | {
      property: KeyOfTransitionProperty<T>;
      duration?: KeyOfTransitionDuration<T>;
      timing?: KeyOfTransitionTiming<T>;
      delay?: KeyOfTransitionDelay<T>;
    }
>;

export type ThemeElement<T extends ThemeDescription> = Partial<
  ThemePadding<T> &
    ThemeRounded<T> &
    ThemePosition<T> &
    ThemeBackground<T> &
    ThemeColor<T> &
    ThemeDisplay &
    ThemeJustifyContent &
    ThemeAlignItems &
    ThemeFlexDirection &
    ThemeFlexWrap &
    ThemeUserSelect &
    ThemePointerEvents &
    ThemeListStyle &
    ThemeOverflow &
    ThemeSize<T> &
    ThemeBorder<T> &
    ThemeFlex<T> &
    ThemeGap<T> &
    ThemePosition<T> &
    ThemeFontSize<T> &
    ThemeFontWeight<T> &
    ThemeShadow<T> &
    ThemeTransition<T> &
    ThemeTheme<T>
>;

export type ThemeEvent<T extends ThemeDescription> = Partial<
  Record<KeyOfEventNames<T>, ThemeElement<T>>
>;

export type ThemeMedia<T extends ThemeDescription> = Partial<
  Record<KeyOfBreakpoints<T>, ThemeElement<T> & ThemeEvent<T>>
>;

/**
 * Define wich properties are allowed in the theme object passed to the Box (or inherited) component.
 */
export type ThemeElementApi<T extends ThemeDescription> = ThemeElement<T> &
  ThemeEvent<T> &
  ThemeMedia<T> &
  Record<string, any>;
