/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import "./index.css";

import { MugenCore } from "@mugen/core";
import { MugenTheme } from "@mugen/theme";
import { initPerfume } from "perfume.js";
initPerfume({
  resourceTiming: false,
  analyticsTracker: (options) => {
    const {
      attribution,
      metricName,
      data,
      navigatorInformation,
      rating,
      navigationType,
    } = options;
    console.log(metricName, data);
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
    <MugenCore>
      <MugenTheme>
        <App />
      </MugenTheme>
    </MugenCore>
  ),
  root!
);
