import { base } from "@mugen/theme/theme.css";
import { globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
  "@layer": {
    [base]: {
      margin: 0,
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif`,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
  },
});

globalStyle("code", {
  "@layer": {
    [base]: {
      fontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
    },
  },
});
