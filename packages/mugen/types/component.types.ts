import { JSX } from "solid-js/jsx-runtime";
import { ThemeDescription, ThemeElementApi } from "../theme";

export type MugenComponent<P> = (props: P) => JSX.Element;

export type BaseComponentProps = {
  theme?: ThemeElementApi<ThemeDescription>;
  as?: string | MugenComponent<any>;
  mixins?: any[];
  children?: JSX.Element | JSX.Element[];
};

// export type ComponentProps<A> = BaseComponentProps & {
//   as?: A;
// } & (A extends MugenComponent<infer P>
//     ? P
//     : { children?: JSX.Element | JSX.Element[] });

// export type ComponentProps = BaseComponentProps
