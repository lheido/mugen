import { Component, createMemo, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useThemeClassList } from "../theme";
import {
  ComponentProps,
  PartialElementAttributes,
  UniversalAttributes,
} from "../types";

export type BoxProps = ComponentProps &
  UniversalAttributes &
  PartialElementAttributes;

export const Box: Component<BoxProps> = (props: BoxProps) => {
  // @ts-ignore (Expression produces a union type that is too complex to represent.)
  const [local, others] = splitProps(props, ["as", "theme"]);
  const as = createMemo(() => {
    if (local.as) return local.as;
    if ("src" in others) return "img";
    if ("href" in others) return "a";
    return "div";
  });
  const classList2 = useThemeClassList(props);

  return <Dynamic component={as()} {...others} classList={classList2()} />;
};
