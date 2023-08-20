import { createContext, FlowProps, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useMugenSemanticContext } from "../semantic";
import { useMugenThemeContext } from "../theme";
import { GlobalAttributes, IntrinsicElements } from "../types";

export type BoxProps = GlobalAttributes;

export type NodeContext = {
  id?: string;
  as?: string;
  parent?: NodeContext;
  path: IntrinsicElements[];
};

const nodeContext = createContext<NodeContext>(undefined);

export function useParent() {
  return useContext(nodeContext);
}

export const Box = (props: FlowProps & BoxProps) => {
  let ref!: HTMLElement;
  const parent = useParent();
  const theme = useMugenThemeContext();
  const semantic = useMugenSemanticContext();
  const component = semantic?.as ?? (() => "div");
  const path = () => [...(parent?.path ?? []), component()];
  semantic.as = undefined;
  const handlers = theme.consumeAvailable();
  const classes = () => handlers.reduce((acc, handler) => ({ ...acc, ...handler() }), {} as Record<string, boolean>);
  return (
    <nodeContext.Provider
      value={{
        id: props.id,
        as: component(),
        parent,
        path: path(),
      }}
    >
      <Dynamic ref={ref} component={component()} id={props.id} classList={classes()} {...props} />
    </nodeContext.Provider>
  );
};
