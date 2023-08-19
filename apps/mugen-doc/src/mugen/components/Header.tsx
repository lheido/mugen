import { FlowProps } from "solid-js";
import { As } from "../semantic";
import { Box } from "./Box";

export const Header = (props: FlowProps) => {
  return (
    <As value="header">
      <Box {...props} />
    </As>
  );
};
