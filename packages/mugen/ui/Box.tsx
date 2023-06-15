import { createMemo, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useThemeClassList } from "../theme";
import { BaseComponentProps } from "../types";
import { createMugenComponent } from "./createMugenComponent";

// export type BoxProps<A> = ComponentProps<A> & UniversalAttributes;
// UniversalAttributes &
// PartialElementAttributes;

// export function Box<P, A extends string | MugenComponent<P>>(
//   props: ComponentProps<P>
// ) {
//   const [local, others] = splitProps(props, ["as", "theme"]);
//   const as = createMemo(() => {
//     if (local.as) return local.as as A;
//     if ("src" in others) return "img";
//     if ("href" in others) return "a";
//     return "div";
//   });
//   const classList = useThemeClassList(props);

//   return <Dynamic component={as()} {...others} classList={classList()} />;
// }

export type BoxProps = BaseComponentProps;

export const Box = createMugenComponent(
  (p: BoxProps) => p,
  (props) => {
    const [local, others] = splitProps(props, ["as", "theme", "mixins"]);
    const as = createMemo(() => {
      if (local.as) return local.as;
      if ("src" in others) return "img";
      if ("href" in others) return "a";
      return "div";
    });
    let _props = {};
    if (props?.mixins) {
      props.mixins.forEach((m: () => any) => {
        _props = mergeProps(_props, m());
      });
    }
    const classList = useThemeClassList(_props, props);
    return <Dynamic component={as()} {...others} classList={classList()} />;
  }
);
