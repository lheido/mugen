import { createContext, FlowProps, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { useNodeType } from "./NodeType";

export type NodePath = number[];

export type NodeData<D = any> = {
  type: string;
  data?: D;
  children?: NodeData[];
};

export type NodeContextValue<D = any> = {
  ref?: HTMLElement;
  path: NodePath;
  parent?: NodeContextValue;
  state: NodeData<D>;
  setState: SetStoreFunction<NodeData<D>>;
  createChildrenContext: () => NodeContextValue[];
} & NodeData;

const NodeContext = createContext<NodeContextValue>();

export function createNode(initialState: NodeData, parent?: NodeContextValue) {
  const [state, setState] = createStore<NodeData>(initialState);
  const createChildrenContext = () =>
    (state.children ?? []).map((child) => createNode(child, wrapper));
  const wrapper = new Proxy(
    {
      state,
      setState,
      parent,
      createChildrenContext,
    },
    {
      get(target, prop, receiver) {
        if (prop in state) return state[prop as keyof NodeData];
        if (prop === "path")
          return parent
            ? [...parent.path, parent.children!.indexOf(state)]
            : ([] satisfies NodePath);
        return Reflect.get(target, prop, receiver);
      },
    }
  ) as NodeContextValue;
  return wrapper;
}

export function useNode<D = any>() {
  return useContext(NodeContext) as NodeContextValue<D>;
}

export function NodeProvider(props: FlowProps<{ context: NodeContextValue }>) {
  return (
    <NodeContext.Provider value={props.context}>
      {props.children}
    </NodeContext.Provider>
  );
}

export function Node() {
  const container = useNodeType();
  const current = useNode();
  return container?.[current?.type!]?.();
}
