import { breakpoints } from "../../theme.css";

export type BreakpointKeys = keyof typeof breakpoints;

export function matchBreakpoint(breakpoint: BreakpointKeys) {
  return window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`).matches;
}
