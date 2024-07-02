import {
  assignVars,
  createThemeContract,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import data from "../../theme.json";
import { mugen } from "./layers.css";
import { Breakpoints } from "./types";

export type PositionProps = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
};

export const positionContract = createThemeContract({
  top: "",
  right: "",
  bottom: "",
  left: "",
  zIndex: "",
  ...Object.keys(data.breakpoints).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        top: "",
        right: "",
        bottom: "",
        left: "",
        zIndex: "",
      },
    };
  }, {} as Record<keyof Breakpoints, PositionProps>),
});

export const internalPositionContract = createThemeContract({
  top: "",
  right: "",
  bottom: "",
  left: "",
  zIndex: "",
});

export const positionCls = style({
  "@layer": {
    [mugen]: {
      vars: {
        ...assignVars(positionContract, {
          top: "",
          right: "",
          bottom: "",
          left: "",
          zIndex: "",
          ...Object.keys(data.breakpoints).reduce((acc, name) => {
            return {
              ...acc,
              [name]: {
                top: "",
                right: "",
                bottom: "",
                left: "",
                zIndex: "",
              },
            };
          }, {} as Record<keyof Breakpoints, PositionProps>),
        }),
        ...assignVars(internalPositionContract, {
          top: positionContract.top,
          right: positionContract.right,
          bottom: positionContract.bottom,
          left: positionContract.left,
          zIndex: positionContract.zIndex,
        }),
      },
      top: internalPositionContract.top,
      right: internalPositionContract.right,
      bottom: internalPositionContract.bottom,
      left: internalPositionContract.left,
      zIndex: internalPositionContract.zIndex,
    },
  },
});

export const positionVariants = styleVariants({
  relative: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
  },
  fixed: {
    position: "fixed",
  },
  sticky: {
    position: "sticky",
  },
  static: {
    position: "static",
  },
  initial: {
    position: "initial",
  },
});

export type PositionResponsiveKeys =
  `${keyof Breakpoints}-${keyof PositionProps}`;

export const positionResponsive = styleVariants(
  Object.keys(data.breakpoints).reduce((acc, name) => {
    const breakpoint = name as keyof Breakpoints;
    const breakpointValue = data.breakpoints[breakpoint];
    return {
      ...acc,
      ...Object.keys(internalPositionContract).reduce((acc, key) => {
        const edge = key as keyof typeof internalPositionContract;
        const variantName = `${breakpoint}-${edge}`;
        return {
          ...acc,
          [variantName]: {
            "@layer": {
              [mugen]: {
                "@media": {
                  [breakpointValue]: {
                    vars: {
                      [internalPositionContract[edge]]:
                        positionContract[breakpoint][edge]!,
                    },
                  },
                },
              },
            },
          },
        };
      }, {} as any),
    };
  }, {} as Record<PositionResponsiveKeys, any>)
);
