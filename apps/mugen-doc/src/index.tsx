/* @refresh reload */

import { createApp } from "@mugen";
import { Router } from "@solidjs/router";
import App from "./App";
import "./mugen/theme/preflight.css";
import "./styles/index.css";

createApp(() => (
  <Router>
    <App />
  </Router>
));
