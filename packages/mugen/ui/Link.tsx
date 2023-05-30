import { LinkAttributes, UniversalAttributes } from "../types/attributes.types";
import { ComponentProps } from "../types/component.types";
import { Box } from "./Box";

export const Link = (
  props: ComponentProps & UniversalAttributes & LinkAttributes
) => {
  return <Box {...props} />;
};
