import { FlowProps } from "solid-js";

/**
 * A wrapper component that wraps required providers for Mugen/Theme.
 */
export function MugenTheme(props: FlowProps) {
  return <>{props.children}</>;
}
