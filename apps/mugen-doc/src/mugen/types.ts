import { JSX } from "solid-js";
import { theme } from "./theme-description";

export type ThemeDescription = typeof theme;

export type Only<T, U> = {
  [P in keyof T]: T[P];
} & Omit<{ [P in keyof U]?: never }, keyof T>;

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type Split<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];

export type ElementRoles = JSX.AriaAttributes["role"];

export type IntrinsicElements = keyof JSX.IntrinsicElements;

export type PseudoClasses =
  | "active"
  | "checked"
  | "default"
  | "defined"
  | "disabled"
  | "empty"
  | "enabled"
  | "first"
  | "first-child"
  | "first-of-type"
  | "focus"
  | "focus-within"
  | "hover"
  | "indeterminate"
  | "in-range"
  | "invalid"
  | "last-child"
  | "last-of-type"
  | "link"
  | "optional"
  | "out-of-range"
  | "read-only"
  | "read-write"
  | "required"
  | "target"
  | "valid"
  | "visited";
