import { FlowProps, createContext, useContext } from "solid-js";
import { MugenTheme } from "./MugenTheme";
import { ThemeDescription } from "./types";

export const MugenThemeContext = createContext<MugenTheme<ThemeDescription>>();

export function useMugenThemeContext<T extends ThemeDescription>() {
  return useContext(MugenThemeContext) as MugenTheme<T>;
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
