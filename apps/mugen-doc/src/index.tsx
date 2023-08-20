/* @refresh reload */

import { createApp } from "@mugen/core";
import "@mugen/core/theme/preflight.css";
import { Router } from "@solidjs/router";
import App from "./App";
import "./styles/index.css";

createApp(() => (
  <Router>
    <App />
  </Router>
));
