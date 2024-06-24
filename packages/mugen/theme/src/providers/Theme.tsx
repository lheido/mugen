import { FlowProps } from "solid-js";
import { Breakpoints } from "./Breakpoints";

/**
 * A wrapper component that wraps required providers for Mugen/Theme.
 */
export function MugenTheme(props: FlowProps) {
  return <Breakpoints>{props.children}</Breakpoints>;
}
