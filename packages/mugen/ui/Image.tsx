import {
  ImageAttributes,
  UniversalAttributes,
} from "../types/attributes.types";
import { Box } from "./Box";

export const Image = (props: UniversalAttributes & ImageAttributes) => {
  return (
    <Box
      {...{
        alt: "",
        ...props,
      }}
    />
  );
};
