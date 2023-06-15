import { splitProps } from "solid-js";
import { ThemeDescription } from "../theme";
import { BaseComponentProps } from "../types";
import { Box } from "./Box";
import { createMugenComponent } from "./createMugenComponent";
import { alignItemsMap, FlexLayout, justifyContentMap } from "./FlexLayout";

export type RowProps = {
  gap?: keyof ThemeDescription["spacing"];
  content?: keyof typeof justifyContentMap;
  items?: keyof typeof alignItemsMap;
  reverse?: boolean;
};

export const Row = createMugenComponent(
  (p: BaseComponentProps & RowProps) => {
    const [local, others] = splitProps(p, ["reverse"]);
    return FlexLayout.mixin({
      ...others,
      direction: local.reverse ? "row-reverse" : "row",
    })();
  },
  (p) => {
    return <Box {...p} />;
  }
);
