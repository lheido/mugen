import { createContext, FlowProps, useContext } from "solid-js";
import { ElementRoles, IntrinsicElements } from "../types";

export type MugenSemanticData = {
  role?: ElementRoles;
  as?: () => IntrinsicElements;
};

export const MugenSemanticContext = createContext<MugenSemanticData>();

export function useMugenSemanticContext() {
  return useContext(MugenSemanticContext) as MugenSemanticData;
}

export const MugenSemanticProvider = (props: FlowProps) => {
  return <MugenSemanticContext.Provider value={{}}>{props.children}</MugenSemanticContext.Provider>;
};
