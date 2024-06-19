import { FlowProps } from "solid-js";
import { Box, BoxProps } from "./Box";

export function Text(props: FlowProps<BoxProps>) {
  return <Box as="span" {...props} />;
}
