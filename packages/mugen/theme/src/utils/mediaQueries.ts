import { breakpoints } from "../../theme.css";

export type BreakpointKeys = keyof typeof breakpoints;

export function matchBreakpoint(breakpoint: BreakpointKeys) {
  return window.matchMedia(breakpoints[breakpoint]).matches;
}
