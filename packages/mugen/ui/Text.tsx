import { mergeProps } from "solid-js";
import { ComponentProps, UniversalAttributes } from "../types";
import { Box } from "./Box";

export const Text = (props: ComponentProps & UniversalAttributes) => {
  // TODO: auto detect span/p usage ?
  return <Box {...mergeProps({ as: "p" }, props)} />;
};
