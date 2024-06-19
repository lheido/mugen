import {
  createThemeContract,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { mugen } from "../../layers.css";

export const positionContract = createThemeContract({
  top: "",
  right: "",
  bottom: "",
  left: "",
  zIndex: "",
});

export const positionClass = style({
  "@layer": {
    [mugen]: {
      vars: {
        [positionContract.top]: "",
        [positionContract.right]: "",
        [positionContract.bottom]: "",
        [positionContract.left]: "",
        [positionContract.zIndex]: "",
      },
      top: positionContract.top,
      right: positionContract.right,
      bottom: positionContract.bottom,
      left: positionContract.left,
      zIndex: positionContract.zIndex,
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
