import { ClassList, Style } from "@mugen/core";
import { FlowProps, createEffect, on, splitProps } from "solid-js";
import { produce } from "solid-js/store";
import { useBox } from "../box/Box.context";
import { LayoutProps, layoutProps } from "./layout.types";

export function processLayoutProps(props: LayoutProps): [Style, ClassList] {
  if (layoutProps.some((prop) => prop in props)) {
    const [local, _] = splitProps(props, layoutProps);
    const style = {} as Style;
    const classList = {} as ClassList;
    if (local.jc) style["--_layout-justify-content"] = local.jc;
    if (local.ai) style["--_layout-align-items"] = local.ai;
    if (local.gap) style["--_layout-gap"] = `var(--spacing-${local.gap})`;
    if (local.reverse) {
      style["--_layout-direction"] = local.column
        ? "column-reverse"
        : "row-reverse";
    }
    classList.column = !!local.column;
    classList.layout = true;
    return [style, classList];
  }
  return [{}, {}];
}

export function Layout(props: FlowProps<LayoutProps>) {
  const layoutProps: (keyof LayoutProps)[] = [
    "jc",
    "ai",
    "gap",
    "column",
    "reverse",
  ];
  const [local, _] = splitProps(props, layoutProps);
  createEffect(
    on(
      () => [local.jc, local.ai, local.gap, local.column, local.reverse],
      () => {
        const context = useBox();
        const setState = context && context[1];
        if (setState) {
          setState(
            produce((draft) => {
              if (local.jc) draft.style["--_layout-justify-content"] = local.jc;
              if (local.ai) draft.style["--_layout-align-items"] = local.ai;
              if (local.gap)
                draft.style["--_layout-gap"] = `var(--spacing-${local.gap})`;
              if (local.reverse) {
                draft.style["--_layout-direction"] = local.column
                  ? "column-reverse"
                  : "row-reverse";
              } else {
                draft.classList.column = !!local.column;
              }
              draft.classList.layout = true;
              draft.consumedProps.push(...layoutProps);
            })
          );
        }
      }
    )
  );
  return props.children;
}
