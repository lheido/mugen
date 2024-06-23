import { FlowProps } from "solid-js";
import { Window } from "./Window";

export function MugenCore(props: FlowProps) {
  return <Window>{props.children}</Window>;
}
