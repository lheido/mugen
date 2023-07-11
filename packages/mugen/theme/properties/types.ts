import { ThemeDescription } from "../types";

type Only<T, U> = {
  [P in keyof T]: T[P];
} & Omit<{ [P in keyof U]?: never }, keyof T>;

type Either<T, U> = Only<T, U> | Only<U, T>;

type ThemePropertyValue<ValueType, Or1 extends string> =
  | ValueType
  | Partial<Record<Or1, ValueType>>;

type ThemePropertyValue2<ValueType, Or1 extends string, Or2 extends string> =
  | ValueType
  | Either<Partial<Record<Or1, ValueType>>, Partial<Record<Or2, ValueType>>>;

export type ThemeElement<T extends ThemeDescription> = Partial<{
  padding: ThemePropertyValue2<
    keyof T["spacing"],
    // TODO: Allow user to set x and top|bottom or y and left|right.
    "x" | "y",
    "left" | "right" | "top" | "bottom"
  >;
  margin: ThemePropertyValue2<
    keyof T["spacing"] | "auto",
    "x" | "y",
    "left" | "right" | "top" | "bottom"
  >;
  rounded: ThemePropertyValue2<
    keyof T["rounded"],
    "left" | "right" | "top" | "bottom",
    "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
  >;
  background:
    | keyof T["colors"]
    | {
        from: keyof T["colors"];
        to?: keyof T["colors"];
        direction: "bottom" | "top" | "left" | "right";
        fromOffset?: keyof T["gradientOffset"];
        toOffset?: keyof T["gradientOffset"];
      };
  color:
    | keyof T["colors"]
    | {
        from: keyof T["colors"];
        to?: keyof T["colors"];
        direction: "bottom" | "top" | "left" | "right";
        fromOffset?: keyof T["gradientOffset"];
        toOffset?: keyof T["gradientOffset"];
      };
  font: {
    size?: keyof T["fontSize"];
    weight?: keyof T["fontWeight"];
  };
  relative:
    | boolean
    | Partial<
        Record<
          "top" | "left" | "right" | "bottom",
          | keyof T["spacing"]
          | `-${keyof T["spacing"] extends string ? keyof T["spacing"] : never}`
        >
      >;
  absolute:
    | boolean
    | Partial<
        Record<
          "top" | "left" | "right" | "bottom",
          | keyof T["spacing"]
          | `-${keyof T["spacing"] extends string ? keyof T["spacing"] : never}`
        >
      >;
  fixed:
    | boolean
    | Partial<
        Record<
          "top" | "left" | "right" | "bottom",
          | keyof T["spacing"]
          | `-${keyof T["spacing"] extends string ? keyof T["spacing"] : never}`
        >
      >;
  sticky:
    | boolean
    | Partial<
        Record<
          "top" | "left" | "right" | "bottom",
          | keyof T["spacing"]
          | `-${keyof T["spacing"] extends string ? keyof T["spacing"] : never}`
        >
      >;
  flex: {
    gap?: keyof T["spacing"];
    justify?: keyof T["justifyContent"];
    items?: keyof T["alignItems"];
    direction?: keyof T["flexDirection"];
    wrap?: keyof T["flexWrap"];
  };
  flexItem: {
    basis?: keyof T["sizes"];
    grow?: number;
    shrink?: number;
    order?: number;
  };
  width: ThemePropertyValue<keyof T["sizes"], "value" | "min" | "max">;
  height: ThemePropertyValue<keyof T["sizes"], "value" | "min" | "max">;
  transition: {
    property: keyof T["transitionProperties"];
    duration?: keyof T["transitionDuration"];
    ease?: keyof T["transitionTimingFunction"];
    delay?: keyof T["transitionDelay"];
  };
  transform: {
    translate?: ThemePropertyValue<
      | keyof T["spacing"]
      | `-${keyof T["spacing"] extends string ? keyof T["spacing"] : never}`,
      "x" | "y"
    >;
    scale?: ThemePropertyValue<keyof T["transformScale"], "x" | "y">;
    skew?: ThemePropertyValue<keyof T["transformSkew"], "x" | "y">;
    rotate?: keyof T["transformRotate"];
  };
  zIndex: number | `-${number}`;
  opacity: keyof T["opacity"];
  filter: {
    blur?: number;
  };
  overflow:
    | "hidden"
    | "visible"
    | "scroll"
    | "auto"
    | {
        x?: "hidden" | "visible" | "scroll" | "auto";
        y?: "hidden" | "visible" | "scroll" | "auto";
      };
}>;

// position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     z-index: -1;
//     padding-left: 273px;
//     filter: blur(8px);
//     opacity: 0.5;
//     overflow: hidden;
