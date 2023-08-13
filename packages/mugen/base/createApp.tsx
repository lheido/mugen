import { JSX } from "solid-js";
import { render } from "solid-js/web";
import { registerTheme, RegisterThemeOptions } from "../theme";
import { ThemeDescription } from "../v2";

export type CreateAppOptions<T extends ThemeDescription> = {
  root: () => JSX.Element;
  theme?: {
    description: T;
    options?: RegisterThemeOptions<T>;
  };
};

export function createApp<T extends ThemeDescription>(options: CreateAppOptions<T>) {
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
