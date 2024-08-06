import {
  Accessor,
  createContext,
  createMemo,
  For,
  JSX,
  useContext,
} from "solid-js";
import { NodeContextValue, NodeData, NodeProvider, useNode } from "./Node";

const NodeChildrenContext = createContext<Accessor<NodeContextValue[]>>();

export function useNodeChildren() {
  return useContext(NodeChildrenContext);
}

export function NodeChildren(props: {
  children: (child: NodeData, index: Accessor<number>) => JSX.Element;
}) {
  const node = useNode();
  const children = createMemo(() => node.createChildrenContext());
  return (
    <NodeChildrenContext.Provider value={children}>
      <For each={children()}>
        {(child, index) => (
          <NodeProvider context={child}>
            {props.children(child.state, index)}
          </NodeProvider>
        )}
      </For>
    </NodeChildrenContext.Provider>
  );
}
