import { JSX } from "solid-js/jsx-runtime";

export type Without<T, U> = { [P in keyof U]?: never } & T;

export type XOR<T, U> = T | U extends object
  ? Without<T, U> | Without<U, T>
  : T | U;

export type Only<T, U> = {
  [P in keyof T]: T[P];
} & Omit<{ [P in keyof U]?: never }, keyof T>;

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type Style = JSX.CSSProperties;
export type ClassList = Record<string, boolean | undefined>;

export type CSSUnit =
  | "px"
  | "rem"
  | "em"
  | "%"
  | "vh"
  | "vw"
  | "vmin"
  | "vmax"
  | "svh"
  | "svw";

export type SpacingValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type RoundedValues = "none" | "sm" | true | "lg" | "full";
