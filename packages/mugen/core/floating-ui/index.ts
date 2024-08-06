import {
  computePosition,
  ComputePositionConfig,
  ComputePositionReturn,
  FloatingElement,
  ReferenceElement,
} from "@floating-ui/dom";
import { Accessor, createEffect, createSignal, JSX, on } from "solid-js";

export function createFloatingUI(
  reference: Accessor<ReferenceElement>,
  floating: Accessor<FloatingElement>,
  options?: Partial<ComputePositionConfig>
) {
  const [position, setPosition] = createSignal<
    ComputePositionReturn | undefined
  >();
  createEffect(
    on(
      () => [reference(), floating()],
      () => {
        if (!reference() || !floating()) setPosition(undefined);
        else
          computePosition(reference(), floating(), options).then(setPosition);
      }
    )
  );
  return position;
}

export function createResponsiveFloatingUI(
  reference: Accessor<ReferenceElement>,
  floating: Accessor<FloatingElement>,
  options?: Partial<ComputePositionConfig>
) {
  function updatePosition() {
    if (!reference() || !floating()) return;
    computePosition(reference(), floating(), options).then();
  }
}

export type FloatingUIProps = {
  reference: Accessor<ReferenceElement>;
  options?: Partial<ComputePositionConfig>;
  children: (props: { style: JSX.CSSProperties }) => JSX.Element;
};

export function FloatingUI(props: FloatingUIProps) {
  return props.children({ style: {} });
}

export * from "@floating-ui/dom";
