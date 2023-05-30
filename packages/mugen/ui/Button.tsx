import { ComponentProps } from "../types/component.types";
import { Box } from "./Box";

type ButtonProps = Omit<ComponentProps, "tag"> & {
  onClick?: (e: Event) => void;
  type?: "button" | "submit" | "reset";
};

export const Button = (props: ButtonProps) => {
  return <Box tag="button" {...props} />;
};
