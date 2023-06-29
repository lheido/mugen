import { Accessor, createMemo, For, JSX, splitProps } from "solid-js";
import { ThemeDescription, ThemeElementApi } from "../theme";
import { BaseComponentProps } from "../types";
import { Box } from "./Box";

export type ListItemChildren<I> = (
  item: I,
  index: Accessor<number>
) => JSX.Element | JSX.Element[];

export type ListProps<I> = {
  each: I[];
  children: ListItemChildren<I>;
};
export type ListStyleProps =
  | { bullet: true; square?: never; ordered?: never }
  | { bullet?: never; square: true; ordered?: never }
  | { bullet?: never; square?: never; ordered: true }
  | { bullet?: never; square?: never; ordered?: never };

export function List<I>(
  props: Omit<BaseComponentProps, "children"> & ListProps<I> & ListStyleProps
) {
  const [local, style, others] = splitProps(
    props,
    ["each", "children", "as", "theme"],
    ["bullet", "square", "ordered"]
  );
  const as = createMemo(() => {
    return local.as ? local.as : style.ordered ? "ol" : "ul";
  });
  return (
    <Box
      as={as()}
      theme={
        {
          ...(style.bullet || style.square || style.ordered
            ? {
                "list-style": style.bullet
                  ? "disc"
                  : style.square
                  ? "square"
                  : "decimal",
              }
            : {}),
          ...(local.theme ?? {}),
        } as ThemeElementApi<ThemeDescription>
      }
      {...others}
    >
      <For each={local.each}>
        {(item, i) => (
          <Box
            as="li"
            theme={
              {
                display:
                  style.bullet || style.square || style.ordered
                    ? "list-item"
                    : "contents",
              } as ThemeElementApi<ThemeDescription>
            }
          >
            {props.children(item, i)}
          </Box>
        )}
      </For>
    </Box>
  );
}
