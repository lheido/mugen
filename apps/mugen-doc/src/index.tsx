/* @refresh reload */

import { Router } from "@solidjs/router";
import { createApp } from "mugen/base";
import { MugenThemeProvider } from "mugen/v2";
import App from "./App";
import "./styles/index.css";
import { theme } from "./theme";

createApp({
  root: () => (
    <MugenThemeProvider description={theme}>
      <Router>
        <App />
      </Router>
    </MugenThemeProvider>
  ),
  theme: {
    description: theme,
    options: {
      pageTheme: {
        background: "pageTo",
        height: {
          min: "hscreen",
        },
      },
    },
  },
});
