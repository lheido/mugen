import { JSX } from "solid-js";
import { render } from "solid-js/web";
import {
  registerTheme,
  RegisterThemeOptions,
  ThemeDescription,
} from "../theme";

export type CreateAppOptions = {
  root: () => JSX.Element;
  theme?: {
    description: ThemeDescription;
    options?: RegisterThemeOptions<ThemeDescription>;
  };
};

export function createApp(options: CreateAppOptions) {
  if (options.theme) {
    registerTheme(options.theme.description, options.theme.options);
  }

  const root = document.getElementById("root");

  if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
      "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
    );
  }

  render(options.root, root!);
}
