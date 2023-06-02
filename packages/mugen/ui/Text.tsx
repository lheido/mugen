import { ComponentProps, UniversalAttributes } from "../types";
import { Box } from "./Box";

export const Text = (props: ComponentProps & UniversalAttributes) => {
  // TODO: auto detect span/p usage ?
  return (
    <Box
      {...{
        as: props.as ?? "p",
        ...props,
      }}
    />
  );
};
