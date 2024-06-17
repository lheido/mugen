export type FullSurfaceColors<T> = {
  [K in keyof T & string as `${K}${"" | "-content"}`]: string;
};

// export type FullSurfaceColors = {
//   [K in keyof typeof colors as `${K}${
//     | ""
//     | "Light"
//     | "LightContent"
//     | "Dark"
//     | "DarkContent"
//     | "Content"}`]: HexColor;
// };

// export type SurfaceColors = {
//   [K in keyof typeof colors as `${K}${"" | "Light" | "Dark"}`]: HexColor;
// };

// export type ColorNames = keyof typeof colors;
