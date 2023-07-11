/* @refresh reload */

import { Router } from "@solidjs/router";
import { createApp } from "mugen/base";
import App from "./App";
import "./styles/index.css";
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
          direction: "bottom",
        },
        height: {
          min: "screen",
        },
      },
    },
  },
});
