import { createMemo, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useThemeClassList } from "../theme";
import { BaseComponentProps, LinkAttributes } from "../types";
import { createMugenComponent } from "./createMugenComponent";

export type BoxProps = BaseComponentProps & Partial<LinkAttributes>;

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
