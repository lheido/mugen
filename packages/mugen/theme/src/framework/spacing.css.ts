import {
  assignVars,
  createThemeContract,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import data from "../../theme.json";
import { mugen } from "./layers.css";
import { Breakpoints, SpacingProps } from "./types";

export const spacingContract = createThemeContract({
  top: "",
  bottom: "",
  left: "",
  right: "",
  ...Object.keys(data.breakpoints).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        top: "",
        bottom: "",
        left: "",
        right: "",
      },
    };
  }, {} as Record<keyof Breakpoints, SpacingProps>),
});

export const internalSpacingContract = createThemeContract({
  top: "",
  bottom: "",
  left: "",
  right: "",
});

export const spacingCls = style({
  "@layer": {
    [mugen]: {
      vars: {
        ...assignVars(spacingContract, {
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          ...Object.keys(data.breakpoints).reduce((acc, name) => {
            return {
              ...acc,
              [name]: {
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
              },
            };
          }, {} as Record<keyof typeof data.breakpoints, SpacingProps>),
        }),
        ...assignVars(internalSpacingContract, {
          top: spacingContract.top,
          bottom: spacingContract.bottom,
          left: spacingContract.left,
          right: spacingContract.right,
        }),
      },
      paddingTop: internalSpacingContract.top,
      paddingBottom: internalSpacingContract.bottom,
      paddingLeft: internalSpacingContract.left,
      paddingRight: internalSpacingContract.right,
    },
  },
});

type SpacingResponsiveKeys = `${keyof Breakpoints}-${keyof SpacingProps}`;

export const spacingResponsive = styleVariants(
  Object.keys(data.breakpoints).reduce((acc, name) => {
    const breakpoint = name as keyof Breakpoints;
    const breakpointValue = data.breakpoints[breakpoint];
    return {
      ...acc,
      ...Object.keys(internalSpacingContract).reduce((accc, name) => {
        const edge = name as keyof typeof internalSpacingContract;
        const variantName = `${breakpoint}-${edge}`;
        return {
          ...accc,
          [variantName]: {
            "@layer": {
              [mugen]: {
                "@media": {
                  [breakpointValue]: {
                    vars: {
                      [internalSpacingContract[edge]]:
                        spacingContract[breakpoint][edge]!,
                    },
                  },
                },
              },
            },
          },
        };
      }, {} as any),
    };
  }, {} as Record<SpacingResponsiveKeys, any>)
);
