import { JSX } from "solid-js";
import { render } from "solid-js/web";
import { MugenSemanticProvider } from "../semantic/context";
import { MugenThemeProvider } from "../theme/context";
import { ThemeDescription } from "../types";

export type CreateAppOptions = {
  root: () => JSX.Element;
  theme: {
    description: ThemeDescription;
    // options?: RegisterThemeOptions<ThemeDescription>;
  };
};

export function createApp(options: CreateAppOptions) {
  // TODO: register theme options
  // if (options.theme) {
  //   registerTheme(options.theme.description, options.theme.options);
  // }

  const root = document.getElementById("root");

  if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
      "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
    );
  }

  render(
    () => (
      <MugenThemeProvider description={options.theme.description}>
        <MugenSemanticProvider>{options.root()}</MugenSemanticProvider>
      </MugenThemeProvider>
    ),
    root!
  );
}
