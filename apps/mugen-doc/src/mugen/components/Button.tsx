import { ComponentProps } from "solid-js";
import { As } from "../semantic/As";
import { Box } from "./Box";

export type ButtonProps = ComponentProps<"button"> | ComponentProps<"a">;

export const Button = (props: ButtonProps) => {
  return (
    <As value={(props as any).href ? "a" : "button"}>
      <Box {...(props as any)} />
    </As>
  );
};
