import { mugenThemePlugin } from "@mugen/theme/tailwindcss";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  plugins: [
    mugenThemePlugin({
      themes: {
        light: {
          primary: "#9289FF",
          surface: "#EEEEEE",
          "surface-1": "#DDDDDD",
        },
        dark: {
          primary: "#9289FF",
          surface: "#222222",
          "surface-1": "#333333",
        },
      },
    }),
  ],
} satisfies Config;
