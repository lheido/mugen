import { globalStyle } from "@vanilla-extract/css";
import { reset } from "./layers.css";

globalStyle("*, ::after, ::before, ::backdrop, ::file-selector-button", {
  "@layer": {
    [reset]: {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      border: "0 solid",
    },
  },
});

globalStyle("html, :host", {
  "@layer": {
    [reset]: {
      lineHeight: 1.5,
      WebkitTextSizeAdjust: "100%",
      tabSize: 4,
      fontFamily: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
      fontFeatureSettings: "normal",
      fontVariationSettings: "normal",
      WebkitTapHighlightColor: "transparent",
    },
  },
});

globalStyle("body", {
  "@layer": {
    [reset]: {
      lineHeight: "inherit",
    },
  },
});

globalStyle("hr", {
  "@layer": {
    [reset]: {
      height: 0,
      color: "inherit",
      borderTopWidth: "1px",
    },
  },
});

globalStyle(
  `input:where(:not([type="button"], [type="reset"], [type="submit"])), select, textarea`,
  {
    "@layer": {
      [reset]: {
        border: "1px solid",
      },
    },
  }
);

globalStyle(
  "button, input:where([type='button'], [type='reset'], [type='submit']), ::file-selector-button",
  {
    "@layer": {
      [reset]: {
        appearance: "button",
      },
    },
  }
);

globalStyle("h1, h2, h3, h4, h5, h6", {
  "@layer": {
    [reset]: {
      fontSize: "inherit",
      fontWeight: "inherit",
    },
  },
});

globalStyle("a", {
  "@layer": {
    [reset]: {
      textDecoration: "inherit",
      color: "inherit",
    },
  },
});

globalStyle("b, strong", {
  "@layer": {
    [reset]: {
      fontWeight: "bolder",
    },
  },
});

globalStyle("small", {
  "@layer": {
    [reset]: {
      fontSize: "80%",
    },
  },
});

globalStyle("sub, sup", {
  "@layer": {
    [reset]: {
      fontSize: "75%",
      lineHeight: 0,
      position: "relative",
      verticalAlign: "baseline",
    },
  },
});

globalStyle("sub", {
  "@layer": {
    [reset]: {
      bottom: "-0.25em",
    },
  },
});

globalStyle("sup", {
  "@layer": {
    [reset]: {
      top: "-0.5em",
    },
  },
});

globalStyle("table", {
  "@layer": {
    [reset]: {
      textIndent: 0,
      borderColor: "inherit",
      borderCollapse: "collapse",
    },
  },
});

globalStyle(
  "button, input, optgroup, select, textarea, ::file-selector-button",
  {
    "@layer": {
      [reset]: {
        font: "inherit",
        fontFeatureSettings: "inherit",
        fontVariationSettings: "inherit",
        letterSpacing: "inherit",
        color: "inherit",
        background: "transparent",
      },
    },
  }
);

globalStyle(":-moz-focusring", {
  "@layer": {
    [reset]: {
      outline: "auto",
    },
  },
});

globalStyle(":-moz-ui-invalid", {
  "@layer": {
    [reset]: {
      boxShadow: "none",
    },
  },
});

globalStyle("progress", {
  "@layer": {
    [reset]: {
      verticalAlign: "baseline",
    },
  },
});

globalStyle("::-webkit-inner-spin-button, ::-webkit-outer-spin-button", {
  "@layer": {
    [reset]: {
      height: "auto",
    },
  },
});

globalStyle("::-webkit-search-decoration", {
  "@layer": {
    [reset]: {
      WebkitAppearance: "none",
    },
  },
});

globalStyle("summary", {
  "@layer": {
    [reset]: {
      listStyle: "list-item",
    },
  },
});

globalStyle("ol, ul, menu", {
  "@layer": {
    [reset]: {
      listStyle: "none",
    },
  },
});

globalStyle("textarea", {
  "@layer": {
    [reset]: {
      resize: "vertical",
    },
  },
});

globalStyle("::placeholder", {
  "@layer": {
    [reset]: {
      opacity: 1,
      color: "color-mix(in srgb, currentColor 50%, transparent)",
    },
  },
});

globalStyle(":disabled", {
  "@layer": {
    [reset]: {
      cursor: "default",
    },
  },
});

globalStyle("img, svg, video, canvas, audio, iframe, embed, object", {
  "@layer": {
    [reset]: {
      display: "block",
      verticalAlign: "middle",
    },
  },
});

globalStyle("img, video", {
  "@layer": {
    [reset]: {
      maxWidth: "100%",
      height: "auto",
    },
  },
});

globalStyle("[hidden]", {
  "@layer": {
    [reset]: {
      display: "none !important",
    },
  },
});
