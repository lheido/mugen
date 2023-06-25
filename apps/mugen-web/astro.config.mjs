import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";
import mugen from "mugen-astro";
import { theme } from "./src/theme";

// https://astro.build/config
export default defineConfig({
  integrations: [
    solidJs(),
    mugen({
      theme,
    }),
  ],
});
