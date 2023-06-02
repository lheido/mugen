import { ComponentProps } from "../types";
import { Box } from "./Box";

type ButtonProps = ComponentProps & {
  onClick?: (e: Event) => void;
  type?: "button" | "submit" | "reset";
};

export const Button = (props: ButtonProps) => {
  return (
    <Box
      {...{
        as: props.as ?? "button",
        ...props,
      }}
    />
  );
};
