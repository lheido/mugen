import { useWindow } from "@mugen/core";
import {
  FlowProps,
  createContext,
  createEffect,
  on,
  useContext,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { breakpoints } from "../../theme.css";
import { matchBreakpoint } from "../utils/mediaQueries";

export type BreakpointsState = Record<keyof typeof breakpoints, boolean>;

const breakpointsContext = createContext<BreakpointsState>();

export function useBreakpoints() {
  return useContext(breakpointsContext) as BreakpointsState;
}

export function Breakpoints(props: FlowProps) {
  const window = useWindow();
  const [state, setState] = createStore<BreakpointsState>(
    Object.entries(breakpoints).reduce((acc, [key]) => {
      const breakpoint = key as keyof typeof breakpoints;
      return { ...acc, [breakpoint]: matchBreakpoint(breakpoint) };
    }, {} as BreakpointsState)
  );

  createEffect(
    on(
      () => [window.width, window.height],
      () => {
        setState(
          produce((draft) => {
            for (const key in breakpoints) {
              const breakpoint = key as keyof typeof breakpoints;
              draft[breakpoint] = matchBreakpoint(breakpoint);
            }
            return draft;
          })
        );
      }
    )
  );

  return (
    <breakpointsContext.Provider value={state}>
      {props.children}
    </breakpointsContext.Provider>
  );
}
