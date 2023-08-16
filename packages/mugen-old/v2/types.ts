import { JSX } from "solid-js";
import { themeDescriptionDefaults } from "./default";

export type Only<T, U> = {
  [P in keyof T]: T[P];
} & Omit<{ [P in keyof U]?: never }, keyof T>;

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type Split<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];

export type ElementRoles = JSX.AriaAttributes["role"];

export type IntrinsicElements = keyof JSX.IntrinsicElements;

export type ThemeDescription = typeof themeDescriptionDefaults & {
  colors: Record<string, string>;
  eventNames: Record<string, string>;
  themes: Record<string, Pick<ThemeDescription, "colors">>;
};
