import { Accessor, For, Index, JSX, Show, splitProps } from "solid-js";
import { Box, BoxProps } from "./Box";

export type ListProps<T extends readonly any[], U extends JSX.Element> = Omit<
  BoxProps<"ul">,
  "as" | "children"
> & {
  ordered?: boolean;
  each: T | undefined | null | false;
  fallback?: JSX.Element;
  children: (item: T[number], index: Accessor<number>) => U;
};

export function List<T extends readonly any[], U extends JSX.Element>(
  props: ListProps<T, U>
) {
  const [local, others] = splitProps(props, [
    "ordered",
    "each",
    "children",
    "fallback",
  ]);
  return (
    <Show when={local.each && local.each.length > 0} fallback={local.fallback}>
      <Box as={local.ordered ? "ol" : "ul"} {...others}>
        <For each={local.each} children={local.children} />
      </Box>
    </Show>
  );
}

export type IndexListProps<
  T extends readonly any[],
  U extends JSX.Element
> = Omit<BoxProps<"ul">, "as" | "children"> & {
  ordered?: boolean;
  each: T | undefined | null | false;
  fallback?: JSX.Element;
  children: (item: Accessor<T[number]>, index: number) => U;
};

export function IndexList<T extends readonly any[], U extends JSX.Element>(
  props: IndexListProps<T, U>
) {
  const [local, others] = splitProps(props, [
    "ordered",
    "each",
    "children",
    "fallback",
  ]);
  return (
    <Show when={local.each && local.each.length > 0} fallback={local.fallback}>
      <Box as={local.ordered ? "ol" : "ul"} {...others}>
        <Index each={local.each} children={local.children} />
      </Box>
    </Show>
  );
}
