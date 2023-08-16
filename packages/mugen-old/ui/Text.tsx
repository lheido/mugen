import { mergeProps } from "solid-js";
import { BaseComponentProps, UniversalAttributes } from "../types";
import { Box } from "./Box";

export type TextProps = {};

export const Text = (
  props: BaseComponentProps & UniversalAttributes & TextProps
) => {
  // TODO: auto detect span/p usage ?
  return <Box {...mergeProps({ as: "span" }, props)} />;
};
