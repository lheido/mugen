import { FlowProps } from "solid-js";
import { As, useHierarchy } from "../semantic";
import { IntrinsicElements } from "../types";
import { Box } from "./Box";

export const Title = (props: FlowProps) => {
  const hierarchy = useHierarchy();
  const as = () => `h${hierarchy}` as IntrinsicElements;
  return (
    <As value={as()}>
      <Box {...props} />
    </As>
  );
};
