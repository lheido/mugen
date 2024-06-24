import { FlowProps } from "solid-js";
import { Window } from "./Window";

/**
 * A wrapper component that wraps required providers for Mugen.
 */
export function MugenCore(props: FlowProps) {
  return <Window>{props.children}</Window>;
}
