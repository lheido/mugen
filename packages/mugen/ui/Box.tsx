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
  const [local, others] = splitProps(props, ["tag", "theme"]);
  const tag = createMemo(() => {
    if (local.tag) return local.tag;
    if ("src" in others) return "img";
    if ("href" in others) return "a";
    return "div";
  });
  return (
    <Dynamic
      component={tag()}
      {...others}
      class={(local.theme?.execute() ?? []).join(" ")}
    />
  );
};
