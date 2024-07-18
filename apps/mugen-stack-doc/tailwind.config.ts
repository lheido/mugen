import { button, mugenThemePlugin } from "@mugen/theme/tailwindcss";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [
    mugenThemePlugin({
      themes: {
        light: {
          primary: "#9289FF",
          accent: "#FF8A65",
          surface: "#EEEEEE",
          "surface-1": "#DDDDDD",
        },
        dark: {
          primary: "#9289FF",
          accent: "#FF8A65",
          surface: "#222222",
          "surface-1": "#333333",
        },
      },
      components: [button()],
    }),
  ],
} satisfies Config;
