import { CSSUnit } from "@mugen/core";
import data from "../../theme.json";

export type Breakpoints = typeof data.breakpoints;

export type SpacingValues = keyof typeof data.spacings | `${number}${CSSUnit}`;

export type RoundedValues = keyof typeof data.rounded | `${number}${CSSUnit}`;

export type StringKeysAsInt<T extends string> =
  T extends `${infer N extends number}` ? N : T;

export type SpacingProps = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type RoundedProps = {
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
};

export type LayoutFlex = {
  justifyContent:
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "flex-start"
    | "flex-end";
  alignItems: "center" | "stretch" | "flex-start" | "flex-end" | "baseline";
  flexDirection: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap: "wrap" | "nowrap";
  gap: SpacingValues;
};

export type ZIndexValues = keyof typeof data.zIndex | number;
