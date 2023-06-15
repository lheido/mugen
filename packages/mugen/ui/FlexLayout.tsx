import { mergeProps, splitProps } from "solid-js";
import {
  ThemeAlignItemsValue,
  ThemeDescription,
  ThemeElementApi,
  ThemeFlexDirectionValue,
  ThemeJustifyContentValue,
} from "../theme";
import { BaseComponentProps } from "../types";
import { Box } from "./Box";
import { createMugenComponent } from "./createMugenComponent";

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

// export function FlexLayout(props: BaseComponentProps & FlexLayoutProps) {
//   // @ts-ignore
//   const [local, others] = splitProps(props, [
//     "gap",
//     "theme",
//     "content",
//     "items",
//     "direction",
//   ]);
//   return (
//     <Box
//       {...{
//         theme: {
//           display: "flex",
//           ...(local.content
//             ? { "justify-content": justifyContentMap[local.content] }
//             : {}),
//           ...(local.gap ? { gap: local.gap } : {}),
//           ...(local.items ? { "align-items": alignItemsMap[local.items] } : {}),
//           ...(local.direction ? { "flex-direction": local.direction } : {}),
//           ...(local.theme ?? {}),
//         } as ThemeElementApi<ThemeDescription>,
//         ...others,
//       }}
//     />
//   );
// }

export const FlexLayout = createMugenComponent(
  (props: BaseComponentProps & FlexLayoutProps) => {
    const [local, others] = splitProps(props, [
      "gap",
      "theme",
      "content",
      "items",
      "direction",
    ]);
    return mergeProps(
      {
        theme: {
          display: "flex",
          ...(local.content
            ? { "justify-content": justifyContentMap[local.content] }
            : {}),
          ...(local.gap ? { gap: local.gap } : {}),
          ...(local.items ? { "align-items": alignItemsMap[local.items] } : {}),
          ...(local.direction ? { "flex-direction": local.direction } : {}),
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
