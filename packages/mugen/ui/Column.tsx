import { splitProps } from "solid-js";
import { ThemeDescription } from "../theme";
import { BaseComponentProps } from "../types";
import { Box } from "./Box";
import { createMugenComponent } from "./createMugenComponent";
import { alignItemsMap, FlexLayout, justifyContentMap } from "./FlexLayout";

export type ColumnProps = {
  gap?: keyof ThemeDescription["spacing"];
  content?: keyof typeof justifyContentMap;
  items?: keyof typeof alignItemsMap;
  reverse?: boolean;
};

export const Column = createMugenComponent(
  (p: BaseComponentProps & ColumnProps) => {
    const [local, others] = splitProps(p, ["reverse"]);
    return FlexLayout.mixin({
      ...others,
      direction: local.reverse ? "column-reverse" : "column",
    })();
  },
  (p) => {
    return <Box {...p} />;
  }
);
