import { BaseComponentProps } from "../types";
import { Box } from "./Box";
import { createMugenComponent } from "./createMugenComponent";

export type HeadingProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Heading = createMugenComponent(
  (p: BaseComponentProps & HeadingProps) => p,
  (p) => {
    return <Box {...p} />;
  }
);
