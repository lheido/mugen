import { FlowProps, splitProps } from "solid-js";
import { ThemeLayout, ThemeLayoutProps } from "../theme";
import { Box, BoxProps } from "./Box";

export const Layout = (props: FlowProps & ThemeLayoutProps & BoxProps) => {
  const [layout, others] = splitProps(props, [
    "column",
    "gap",
    "items",
    "justify",
    "nowrap",
    "reverse",
    "wrap",
    "wrapReverse",
  ]);
  return (
    <ThemeLayout {...(layout as ThemeLayoutProps)}>
      <Box {...others} />
    </ThemeLayout>
  );
};
