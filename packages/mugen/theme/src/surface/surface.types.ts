import { colors } from "../../colors.css";
import { HexColor } from "../color";

export type FullSurfaceColors = {
  [K in keyof typeof colors as `${K}${
    | ""
    | "Light"
    | "LightContent"
    | "Dark"
    | "DarkContent"
    | "Content"}`]: HexColor;
};

export type SurfaceColors = {
  [K in keyof typeof colors as `${K}${"" | "Light" | "Dark"}`]: HexColor;
};

export type ColorNames = keyof typeof colors;
