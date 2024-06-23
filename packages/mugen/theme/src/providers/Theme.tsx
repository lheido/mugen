import { FlowProps } from "solid-js";
import { Breakpoints } from "./Breakpoints";

export function MugenTheme(props: FlowProps) {
  return <Breakpoints>{props.children}</Breakpoints>;
}
