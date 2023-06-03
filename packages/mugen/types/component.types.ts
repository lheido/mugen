import { Component, JSX } from "solid-js";
import { ThemeDescription, ThemeElementApi } from "../theme";

export type ComponentProps = {
  as?: string | Component<any>;
  theme?: ThemeElementApi<ThemeDescription>;
  children?: JSX.Element | JSX.Element[];
};
