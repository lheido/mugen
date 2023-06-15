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

// type BoxProps = { mixins?: any[] } & Record<string, any>;
// const Box = createComponent(
//   (p: BoxProps) => {
//     const [local, others] = splitProps(p, ["mixins"]);
//     let mixedProps = {};
//     if (local?.mixins) {
//       local.mixins.forEach((m: () => any) => {
//         mixedProps = { ...mixedProps, ...m() };
//       });
//     }
//     return { component: "div", ...(others ?? {}), ...mixedProps };
//   },
//   (p) => <Dynamic {...p} />
// );

// const Foo = createComponent(
//   (p: { lorem: boolean }) => ({ onClick: () => console.log("click", p.lorem) }),
//   (p) => <Box {...p} />
// );

// function App() {
//   return <Box mixins={[Foo.mixin({ lorem: true })]} />;
// }
