import { FlowProps, createEffect, on, splitProps } from "solid-js";
import { produce } from "solid-js/store";
import { useBox } from "../box/Box.context";
import { surface, surfaceVariants } from "./surface.css";
import { SurfaceColors } from "./surface.types";

export type SurfaceValues = true | keyof SurfaceColors;

export type SurfaceProps = {
  surface?: SurfaceValues;
  border?: SurfaceValues;
};

export function Surface(props: FlowProps<SurfaceProps>) {
  const surfaceProps: (keyof SurfaceProps)[] = ["surface", "border"];
  const [local, _] = splitProps(props, surfaceProps);
  const context = useBox();
  createEffect(
    on(
      () => [local.surface, local.border],
      () => {
        const setState = context && context[1];
        if (setState) {
          setState(
            produce((draft) => {
              if (local.surface) {
                draft.classList[surface] = true;
                if (local.surface !== true) {
                  draft.classList[surfaceVariants[local.surface]] = true;
                }
                draft.consumedProps.push(...surfaceProps);
              }
              if (local.border) {
                draft.classList["use-border"] = true;
                if (local.border !== true) {
                  draft.classList[`border-${local.border}`] = true;
                }
              }
            })
          );
        }
      }
    )
  );
  return props.children;
}
