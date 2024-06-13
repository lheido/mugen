import {
  createGlobalTheme,
  createVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { mugen } from "../../layers.css";
import { spacingValues } from "../../spacing.css";

export const spacings = createGlobalTheme(":root", {
  ...spacingValues,
});

const paddingVar = createVar();
const gapVar = createVar();

export const padding = style({
  "@layer": {
    [mugen]: {
      [paddingVar]: spacings[0],
    },
  },
});

styleVariants(padding, {
  0: {
    [paddingVar]: spacings[0],
  },
  1: {
    [paddingVar]: spacings[1],
  },
  2: {
    [paddingVar]: spacings[2],
  },
  3: {
    [paddingVar]: spacings[3],
  },
  4: {
    [paddingVar]: spacings[4],
  },
  5: {
    [paddingVar]: spacings[5],
  },
  6: {
    [paddingVar]: spacings[6],
  },
  7: {
    [paddingVar]: spacings[7],
  },
  8: {
    [paddingVar]: spacings[8],
  },
  9: {
    [paddingVar]: spacings[9],
  },
  10: {
    [paddingVar]: spacings[10],
  },
  11: {
    [paddingVar]: spacings[11],
  },
  12: {
    [paddingVar]: spacings[12],
  },
  13: {
    [paddingVar]: spacings[13],
  },
  14: {
    [paddingVar]: spacings[14],
  },
  15: {
    [paddingVar]: spacings[15],
  },
  16: {
    [paddingVar]: spacings[16],
  },
});
