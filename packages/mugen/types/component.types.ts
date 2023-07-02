import { JSX } from "solid-js/jsx-runtime";
import { ThemeDescription, ThemeElementApi } from "../theme";

export type MugenComponent<P> = (props: P) => JSX.Element;

export type Theme = ThemeElementApi<ThemeDescription>;

export type BaseComponentProps = {
  theme?: Theme;
  as?: string | MugenComponent<any>;
  mixins?: any[];
  children?: JSX.Element | JSX.Element[];
};
