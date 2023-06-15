import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import {
  children,
  createEffect,
  createMemo,
  For,
  JSX,
  Show,
  splitProps,
} from "solid-js";
import { ThemeDescription, ThemeElementApi } from "../theme";
import { BaseComponentProps } from "../types";
import { Box } from "./Box";

export type ListItemChildren<I> = (item: I) => JSX.Element | JSX.Element[];

export type ListProps<I> = {
  each: I[];
  children: ListItemChildren<I>;
  /**
   * The minimum height of the list item to enable the virtual scroll behavior
   */
  minItemHeight?: number;
};
export type ListStyleProps =
  | { bullet: true; square?: never; ordered?: never }
  | { bullet?: never; square: true; ordered?: never }
  | { bullet?: never; square?: never; ordered: true }
  | { bullet?: never; square?: never; ordered?: never };

function ListItem(props: {
  minItemHeight?: number;
  children: JSX.Element | JSX.Element[];
}) {
  let ref!: HTMLLIElement;
  const visible = createVisibilityObserver()(() => ref);
  const resolvedChildren = children(() => props.children);
  const childrenHeight = createMemo(() => {
    const elts = resolvedChildren();
    const items = (Array.isArray(elts) ? elts : [elts]) as HTMLElement[];
    return items.reduce(
      (sum, item) => sum + item.getBoundingClientRect().height,
      0
    );
  });
  const refHeight = createMemo(() => {
    const height = childrenHeight();
    const defaultHeight = props.minItemHeight;
    return height || defaultHeight;
  });
  createEffect(() => {
    if (ref && refHeight() && refHeight()! > 0) {
      ref.style.height = `${refHeight()}px`;
    }
  });
  return (
    <Box ref={ref} as="li">
      <Show
        when={props.minItemHeight !== undefined}
        fallback={resolvedChildren()}
      >
        <Show when={visible()}>{resolvedChildren()}</Show>
      </Show>
    </Box>
  );
}

export function List<I>(
  props: Omit<BaseComponentProps, "children"> & ListProps<I> & ListStyleProps
) {
  const [local, style, others] = splitProps(
    props,
    ["each", "children", "as", "theme", "minItemHeight"],
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
        {(item) => (
          <ListItem minItemHeight={local.minItemHeight}>
            {props.children(item)}
          </ListItem>
        )}
      </For>
    </Box>
  );
}
