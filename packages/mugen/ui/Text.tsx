import { mergeProps } from "solid-js";
import { BaseComponentProps, UniversalAttributes } from "../types";
import { Box } from "./Box";

export const Text = (props: BaseComponentProps & UniversalAttributes) => {
  // TODO: auto detect span/p usage ?
  return <Box {...mergeProps({ as: "p" }, props)} />;
};
