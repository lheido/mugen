import { ComponentProps, LinkAttributes, UniversalAttributes } from "../types";
import { Box } from "./Box";

export const Link = (
  props: ComponentProps & UniversalAttributes & LinkAttributes
) => {
  return <Box {...props} />;
};
