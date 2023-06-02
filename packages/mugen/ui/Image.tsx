import { ComponentProps, ImageAttributes, UniversalAttributes } from "../types";
import { Box } from "./Box";

export const Image = (
  props: ComponentProps & UniversalAttributes & ImageAttributes
) => {
  return (
    <Box
      {...{
        alt: "",
        ...props,
      }}
    />
  );
};
