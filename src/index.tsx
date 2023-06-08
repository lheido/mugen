/* @refresh reload */
import { Router } from "@solidjs/router";
import { registerTheme } from "mugen/theme";
import { render } from "solid-js/web";

import App from "./App";
import { AppTheme } from "./theme";

registerTheme(AppTheme);

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}
console.time("render");
render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
console.timeEnd("render");
