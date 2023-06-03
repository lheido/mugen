import { splitProps } from "solid-js";
import {
  ThemeAlignItemsValue,
  ThemeDescription,
  ThemeElementApi,
  ThemeFlexDirectionValue,
  ThemeJustifyContentValue,
} from "../theme";
import {
  ComponentProps,
  PartialElementAttributes,
  UniversalAttributes,
} from "../types";
import { Box } from "./Box";

export type justifyContentKey =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"
  | "stretch";
export type alignItemsKey = "start" | "end" | "center" | "baseline" | "stretch";

export const justifyContentMap: Record<
  justifyContentKey,
  ThemeJustifyContentValue
> = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
} as const;

export const alignItemsMap: Record<alignItemsKey, ThemeAlignItemsValue> = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  baseline: "baseline",
  stretch: "stretch",
} as const;

export type FlexLayoutProps = {
  gap?: keyof ThemeDescription["spacing"];
  content?: keyof typeof justifyContentMap;
  items?: keyof typeof alignItemsMap;
  direction?: ThemeFlexDirectionValue;
};

export const FlexLayout = (
  props: ComponentProps &
    UniversalAttributes &
    FlexLayoutProps &
    PartialElementAttributes
) => {
  // @ts-ignore
  const [local, others] = splitProps(props, [
    "gap",
    "theme",
    "content",
    "items",
    "direction",
  ]);
  return (
    <Box
      {...{
        theme: {
          ...(local.theme ?? {}),
          display: "flex",
          gap: local.gap,
          ...(local.content
            ? { "justify-content": justifyContentMap[local.content] }
            : {}),
          ...(local.items ? { "align-items": alignItemsMap[local.items] } : {}),
          ...(local.direction ? { "flex-direction": local.direction } : {}),
        } as ThemeElementApi<ThemeDescription>,
        ...others,
      }}
    />
  );
};
