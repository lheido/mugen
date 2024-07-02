import {
  assignVars,
  createThemeContract,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import data from "../../theme.json";
import { mugen } from "./layers.css";
import { Breakpoints, RoundedProps } from "./types";

export const roundedContract = createThemeContract({
  topLeft: "",
  topRight: "",
  bottomLeft: "",
  bottomRight: "",
  ...Object.keys(data.breakpoints).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        topLeft: "",
        topRight: "",
        bottomLeft: "",
        bottomRight: "",
      },
    };
  }, {} as Record<keyof Breakpoints, RoundedProps>),
});

export const internalRoundedContract = createThemeContract({
  topLeft: "",
  topRight: "",
  bottomLeft: "",
  bottomRight: "",
});

export const roundedCls = style({
  "@layer": {
    [mugen]: {
      vars: {
        ...assignVars(roundedContract, {
          topLeft: "0",
          topRight: "0",
          bottomLeft: "0",
          bottomRight: "0",
          ...Object.keys(data.breakpoints).reduce((acc, name) => {
            return {
              ...acc,
              [name]: {
                topLeft: "0",
                topRight: "0",
                bottomLeft: "0",
                bottomRight: "0",
              },
            };
          }, {} as Record<keyof typeof data.breakpoints, RoundedProps>),
        }),
        ...assignVars(internalRoundedContract, {
          topLeft: roundedContract.topLeft,
          topRight: roundedContract.topRight,
          bottomLeft: roundedContract.bottomLeft,
          bottomRight: roundedContract.bottomRight,
        }),
      },
      borderTopLeftRadius: internalRoundedContract.topLeft,
      borderTopRightRadius: internalRoundedContract.topRight,
      borderBottomLeftRadius: internalRoundedContract.bottomLeft,
      borderBottomRightRadius: internalRoundedContract.bottomRight,
    },
  },
});

type RoundedResponsiveKeys = `${keyof Breakpoints}-${keyof RoundedProps}`;

export const roundedResponsive = styleVariants(
  Object.keys(data.breakpoints).reduce((acc, name) => {
    const breakpoint = name as keyof Breakpoints;
    const breakpointValue = data.breakpoints[breakpoint];
    return {
      ...acc,
      ...Object.keys(internalRoundedContract).reduce((accc, name) => {
        const edge = name as keyof typeof internalRoundedContract;
        const variantName = `${breakpoint}-${edge}`;
        return {
          ...accc,
          [variantName]: {
            "@layer": {
              [mugen]: {
                "@media": {
                  [breakpointValue]: {
                    vars: {
                      [internalRoundedContract[edge]]:
                        roundedContract[breakpoint][edge]!,
                    },
                  },
                },
              },
            },
          },
        };
      }, {} as any),
    };
  }, {} as Record<RoundedResponsiveKeys, any>)
);
