/* @refresh reload */

import { Router } from "@solidjs/router";
import { createApp } from "mugen/base";
import App from "./App";
import { theme } from "./theme";

createApp({
  root: () => (
    <Router>
      <App />
    </Router>
  ),
  theme: {
    description: theme,
    options: {
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
    },
  },
});
