import { FlowProps, createContext, useContext } from "solid-js";
import { ThemeDescription } from "../theme/types";
import { MugenTheme } from "./MugenTheme";

export const MugenThemeContext = createContext<MugenTheme>();

export function useMugenThemeContext() {
  return useContext(MugenThemeContext) as MugenTheme;
}

export const MugenThemeProvider = <T extends ThemeDescription>(
  props: FlowProps & { description: T }
) => {
  return (
    <MugenThemeContext.Provider value={new MugenTheme(props.description)}>
      {props.children}
    </MugenThemeContext.Provider>
  );
};
