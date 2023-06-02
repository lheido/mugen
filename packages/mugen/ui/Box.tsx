import { Component, createMemo, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  ImageAttributes,
  LinkAttributes,
  UniversalAttributes,
} from "../types/attributes.types";
import { ComponentProps } from "../types/component.types";

export type BoxProps = ComponentProps &
  UniversalAttributes &
  (Partial<ImageAttributes> | Partial<LinkAttributes>);

export const Box: Component<BoxProps> = (props: BoxProps) => {
  const [local, others] = splitProps(props, ["as", "theme"]);
  const as = createMemo(() => {
    if (local.as) return local.as;
    if ("src" in others) return "img";
    if ("href" in others) return "a";
    return "div";
  });
  return (
    <Dynamic
      component={as()}
      {...others}
      classList={local.theme?.execute() ?? {}}
    />
  );
};
