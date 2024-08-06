import { createContext, FlowProps, JSX, useContext } from "solid-js";

export type NodeTypeContextValue = Record<string, () => JSX.Element>;

const NodeTypeContext = createContext<NodeTypeContextValue>();

export function useNodeType() {
  return useContext(NodeTypeContext);
}

export function NodeTypeProvider(
  props: FlowProps<{ context: NodeTypeContextValue }>
) {
  return (
    <NodeTypeContext.Provider value={props.context}>
      {props.children}
    </NodeTypeContext.Provider>
  );
}
