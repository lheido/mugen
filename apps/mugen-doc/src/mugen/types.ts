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

export type GlobalAttributes = {
  accessKey?: string;
  contenteditable?: boolean | "inherit";
  contextmenu?: string;
  dir?: JSX.HTMLDir;
  draggable?: boolean | "false" | "true";
  hidden?: boolean | "hidden" | "until-found";
  id?: string;
  inert?: boolean;
  lang?: string;
  spellcheck?: boolean;
  tabindex?: number | string;
  title?: string;
  translate?: "yes" | "no";
  about?: string;
  datatype?: string;
  inlist?: any;
  prefix?: string;
  property?: string;
  resource?: string;
  typeof?: string;
  vocab?: string;
  autocapitalize?: JSX.HTMLAutocapitalize;
  slot?: string;
  color?: string;
  itemprop?: string;
  itemscope?: boolean;
  itemtype?: string;
  itemid?: string;
  itemref?: string;
  part?: string;
  exportparts?: string;
  inputmode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
  contentEditable?: boolean | "inherit";
  contextMenu?: string;
  tabIndex?: number | string;
  autoCapitalize?: JSX.HTMLAutocapitalize;
  itemProp?: string;
  itemScope?: boolean;
  itemType?: string;
  itemId?: string;
  itemRef?: string;
  exportParts?: string;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
};

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

export type WithPseudoClasse<T extends string> = T | `${T}:${PseudoClasses}`;

export type HandlerRuleData = {
  className: string;
  properties: string[];
  pseudoClass?: PseudoClasses;
};
