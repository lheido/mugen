import { FlowProps, createContext, useContext } from "solid-js";

export const MugenThemeContext = createContext({});

export function useMugenThemeContext() {
  return useContext(MugenThemeContext);
}

export const MugenThemeProvider = (props: FlowProps) => {
  const value: any = {};
  return (
    <MugenThemeContext.Provider value={value}>
      {props.children}
    </MugenThemeContext.Provider>
  );
};
