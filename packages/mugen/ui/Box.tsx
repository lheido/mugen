import { Component, createMemo, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Theme } from "../theme";
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
  const classList = createMemo(() => {
    if (local.theme) {
      return new Theme(local.theme).execute();
    }
    // In the case of as={MugenComponent} we need to take into account the classList property built in the "parent".
    if ((props as any).classList) return (props as any).classList;
    return {};
  });

  return <Dynamic component={as()} {...others} classList={classList()} />;
};
