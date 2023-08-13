/* @refresh reload */

import { Router } from "@solidjs/router";
import { createApp } from "mugen/base";
import { MugenSemanticProvider, MugenThemeProvider } from "mugen/v2";
import App from "./App";
import "./styles/index.css";
import { theme } from "./theme";

createApp({
  root: () => (
    <MugenThemeProvider description={theme}>
      <MugenSemanticProvider>
        <Router>
          <App />
        </Router>
      </MugenSemanticProvider>
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
