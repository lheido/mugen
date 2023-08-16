import { createContext, FlowProps, useContext } from "solid-js";
import { ThemeDescription } from "../types";
import { MugenTheme } from "./MugenTheme";

export const MugenThemeContext = createContext<MugenTheme>();

export function useMugenThemeContext() {
  return useContext(MugenThemeContext) as MugenTheme;
}

export const MugenThemeProvider = (props: FlowProps & { description: ThemeDescription }) => {
  return (
    <MugenThemeContext.Provider value={new MugenTheme(props.description)}>{props.children}</MugenThemeContext.Provider>
  );
};
