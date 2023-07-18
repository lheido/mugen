import { mergeProps } from "solid-js";
import {
  BaseComponentProps,
  ImageAttributes,
  UniversalAttributes,
} from "../types";
import { Box } from "./Box";

export const Image = (
  props: BaseComponentProps & UniversalAttributes & ImageAttributes
) => {
  return <Box {...mergeProps({ alt: "" }, props)} />;
};
