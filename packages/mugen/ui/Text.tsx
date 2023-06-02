import { children, createRenderEffect } from "solid-js";
import { ComponentProps, LinkAttributes, UniversalAttributes } from "../types";
import { Box } from "./Box";

export const Text = (
  props: ComponentProps & UniversalAttributes & LinkAttributes
) => {
  const resolved = children(() => props.children);
  createRenderEffect(() => {
    console.log(resolved());
  });
  return (
    <Box
      {...{
        as: props.as ?? "p",
        ...props,
        children: resolved(),
      }}
    />
  );
};
