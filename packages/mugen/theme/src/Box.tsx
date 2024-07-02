import {
  Polymorphic,
  PolymorphicComponent,
  PolymorphicComponentProps,
} from "@mugen/core";
import { splitProps } from "solid-js";
import { ElementModifier } from "./modifier";

export type BoxProps = {
  modifier?: ElementModifier;
};

export function Box<R = any, T extends PolymorphicComponent<R> = "div">(
  props: BoxProps &
    Omit<PolymorphicComponentProps<R, T>, "class" | "style" | "classList">
) {
  const [local, others] = splitProps(props, ["modifier"]);
  return (
    <Polymorphic
      classList={local.modifier?.buildClassList()}
      style={local.modifier?.buildStyle()}
      {...others}
    />
  );
}
