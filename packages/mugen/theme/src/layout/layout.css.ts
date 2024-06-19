import {
  assignVars,
  createThemeContract,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { mugen } from "../../layers.css";
import { spacings } from "../../theme.css";

export type LayoutFlex = {
  justifyContent?:
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "flex-start"
    | "flex-end";
  alignItems?: "center" | "stretch" | "flex-start" | "flex-end" | "baseline";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap?: "wrap" | "nowrap";
};

export const layout = createThemeContract({
  padding: {
    top: "",
    bottom: "",
    left: "",
    right: "",
  },
  gap: "",
  justifyContent: "",
  alignItems: "",
  flexDirection: "",
  flexWrap: "",
});

const layoutValues: Partial<Record<keyof typeof layout, string[]>> = {
  justifyContent: [
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "flex-start",
    "flex-end",
  ],
  alignItems: ["center", "stretch", "flex-start", "flex-end", "baseline"],
  flexDirection: ["row", "column", "row-reverse", "column-reverse"],
  flexWrap: ["wrap", "nowrap"],
};

export const layoutClass = style({
  "@layer": {
    [mugen]: {
      vars: assignVars(layout, {
        padding: {
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        },
        gap: "",
        justifyContent: "",
        alignItems: "",
        flexDirection: "",
        flexWrap: "",
      }),
      display: "flex",
      gap: layout.gap,
      minWidth: 0,
      minHeight: 0,
      justifyContent: layout.justifyContent,
      alignItems: layout.alignItems,
      flexDirection: layout.flexDirection,
      flexWrap: layout.flexWrap,
      paddingTop: layout.padding.top,
      paddingBottom: layout.padding.bottom,
      paddingLeft: layout.padding.left,
      paddingRight: layout.padding.right,
    },
  },
});

export const layoutVariants = styleVariants({
  fill: {
    "@layer": {
      [mugen]: {
        flexGrow: 1,
      },
    },
  },
  ...Object.entries(layoutValues).reduce((acc, [key, values]) => {
    return {
      ...acc,
      ...values.reduce((acc, value) => {
        const k = key as keyof typeof layout;
        return {
          ...acc,
          [`${key}-${value}`]: {
            "@layer": {
              [mugen]: {
                vars: {
                  [layout[k] as string]: value,
                },
              },
            },
          },
        };
      }, {} as any),
    };
  }, {} as any),
  ...Object.keys(spacings).reduce((acc, name) => {
    const value = spacings[name as unknown as keyof typeof spacings];
    return {
      ...acc,
      [`gap-${name}`]: {
        "@layer": {
          [mugen]: {
            vars: {
              [layout.gap]: value,
            },
          },
        },
      },
      [`spacing-${name}`]: {
        "@layer": {
          [mugen]: {
            vars: assignVars(layout.padding, {
              top: value,
              bottom: value,
              left: value,
              right: value,
            }),
          },
        },
      },
      ...Object.keys(layout.padding)
        .map((key) => ({
          [`spacing-${key}-${name}`]: {
            "@layer": {
              [mugen]: {
                vars: {
                  [layout.padding[
                    key as unknown as keyof typeof layout.padding
                  ]]: value,
                },
              },
            },
          },
        }))
        .reduce((acc, v) => ({ ...acc, ...v }), {}),
      ...Object.entries({
        x: { [layout.padding.left]: value, [layout.padding.right]: value },
        y: { [layout.padding.top]: value, [layout.padding.bottom]: value },
      })
        .map(([key, vars]) => ({
          [`spacing-${key}-${name}`]: {
            "@layer": {
              [mugen]: {
                vars: vars as any,
              },
            },
          },
        }))
        .reduce((acc, v) => ({ ...acc, ...v }), {}),
    };
  }, {} as any),
});
