import { children, createRenderEffect } from "solid-js";
import { ComponentProps, UniversalAttributes } from "../types";
import { Box } from "./Box";

export const Text = (props: ComponentProps & UniversalAttributes) => {
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
