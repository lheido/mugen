import { JSX } from "solid-js";
import { render } from "solid-js/web";
import { MugenSemanticProvider } from "./semantic";
import { MugenThemeProvider } from "./theme";
import { theme } from "./theme-description";

export * from "./types";

export function createApp(root: () => JSX.Element) {
  const rootElt = document.getElementById("root");

  if (import.meta.env.DEV && !(rootElt instanceof HTMLElement)) {
    throw new Error(
      "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
    );
  }

  render(
    () => (
      <MugenThemeProvider description={theme}>
        <MugenSemanticProvider>{root()}</MugenSemanticProvider>
      </MugenThemeProvider>
    ),
    rootElt!
  );
}
