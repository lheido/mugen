import { ThemeDescription } from "../theme";
import {
  ComponentProps,
  PartialElementAttributes,
  UniversalAttributes,
} from "../types";
import { alignItemsMap, FlexLayout, justifyContentMap } from "./FlexLayout";

export type RowProps = {
  gap?: keyof ThemeDescription["spacing"];
  content?: keyof typeof justifyContentMap;
  items?: keyof typeof alignItemsMap;
  reverse?: boolean;
};

export const Row = (
  props: ComponentProps &
    UniversalAttributes &
    RowProps &
    PartialElementAttributes
) => {
  return (
    <FlexLayout direction={props.reverse ? "row-reverse" : "row"} {...props} />
  );
};
