export type Only<T, U> = {
  [P in keyof T]: T[P];
} & Omit<{ [P in keyof U]?: never }, keyof T>;

export type Either<T, U> = Only<T, U> | Only<U, T>;

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
