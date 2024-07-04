import {
  assignVars,
  createThemeContract,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import data from "../../theme.json";
import { mugen } from "./layers.css";
import { Breakpoints, LayoutFlex } from "./types";

const layoutValues = {
  justifyContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ],
  alignItems: ["flex-start", "center", "stretch", "flex-end", "baseline"],
  flexDirection: ["row", "column", "row-reverse", "column-reverse"],
  flexWrap: ["nowrap", "wrap"],
};

export const layoutContract = createThemeContract({
  justifyContent: "",
  alignItems: "",
  flexDirection: "",
  flexWrap: "",
  gap: "",
  ...Object.keys(data.breakpoints).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        justifyContent: "",
        alignItems: "",
        flexDirection: "",
        flexWrap: "",
        gap: "",
      },
    };
  }, {} as Record<keyof Breakpoints, LayoutFlex>),
});

export const internalLayoutContract = createThemeContract({
  justifyContent: "",
  alignItems: "",
  flexDirection: "",
  flexWrap: "",
  gap: "",
});

export const layoutCls = style({
  "@layer": {
    [mugen]: {
      vars: {
        [layoutContract.gap]: "0",
        ...Object.keys(data.breakpoints).reduce((acc, name) => {
          return {
            ...acc,
            [layoutContract[name as keyof Breakpoints].gap]: "0",
          };
        }, {} as Record<keyof Breakpoints, string>),
        ...assignVars(internalLayoutContract, {
          justifyContent: layoutContract.justifyContent,
          alignItems: layoutContract.alignItems,
          flexDirection: layoutContract.flexDirection,
          flexWrap: layoutContract.flexWrap,
          gap: layoutContract.gap,
        }),
      },
      display: "flex",
      minWidth: "0",
      minHeight: "0",
      justifyContent: internalLayoutContract.justifyContent,
      alignItems: internalLayoutContract.alignItems,
      flexDirection: internalLayoutContract.flexDirection,
      flexWrap: internalLayoutContract.flexWrap,
      gap: internalLayoutContract.gap,
    },
  },
});

export const layoutGapResponsive = styleVariants(
  Object.keys(data.breakpoints).reduce((acc, name) => {
    const breakpoint = name as keyof typeof data.breakpoints;
    const breakpointValue =
      data.breakpoints[name as keyof typeof data.breakpoints];
    return {
      ...acc,
      [breakpoint]: {
        "@layer": {
          [mugen]: {
            "@media": {
              [breakpointValue]: {
                vars: {
                  [internalLayoutContract.gap]: layoutContract[breakpoint].gap!,
                },
              },
            },
          },
        },
      },
    };
  }, {} as Record<keyof Breakpoints, any>)
);

export const layoutVariants = styleVariants({
  ...layoutValues.justifyContent.reduce((acc, value) => {
    return {
      ...acc,
      [`justify-${value}`]: {
        "@layer": {
          [mugen]: {
            vars: { [internalLayoutContract.justifyContent]: value },
          },
        },
      },
    };
  }, {} as Record<`justify-${LayoutFlex["justifyContent"]}`, any>),
  ...layoutValues.alignItems.reduce((acc, value) => {
    return {
      ...acc,
      [`items-${value}`]: {
        "@layer": {
          [mugen]: {
            vars: { [internalLayoutContract.alignItems]: value },
          },
        },
      },
    };
  }, {} as Record<`items-${LayoutFlex["alignItems"]}`, any>),
  ...layoutValues.flexDirection.reduce((acc, value) => {
    return {
      ...acc,
      [`direction-${value}`]: {
        "@layer": {
          [mugen]: {
            vars: { [internalLayoutContract.flexDirection]: value },
          },
        },
      },
    };
  }, {} as Record<`direction-${LayoutFlex["flexDirection"]}`, any>),
  ...layoutValues.flexWrap.reduce((acc, value) => {
    return {
      ...acc,
      [`wrap-${value}`]: {
        "@layer": {
          [mugen]: {
            vars: { [internalLayoutContract.flexWrap]: value },
          },
        },
      },
    };
  }, {} as Record<`wrap-${LayoutFlex["flexWrap"]}`, any>),
  // Generate responsive variants
  ...Object.keys(data.breakpoints).reduce((acc, name) => {
    const breakpoint = name as keyof typeof data.breakpoints;
    const breakpointValue =
      data.breakpoints[name as keyof typeof data.breakpoints];
    return {
      ...acc,
      ...layoutValues.justifyContent.reduce((accc, value) => {
        return {
          ...accc,
          [`justify-${breakpoint}-${value}`]: {
            "@layer": {
              [mugen]: {
                "@media": {
                  [breakpointValue]: {
                    vars: { [internalLayoutContract.justifyContent]: value },
                  },
                },
              },
            },
          },
        };
      }, {} as Record<`justify-${keyof Breakpoints}-${LayoutFlex["justifyContent"]}`, any>),
      ...layoutValues.alignItems.reduce((accc, value) => {
        return {
          ...accc,
          [`items-${breakpoint}-${value}`]: {
            "@layer": {
              [mugen]: {
                "@media": {
                  [breakpointValue]: {
                    vars: { [internalLayoutContract.alignItems]: value },
                  },
                },
              },
            },
          },
        };
      }, {} as Record<`items-${keyof Breakpoints}-${LayoutFlex["alignItems"]}`, any>),
      ...layoutValues.flexDirection.reduce((accc, value) => {
        return {
          ...accc,
          [`direction-${breakpoint}-${value}`]: {
            "@layer": {
              [mugen]: {
                "@media": {
                  [breakpointValue]: {
                    vars: { [internalLayoutContract.flexDirection]: value },
                  },
                },
              },
            },
          },
        };
      }, {} as Record<`direction-${keyof Breakpoints}-${LayoutFlex["flexDirection"]}`, any>),
      ...layoutValues.flexWrap.reduce((accc, value) => {
        return {
          ...accc,
          [`wrap-${breakpoint}-${value}`]: {
            "@layer": {
              [mugen]: {
                "@media": {
                  [breakpointValue]: {
                    vars: { [internalLayoutContract.flexWrap]: value },
                  },
                },
              },
            },
          },
        };
      }, {} as Record<`wrap-${keyof Breakpoints}-${LayoutFlex["flexWrap"]}`, any>),
    };
  }, {} as Record<`justify-${keyof Breakpoints}-${LayoutFlex["justifyContent"]}`, any> & Record<`items-${keyof Breakpoints}-${LayoutFlex["alignItems"]}`, any> & Record<`direction-${keyof Breakpoints}-${LayoutFlex["flexDirection"]}`, any> & Record<`wrap-${keyof Breakpoints}-${LayoutFlex["flexWrap"]}`, any>),
});
