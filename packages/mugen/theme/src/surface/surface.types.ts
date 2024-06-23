export type FullSurfaceColors<T> = {
  [K in keyof T & string as `${K}${"" | "-content"}`]: string;
};
