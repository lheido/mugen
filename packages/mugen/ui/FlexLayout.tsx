import { mergeProps, splitProps } from "solid-js";
import { ThemeDescription, ThemeElementApi } from "../theme";
import { BaseComponentProps } from "../types";
import { Box } from "./Box";
import { createMugenComponent } from "./createMugenComponent";

export type FlexLayoutProps = {
  gap?: keyof ThemeDescription["spacing"];
  justify?: keyof ThemeDescription["justifyContent"];
  items?: keyof ThemeDescription["alignItems"];
  direction?: keyof ThemeDescription["flexDirection"];
  wrap?: keyof ThemeDescription["flexWrap"];
};

export const FlexLayout = createMugenComponent(
  (props: BaseComponentProps & FlexLayoutProps) => {
    const [local, others] = splitProps(props, [
      "gap",
      "theme",
      "justify",
      "items",
      "direction",
      "wrap",
    ]);
    return mergeProps(
      {
        theme: {
          flex: {
            ...(local.gap ? { gap: local.gap } : {}),
            ...(local.justify ? { justify: local.justify } : {}),
            ...(local.items ? { items: local.items } : {}),
            ...(local.direction ? { direction: local.direction } : {}),
            ...(local.wrap ? { wrap: local.wrap } : {}),
          },
          ...(local.theme ?? {}),
        } as ThemeElementApi<ThemeDescription>,
      },
      others
    );
  },
  (p) => {
    return <Box {...p} />;
  }
);
