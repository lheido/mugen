import { JSX } from "solid-js";
import { BaseComponentProps } from "../types";

export type MugenComponentMixinProp<P, R> = (p: P) => () => R;

export type MugenComponent<P, R extends object> = ((
  props: P
) => JSX.Element) & {
  mixin: MugenComponentMixinProp<Omit<P, keyof BaseComponentProps>, R>;
};

export type Mixin<R extends object, P = never> = (props: P) => R;
export type Render<R> = (props: R) => JSX.Element;
export function createMugenComponent<Props, Return extends object>(
  mixin: Mixin<Return, Props>,
  render: Render<Return>
): MugenComponent<Props, Return> {
  const component: MugenComponent<Props, Return> = (props) =>
    render(mixin(props));
  component.mixin = (p: any) => () => mixin(p);
  return component;
}
