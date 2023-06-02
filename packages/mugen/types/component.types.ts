import { Component, JSX } from "solid-js";
import { ThemeApi } from "../theme/style-sheet";

export type ComponentProps = {
  as?: string | Component<any>;
  theme?: ThemeApi;
  children?: JSX.Element | JSX.Element[];
};
