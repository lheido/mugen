/* @refresh reload */
import { render } from "solid-js/web";

import { Router } from "@solidjs/router";
import { registerTheme } from "mugen/theme";
import App from "./App";
import { theme } from "./theme";

registerTheme(theme, {
  pageTheme: {
    background: {
      from: "page",
      to: "pageTo",
      linear: "bottom",
    },
    height: {
      min: "screen",
    },
  },
});

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
