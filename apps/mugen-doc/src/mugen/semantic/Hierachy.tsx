import { createContext, FlowProps, useContext } from "solid-js";

const hierarchyContext = createContext<number>(0);

export function useHierarchy() {
  return useContext(hierarchyContext);
}

export const Hierarchy = (props: FlowProps) => {
  const hierarchy = useHierarchy();
  console.log(hierarchy + 1);
  return <hierarchyContext.Provider value={hierarchy + 1}>{props.children}</hierarchyContext.Provider>;
};
