export type ClassList = Record<string, boolean>;

export type ThemeDescription = {
  spacing: Record<string, string>;
  rounded: Record<string, string>;
  colors: Record<string, string>;
  sizes: Record<string, string>;
  breakpoints: Record<string, string>;
};

/**
 * padding|margin: <all-edges> | [<x>, <y>] | [<left>, <top>, <right>, <bottom>]
 */
export type ThemePaddingValue<
  T extends ThemeDescription,
  S = keyof T["spacing"] | undefined
> = S | [S] | [S, S] | [S, S, S] | [S, S, S, S];

export type ThemePadding<T extends ThemeDescription> = Partial<
  Record<"padding" | "margin", ThemePaddingValue<T>>
>;

/**
 * rounded: <all-edges> | [<l>, <r>] | [<tl>, <tr>, <br>, <bl>]
 */
export type ThemeRoundedValue<
  T extends ThemeDescription,
  S = keyof T["rounded"] | undefined
> = S | [S] | [S, S] | [S, S, S] | [S, S, S, S];

export type ThemeRounded<T extends ThemeDescription> = Partial<
  Record<"rounded", ThemeRoundedValue<T>>
>;

/**
 * relative|absolute|fixed|sticky: [<l>, <t>, <r>, <b>]
 */
export type ThemePositionValue<
  T extends ThemeDescription,
  S = keyof T["spacing"] | undefined
> = [S] | [S, S] | [S, S, S] | [S, S, S, S];

export type ThemePosition<T extends ThemeDescription> = Partial<
  Record<"relative" | "absolute" | "fixed" | "sticky", ThemePositionValue<T>>
>;

/**
 * gap: <gap> | [<row-gap>, <column-gap>]
 */
export type ThemeGap<
  T extends ThemeDescription,
  S = keyof T["spacing"] | undefined
> = Partial<Record<"gap", S | [S] | [S, S]>>;

/**
 * width|height: <value>, [<value>, <min-value>, <max-value>]
 */
export type ThemeSizeValue<
  T extends ThemeDescription,
  S = keyof T["sizes"] | undefined
> = S | [S] | [S, S] | [S, S, S];

export type ThemeSize<T extends ThemeDescription> = Partial<
  Record<"width" | "height", ThemeSizeValue<T>>
>;

export type ThemeColorValue<
  T extends ThemeDescription,
  C = keyof T["colors"]
> = C;

export type ThemeBackground<T extends ThemeDescription> = Partial<
  Record<"background", ThemeColorValue<T>>
>;

export type ThemeColor<T extends ThemeDescription> = Partial<
  Record<"color", ThemeColorValue<T>>
>;

export type ThemeDisplay = Partial<
  Record<
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
  >
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

export type ThemeOverflowValue = "visible" | "hidden" | "scroll" | "auto";
export type ThemeOverflow = Partial<
  Record<
    "overflow",
    | ThemeOverflowValue
    | [ThemeOverflowValue]
    | [ThemeOverflowValue | undefined, ThemeOverflowValue | undefined]
  >
>;

export const themeEventNames = [
  "hover",
  "active",
  "focus",
  "focus-within",
] as const;
export type ThemeEventNames = (typeof themeEventNames)[number];

export type ThemeEvent<T extends ThemeDescription> = Partial<
  Record<ThemeEventNames, ThemeElement<T>>
>;

export type ThemeElement<T extends ThemeDescription> = ThemePadding<T> &
  ThemeGap<T> &
  ThemeBackground<T> &
  ThemeColor<T> &
  ThemeRounded<T> &
  ThemePosition<T> &
  ThemeDisplay &
  ThemeJustifyContent &
  ThemeAlignItems &
  ThemeFlexWrap &
  ThemeUserSelect &
  ThemePointerEvents &
  ThemeOverflow &
  ThemeSize<T>;

export type ThemeMedia<T extends ThemeDescription> = Partial<
  Record<
    Extract<keyof T["breakpoints"], string>,
    ThemeElement<T> & ThemeEvent<T>
  >
>;

export type ThemeElementApi<T extends ThemeDescription> = ThemeElement<T> &
  ThemeEvent<T> &
  ThemeMedia<T>;
