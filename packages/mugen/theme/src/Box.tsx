import {
  Polymorphic,
  PolymorphicComponent,
  PolymorphicComponentProps,
} from "@mugen/core";
import { splitProps } from "solid-js";
import { Modifier } from "./Modifier";

export type BoxProps = {
  modifier?: typeof Modifier;
};

export function Box<R = any, T extends PolymorphicComponent<R> = "div">(
  props: BoxProps &
    Omit<PolymorphicComponentProps<R, T>, "class" | "style" | "classList">
) {
  const [local, others] = splitProps(props, ["modifier"]);
  return <Polymorphic class={local.modifier?.toString()} {...others} />;
}
