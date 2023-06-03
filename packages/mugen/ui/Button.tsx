import { mergeProps } from "solid-js";
import { ButtonAttributes, ComponentProps } from "../types";
import { Box } from "./Box";

type ButtonProps = ComponentProps & ButtonAttributes;

export const Button = (props: ButtonProps) => {
  return <Box {...mergeProps({ as: "button" }, props)} />;
};
