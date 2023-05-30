export type ThemeDescription = {
  spacing: Record<string, string>;
  colors: Record<string, string>;
  sizes: Record<string, string>;
  breakpoints: Record<string, string>;
};

/**
 * padding|margin: <all-edges> | [<x>, <y>] | [<left>, <top>, <right>, <bottom>]
 */
export type ThemePaddingValue<
  T extends ThemeDescription,
  S = keyof T["spacing"]
> = S | [S] | [S, S] | [S, S, S, S];

export type ThemePadding<T extends ThemeDescription> = Partial<
  Record<"padding" | "margin", ThemePaddingValue<T>>
>;

/**
 * gap: <gap> | [<row-gap>, <column-gap>]
 */
export type ThemeGap<
  T extends ThemeDescription,
  S = keyof T["spacing"]
> = Partial<Record<"gap", S | [S] | [S, S]>>;

/**
 * width|height: <value>, [<value>, <min-value>, <max-value>]
 */
export type ThemeSizeValue<
  T extends ThemeDescription,
  S = keyof T["sizes"]
> = S;

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
const themeEventNames = ["hover", "active", "focus", "focus-within"] as const;
export type ThemeEventNames = (typeof themeEventNames)[number];

export type ThemeEvent<T extends ThemeDescription> = Partial<
  Record<ThemeEventNames, ThemeElement<T>>
>;

export type ThemeElement<T extends ThemeDescription> = ThemePadding<T> &
  ThemeGap<T> &
  ThemeBackground<T> &
  ThemeColor<T> &
  ThemeSize<T>;

export type ThemeMedia<T extends ThemeDescription> = Partial<
  Record<Extract<keyof T["breakpoints"], string>, ThemeElement<T>>
>;

export type ThemeElementApi<T extends ThemeDescription> = ThemeElement<T> &
  ThemeEvent<T> &
  ThemeMedia<T>;

const styleSheet = new CSSStyleSheet();
document.adoptedStyleSheets.push(styleSheet);
const mediaStyleSheets = new Map<string, CSSStyleSheet>();
const classNameRefs = new Map<string, boolean>();

const paddingHandler = <T extends ThemeDescription>(
  prop: string,
  values: ThemePaddingValue<T>,
  styleSheet: CSSStyleSheet,
  description: T,
  emod?: ThemeEventNames
): string[] => {
  /**
   * return p-*, px-*, py-*, pl-*, pt-*, pr-*, pb-* classes.
   */
  const prefix = prop[0];
  if (Array.isArray(values)) {
    const classNames: string[] = [];
    let subprefixes: string[] = ["l", "t", "r", "b"];
    let propSuffixMap: string[][] = [["left"], ["top"], ["right"], ["bottom"]];
    if (values.length > 0 && values.length < 3) {
      subprefixes = ["x", "y"];
      propSuffixMap = [
        ["left", "right"],
        ["top", "bottom"],
      ];
    }
    values.forEach((value, i) => {
      const cls = `${emod ? `${emod}-` : ""}${prefix}${subprefixes[i]}-${(
        value as string
      ).replace("/", "-")}`;
      const val = description.spacing[value as string];
      classNames.push(cls);
      const suffixes = propSuffixMap[i];
      if (!classNameRefs.has(cls)) {
        classNameRefs.set(cls, true);
        styleSheet.insertRule(
          `.${cls}${emod ? `:${emod}` : ""}{${suffixes
            .map((suffix) => `${prop}-${suffix}:${val};`)
            .join(" ")}}`
        );
      }
    });
    return classNames;
  } else {
    const val = description.spacing[values as string];
    const cls = `${emod ? `${emod}-` : ""}${prefix}-${(
      values as string
    ).replace("/", "-")}`;
    if (!classNameRefs.has(cls)) {
      classNameRefs.set(cls, true);
      styleSheet.insertRule(
        `.${cls}${emod ? `:${emod}` : ""} { padding: ${val} }`
      );
    }
    return [cls];
  }
};

const colorHandler = <T extends ThemeDescription>(
  prop: string,
  value: ThemeColorValue<T>,
  styleSheet: CSSStyleSheet,
  description: T,
  emod?: ThemeEventNames
): string[] => {
  const cls = `${emod ? `${emod}-` : ""}${prop}-${value as string}`;
  if (!classNameRefs.has(cls)) {
    classNameRefs.set(cls, true);
    const val = description.colors[value as string];
    styleSheet.insertRule(
      `.${cls}${emod ? `:${emod}` : ""} { ${
        prop === "color" ? prop : "background-color"
      }: ${val}; }`
    );
  }
  return [cls];
};

const sizeHandler = <T extends ThemeDescription>(
  prop: string,
  value: ThemeSizeValue<T>,
  styleSheet: CSSStyleSheet,
  description: T,
  emod?: ThemeEventNames
): string[] => {
  const cls = `${emod ? `${emod}-` : ""}${prop}-${value as string}`;
  if (!classNameRefs.has(cls)) {
    classNameRefs.set(cls, true);
    const val = description.sizes[value as string];
    styleSheet.insertRule(
      `.${cls}${emod ? `:${emod}` : ""} { ${prop}: ${val}; }`
    );
  }
  // TODO: handle min/max values.
  return [cls];
};

export interface ThemeApi {
  execute(): string[];
}

export const Theme = <T extends ThemeDescription>(description: T) => {
  return class ThemeApi implements ThemeApi {
    static build(theme: ThemeElementApi<T>) {
      return new this(description, theme);
    }

    handlers = new Map<
      string,
      (
        value: any,
        styleSheet: CSSStyleSheet,
        description: T,
        emod?: ThemeEventNames
      ) => string[]
    >();

    private constructor(
      private description: T,
      private theme: ThemeElementApi<T>
    ) {
      this.handlers.set(
        "padding",
        (value: ThemePaddingValue<T>, styleSheet, description, emod) =>
          paddingHandler("padding", value, styleSheet, description, emod)
      );
      this.handlers.set(
        "margin",
        (value: ThemePaddingValue<T>, styleSheet, description, emod) =>
          paddingHandler("margin", value, styleSheet, description, emod)
      );
      this.handlers.set("background", (value, styleSheet, description, emod) =>
        colorHandler("background", value, styleSheet, description, emod)
      );
      this.handlers.set("color", (value, styleSheet, description, emod) =>
        colorHandler("color", value, styleSheet, description, emod)
      );
      this.handlers.set("width", (value, styleSheet, description, emod) =>
        sizeHandler("width", value, styleSheet, description, emod)
      );
      this.handlers.set("height", (value, styleSheet, description, emod) =>
        sizeHandler("height", value, styleSheet, description, emod)
      );
    }

    execute(): string[] {
      const classNames: string[] = [];
      Object.entries(this.theme).forEach(([key, value]) => {
        this.computed(key, value, classNames);
      });
      return classNames;
    }

    private computed(
      key: string,
      value: any,
      classNames: string[],
      emod?: ThemeEventNames
    ) {
      if (typeof value === "string") {
        const handler = this.handlers.get(key);
        if (handler) {
          classNames.push(
            ...handler(value, styleSheet, this.description, emod)
          );
        }
      } else if (themeEventNames.includes(key as ThemeEventNames)) {
        Object.entries(value).forEach(([k, v]) => {
          this.computed(k, v, classNames, key as ThemeEventNames);
        });
      }
    }
  };
};

/*
spacing:
 gap
 gap-x // row-gap
 gap-y // column-gap
sizing:
 width
 height
fontSize
fontWeight
lineHeight
flex
grid
*/
