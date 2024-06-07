import { Component, JSX, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export type PolymorphicComponent<P> =
  | keyof JSX.IntrinsicElements
  | Component<P>
  | (string & {});

export type PolymorphicComponentProps<
  R,
  T extends PolymorphicComponent<R>
> = (T extends Component<infer P>
  ? P
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : Record<string, unknown>) & { as?: T };

export function Polymorphic<R = any, T extends PolymorphicComponent<R> = "div">(
  props: PolymorphicComponentProps<R, T>
) {
  const [local, others] = splitProps(props, ["as"]);
  const _local = mergeProps({ as: "div" }, local);
  return <Dynamic component={_local.as} {...others} />;
}
