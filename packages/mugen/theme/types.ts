export type ClassList = Record<string, boolean>;

export type ThemeDescription = {
  spacing: Record<string, string>;
  rounded: Record<string, string>;
  colors: Record<string, string>;
  sizes: Record<string, string>;
  breakpoints: Record<string, string>;
  borderWidth?: Record<string, string>;
  themes?: Record<string, Pick<ThemeDescription, "colors">>;
};

/**
 * padding|margin: <all-edges> | [<x>, <y>] | [<left>, <top>, <right>, <bottom>]
 */
export type ThemePaddingValue<
  T extends ThemeDescription,
  S = keyof T["spacing"] | undefined
> =
  | S
  | [S]
  | [S, S]
  | [S, S, S]
  | [S, S, S, S]
  | Partial<Record<"x" | "y" | "left" | "top" | "right" | "bottom", S>>;

export type ThemePadding<T extends ThemeDescription> = Partial<
  Record<"padding" | "margin", ThemePaddingValue<T>>
>;

/**
 * rounded: <all-edges> | [<l>, <r>] | [<tl>, <tr>, <br>, <bl>]
 */
export type ThemeRoundedValue<
  T extends ThemeDescription,
  S = keyof T["rounded"] | undefined
> =
  | S
  | [S]
  | [S, S]
  | [S, S, S]
  | [S, S, S, S]
  | Partial<Record<"l" | "r" | "t" | "b" | "tl" | "tr" | "br" | "bl", S>>;

export type ThemeRounded<T extends ThemeDescription> = Partial<
  Record<"rounded", ThemeRoundedValue<T>>
>;

/**
 * relative|absolute|fixed|sticky: [<l>, <t>, <r>, <b>]
 */
export type ThemePositionValue<
  T extends ThemeDescription,
  S = keyof T["spacing"] | undefined
> =
  | [S]
  | [S, S]
  | [S, S, S]
  | [S, S, S, S]
  | Partial<Record<"left" | "top" | "right" | "bottom", S>>;
export const ThemePositionsValues = [
  "relative",
  "absolute",
  "fixed",
  "sticky",
] as const;
export type ThemePosition<T extends ThemeDescription> = Partial<
  Record<(typeof ThemePositionsValues)[number], ThemePositionValue<T>>
>;

/**
 * gap: <gap> | [<row-gap>, <column-gap>]
 */
export type ThemeGap<
  T extends ThemeDescription,
  S = keyof T["spacing"] | undefined
> = Partial<Record<"gap", S | [S] | [S, S] | Partial<Record<"x" | "y", S>>>>;

/**
 * width|height: <value>, [<value>, <min-value>, <max-value>]
 */
export type ThemeSizeValue<
  T extends ThemeDescription,
  S = keyof T["sizes"] | undefined
> = S | [S] | [S, S] | [S, S, S] | Partial<Record<"min" | "max" | "_", S>>;

export type ThemeSize<T extends ThemeDescription> = Partial<
  Record<"width" | "height", ThemeSizeValue<T>>
>;

export type ThemeColorValue<
  T extends ThemeDescription,
  C = keyof T["colors"]
> = C | { from: C; to?: C; linear: "bottom" | "top" | "left" | "right" };

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

export const defaultThemeBorderWidth = {
  "0": "0px",
  "1": "1px",
  "2": "2px",
  "4": "4px",
  "8": "8px",
} as const;
export type ThemeBorderWidthValue<
  T extends ThemeDescription,
  V = keyof T["borderWidth"] | keyof typeof defaultThemeBorderWidth | undefined
> = V | [V] | [V, V] | [V, V, V] | [V, V, V, V];
export const ThemeBorderStyleValue = [
  "solid",
  "dotted",
  "dashed",
  "double",
  "hidden",
  "none",
] as const;
// TODO: Improve array types
export type ThemeBorderValue<T extends ThemeDescription> = {
  width: ThemeBorderWidthValue<T>;
  style:
    | (typeof ThemeBorderStyleValue)[number]
    | ((typeof ThemeBorderStyleValue)[number] | undefined)[];
  color: keyof T["colors"] | (keyof T["colors"] | undefined)[];
};
export type ThemeBorder<T extends ThemeDescription> = Partial<
  Record<"border", ThemeBorderValue<T>>
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
  ThemeBorder<T> &
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
  ThemeListStyle &
  ThemeSize<T>;

export type ThemeMedia<T extends ThemeDescription> = Partial<
  Record<
    Extract<keyof T["breakpoints"], string>,
    ThemeElement<T> & ThemeEvent<T>
  >
>;

export type ThemeElementTheme<T extends ThemeDescription> = Partial<
  Record<keyof T["themes"], boolean>
>;

export type ThemeElementApi<T extends ThemeDescription> = ThemeElement<T> &
  ThemeEvent<T> &
  ThemeMedia<T> &
  ThemeElementTheme<T> &
  Record<string, any>;
