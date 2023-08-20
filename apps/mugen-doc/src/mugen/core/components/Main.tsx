import { FlowProps } from "solid-js";
import { As } from "../semantic";
import { Box } from "./Box";

export const Footer = (props: FlowProps) => {
  return (
    <As value="main">
      <Box {...props} />
    </As>
  );
};
