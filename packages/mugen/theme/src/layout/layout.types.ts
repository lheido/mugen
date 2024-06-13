import { SpacingValues } from "@mugen/core";

export type LayoutProps = {
  jc?:
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "flex-start"
    | "flex-end";
  ai?: "center" | "stretch" | "flex-start" | "flex-end" | "baseline";
  gap?: SpacingValues | `${SpacingValues}`;
  column?: boolean;
  reverse?: boolean;
};

export const layoutProps: (keyof LayoutProps)[] = [
  "jc",
  "ai",
  "gap",
  "column",
  "reverse",
];
