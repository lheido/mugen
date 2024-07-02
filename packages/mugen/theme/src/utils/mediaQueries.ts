import data from "../../theme.json";

export const breakpoints = data.breakpoints;

export type BreakpointKeys = keyof typeof breakpoints;

export function matchBreakpoint(breakpoint: BreakpointKeys) {
  return window.matchMedia(breakpoints[breakpoint]).matches;
}
