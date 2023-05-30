import { JSX } from "solid-js";
import { ThemeApi } from "../theme/style-sheet";

export type ComponentProps = {
  tag?: string;
  theme?: ThemeApi;
  children?: JSX.Element | JSX.Element[];
};
