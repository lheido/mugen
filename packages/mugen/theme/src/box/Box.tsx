import {
  CSSUnit,
  Either,
  Polymorphic,
  PolymorphicComponent,
  PolymorphicComponentProps,
  RoundedValues,
  SpacingValues,
  Style,
} from "@mugen/core";
import { FlowProps, createEffect, on, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { produce } from "solid-js/store";
import { LayoutProps, layoutProps, processLayoutProps } from "../layout";
import { SurfaceProps } from "../surface";
import { useBox } from "./Box.context";

export type PositionValues =
  | true
  | {
      top?: SpacingValues | `${SpacingValues}` | `-${SpacingValues}`;
      right?: SpacingValues | `${SpacingValues}` | `-${SpacingValues}`;
      bottom?: SpacingValues | `${SpacingValues}` | `-${SpacingValues}`;
      left?: SpacingValues | `${SpacingValues}` | `-${SpacingValues}`;
    };

export type sizeValues = "full" | "1/2" | `${number}${CSSUnit}` | number;

export type SizeProps = {
  size?: sizeValues;
  with?: sizeValues;
  height?: sizeValues;
};

export type PositionProps = Partial<
  Either<
    { absolute: PositionValues },
    Either<
      { sticky: PositionValues },
      Either<{ relative: PositionValues }, { fixed: PositionValues }>
    >
  >
>;

export type SpacingProps = {
  m?: SpacingValues | `${SpacingValues}`;
  mt?: SpacingValues | `${SpacingValues}`;
  mr?: SpacingValues | `${SpacingValues}`;
  mb?: SpacingValues | `${SpacingValues}`;
  ml?: SpacingValues | `${SpacingValues}`;
  mx?: SpacingValues | `${SpacingValues}`;
  my?: SpacingValues | `${SpacingValues}`;
  p?: SpacingValues | `${SpacingValues}`;
  pt?: SpacingValues | `${SpacingValues}`;
  pr?: SpacingValues | `${SpacingValues}`;
  pb?: SpacingValues | `${SpacingValues}`;
  pl?: SpacingValues | `${SpacingValues}`;
  px?: SpacingValues | `${SpacingValues}`;
  py?: SpacingValues | `${SpacingValues}`;
};

export type RoundedProps = {
  rounded?:
    | RoundedValues
    | Either<
        {
          t?: RoundedValues;
          b?: RoundedValues;
        },
        {
          r?: RoundedValues;
          l?: RoundedValues;
        }
      >
    | {
        tl?: RoundedValues;
        tr?: RoundedValues;
        br?: RoundedValues;
        bl?: RoundedValues;
      };
};

export type BoxProps = LayoutProps &
  // SpacingProps &
  RoundedProps &
  PositionProps &
  SizeProps &
  SurfaceProps;

function Position(props: FlowProps<PositionProps>) {
  const positionProps: (keyof PositionProps)[] = [
    "absolute",
    "sticky",
    "relative",
    "fixed",
  ];
  const [local, _] = splitProps(props, positionProps);
  createEffect(
    on(
      () => [local.absolute, local.sticky, local.relative, local.fixed],
      () => {
        const context = useBox();
        const setState = context && context[1];
        if (setState) {
          const position = positionProps.find((p) => !!local[p]);
          if (position) {
            setState(
              produce((draft) => {
                draft.classList[position] = true;
                const data = local[position];
                if (data && data !== true) {
                  Object.entries(data).forEach(([key, value]) => {
                    draft.style[
                      `--_position-${key}`
                    ] = `var(--spacing-${value})`;
                  });
                }
                draft.consumedProps.push(...positionProps);
              })
            );
          }
        }
      }
    )
  );
  return props.children;
}

function Rounded(props: FlowProps<RoundedProps>) {
  const roundedProps: (keyof RoundedProps)[] = ["rounded"];
  const [local, _] = splitProps(props, roundedProps);
  createEffect(
    on(
      () => local.rounded,
      () => {
        if (local.rounded) {
          const context = useBox();
          const setState = context && context[1];
          if (setState) {
            setState(
              produce((draft) => {
                draft.classList.rounded = true;

                const data: Record<string, RoundedValues | undefined> = {
                  tl: undefined,
                  tr: undefined,
                  br: undefined,
                  bl: undefined,
                };
                if (typeof local.rounded === "object") {
                  if (
                    "tl" in local.rounded ||
                    "tr" in local.rounded ||
                    "br" in local.rounded ||
                    "bl" in local.rounded
                  ) {
                    Object.entries(local.rounded).forEach(([key, value]) => {
                      data[key] = value;
                    });
                  } else if (
                    "t" in local.rounded ||
                    "r" in local.rounded ||
                    "b" in local.rounded ||
                    "l" in local.rounded
                  ) {
                    if (local.rounded.t || local.rounded.b) {
                      data.tl = local.rounded.t;
                      data.tr = local.rounded.t;
                      data.br = local.rounded.b;
                      data.bl = local.rounded.b;
                    } else {
                      data.tl = local.rounded.l;
                      data.tr = local.rounded.r;
                      data.br = local.rounded.r;
                      data.bl = local.rounded.l;
                    }
                  }
                } else {
                  data.tl = local.rounded;
                  data.tr = local.rounded;
                  data.br = local.rounded;
                  data.bl = local.rounded;
                }

                Object.entries(data).forEach(([key, value]) => {
                  if (value) {
                    draft.style[`--_rounded-${key}`] = `var(--rounded${
                      value !== true ? `-${value}` : ""
                    })`;
                  }
                });
                draft.consumedProps.push(...roundedProps);
              })
            );
          }
        }
      }
    )
  );
  return props.children;
}

export function Box<R = any, T extends PolymorphicComponent<R> = "div">(
  props: PolymorphicComponentProps<R, T> & BoxProps & JSX.HTMLAttributes<T>
): JSX.Element {
  const [local, _layoutProps, others] = splitProps(
    props,
    ["as", "classList", "style"],
    layoutProps
  );
  // const store = createStore<BoxContextState<R, T>>({
  //   classList: {},
  //   style: {},
  //   as: local.as,
  //   consumedProps: [],
  // });
  // const Provider = getContextProvider<R, T>();

  // const mergeClassList = () => ({ ...local.classList, ...store[0].classList });
  // const mergeStyles = () => ({
  //   ...store[0].style,
  //   ...(local.style as JSX.CSSProperties),
  // });
  // const othersProps = () => {
  //   store[0].consumedProps.forEach((prop) => {
  //     delete (others as any)[prop];
  //   });
  //   return others;
  // };

  const mergedProps = () => {
    const [layoutStyle, layoutClassList] = processLayoutProps(_layoutProps);
    return mergedProps(others, {
      style: { ...((local.style as Style) ?? {}), ...layoutStyle },
    });
  };

  return (
    // <Provider value={store}>
    //   <Layout {...props}>
    //     <Surface {...props}>
    //       <Position {...props}>
    //         <Rounded {...props}>
    <Polymorphic
      as={local.as}
      classList={mergeClassList()}
      style={mergeStyles()}
      {...othersProps()}
    >
      {props.children}
    </Polymorphic>
    //         </Rounded>
    //       </Position>
    //     </Surface>
    //   </Layout>
    // </Provider>
  );
}
