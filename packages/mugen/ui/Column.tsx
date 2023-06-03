import { ThemeDescription } from "../theme";
import {
  ComponentProps,
  PartialElementAttributes,
  UniversalAttributes,
} from "../types";
import { alignItemsMap, FlexLayout, justifyContentMap } from "./FlexLayout";

export type ColumnProps = {
  gap?: keyof ThemeDescription["spacing"];
  content?: keyof typeof justifyContentMap;
  items?: keyof typeof alignItemsMap;
  reverse?: boolean;
};

export const Column = (
  props: ComponentProps &
    UniversalAttributes &
    ColumnProps &
    PartialElementAttributes
) => {
  return (
    <FlexLayout
      direction={props.reverse ? "column-reverse" : "column"}
      {...props}
    />
  );
};
