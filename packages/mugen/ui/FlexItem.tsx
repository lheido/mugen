import { mergeProps, splitProps } from "solid-js";
import { ThemeDescription, ThemeElementApi } from "../theme";
import { BaseComponentProps } from "../types";
import { Box } from "./Box";
import { createMugenComponent } from "./createMugenComponent";

export type FlexItemProps = {
  grow?: number | "inherit" | "initial" | "unset";
  shrink?: number | "inherit" | "initial" | "unset";
  basis?: number | "auto" | keyof ThemeDescription["sizes"];
  order?: number;
};

export const FlexItem = createMugenComponent(
  (props: BaseComponentProps & FlexItemProps) => {
    const [local, others] = splitProps(props, [
      "theme",
      "grow",
      "shrink",
      "basis",
      "order",
    ]);
    return mergeProps(
      {
        theme: {
          ...(local.basis ? { "flex-basis": local.basis } : {}),
          ...(local.grow ? { "flex-grow": local.grow } : {}),
          ...(local.shrink ? { "flex-shrink": local.shrink } : {}),
          ...(local.order ? { order: local.order } : {}),
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
