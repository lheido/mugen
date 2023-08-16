export type PropertyInternalKey =
  | "_cls"
  | "_sperator"
  | "_additionals"
  | "_additionalsProperties"
  | "_ignoreBase"
  | "_before"
  | "_properties"
  | "_propertiesValues"
  | "_themeDescription"
  | "_useParent";
export type PropertyDefinition = {
  [k: PropertyInternalKey | string]:
    | PropertyDefinition
    | string
    | string[]
    | boolean
    | undefined;
};
export type PropertyDefinitions = {
  [k: string]: PropertyDefinition;
};

const buildSpacing = (p: string) => {
  const _themeDescription = "spacing";
  return {
    _cls: p[0],
    _separator: "-",
    _properties: p,
    _themeDescription,
    x: {
      _cls: "x",
      _properties: [`${p}-left`, `${p}-right`],
      _themeDescription,
    },
    y: {
      _cls: "y",
      _properties: [`${p}-top`, `${p}-bottom`],
      _themeDescription,
    },
    left: {
      _cls: "l",
      _properties: `${p}-left`,
      _themeDescription,
    },
    top: {
      _cls: "t",
      _properties: `${p}-top`,
      _themeDescription,
    },
    right: {
      _cls: "r",
      _properties: `${p}-right`,
      _themeDescription,
    },
    bottom: {
      _cls: "b",
      _properties: `${p}-bottom`,
      _themeDescription,
    },
  };
};

const buildPosition = (p: string) => {
  const _themeDescription = "spacing";
  return {
    _additionals: [p],
    _additionalsProperties: ["position"],
    _separator: "",
    top: {
      _cls: "top",
      _properties: "top",
      _themeDescription,
    },
    right: {
      _cls: "right",
      _properties: "right",
      _themeDescription,
    },
    bottom: {
      _cls: "bottom",
      _properties: "bottom",
      _themeDescription,
    },
    left: {
      _cls: "left",
      _properties: "left",
      _themeDescription,
    },
  };
};

const buildSize = (p: string) => {
  const _themeDescription = "sizes";
  return {
    _cls: p[0],
    _properties: p,
    _themeDescription,
    value: {
      _useParent: true,
    },
    min: {
      _ignoreBase: true,
      _cls: `min-${p[0]}`,
      _properties: `min-${p}`,
      _themeDescription,
    },
    max: {
      _ignoreBase: true,
      _cls: `max-${p[0]}`,
      _properties: `max-${p}`,
      _themeDescription,
    },
  };
};

const buildBorder = (edge?: string[] | string) => {
  const _properties = (p: string) => {
    const edges = edge && Array.isArray(edge) ? edge : [edge];
    return edges.map((e) => `border-${e ? `${e}-${p}` : p}`);
  };
  return {
    width: {
      _cls: "w",
      _before: "-",
      _properties: _properties("width"),
      _themeDescription: "borderWidth",
    },
    style: {
      _cls: "s",
      _before: "-",
      _properties: _properties("style"),
      _themeDescription: "borderStyle",
    },
    color: {
      _cls: "c",
      _before: "-",
      _properties: _properties("color"),
      _propertiesValues: ["var(--mugen-color-<value>)"],
      _themeDescription: "colors",
    },
  };
};

export const properties = {
  padding: buildSpacing("padding"),
  margin: buildSpacing("margin"),
  rounded: {
    _cls: "rounded",
    _themeDescription: "rounded",
    _properties: "border-radius",
    top: {
      _cls: "t",
      _before: "-",
      _themeDescription: "rounded",
      _properties: ["border-top-left-radius", "border-top-right-radius"],
    },
    right: {
      _cls: "r",
      _before: "-",
      _themeDescription: "rounded",
      _properties: ["border-top-right-radius", "border-bottom-right-radius"],
    },
    bottom: {
      _cls: "b",
      _before: "-",
      _themeDescription: "rounded",
      _properties: ["border-bottom-left-radius", "border-bottom-right-radius"],
    },
    left: {
      _cls: "l",
      _before: "-",
      _themeDescription: "rounded",
      _properties: ["border-top-left-radius", "border-bottom-left-radius"],
    },
    topLeft: {
      _cls: "tl",
      _before: "-",
      _themeDescription: "rounded",
      _properties: "border-top-left-radius",
    },
    topRight: {
      _cls: "tr",
      _before: "-",
      _themeDescription: "rounded",
      _properties: "border-top-right-radius",
    },
    bottomLeft: {
      _cls: "bl",
      _before: "-",
      _themeDescription: "rounded",
      _properties: "border-bottom-left-radius",
    },
    bottomRight: {
      _cls: "br",
      _before: "-",
      _themeDescription: "rounded",
      _properties: "border-bottom-right-radius",
    },
  },
  background: {
    _cls: "bg",
    _themeDescription: "colors",
    _properties: ["background-color", "color"],
    _propertiesValues: [
      "var(--mugen-color-<value>)",
      "var(--mugen-color-<value>-content)",
    ],
    from: {
      _cls: "from",
      _before: "-",
      _additionals: ["gradient"],
      _additionalsProperties: ["background-image"],
      _additionalsPropertiesValues: [
        "linear-gradient(to var(--mugen-gradient-direction, left), var(--mugen-gradient-from, transparent) var(--mugen-gradient-from-offset, 0%), var(--mugen-gradient-to, transparent) var(--mugen-gradient-to-offset, 100%))",
      ],
      _themeDescription: "colors",
      _properties: ["--mugen-gradient-from", "color"],
      _propertiesValues: [
        "var(--mugen-color-<value>)",
        "var(--mugen-color-<value>-content)",
      ],
    },
    fromOffset: {
      _cls: "from-offset",
      _before: "-",
      _themeDescription: "gradientOffset",
      _properties: "--mugen-gradient-from-offset",
    },
    to: {
      _cls: "from",
      _before: "-",
      _themeDescription: "colors",
      _properties: "--mugen-gradient-to",
    },
    toOffset: {
      _cls: "to-offset",
      _before: "-",
      _themeDescription: "gradientOffset",
      _properties: "--mugen-gradient-to-offset",
    },
    direction: {
      _cls: "direction",
      _before: "-",
      _properties: "--mugen-gradient-direction",
    },
  },
  color: {
    _cls: "color",
    _themeDescription: "colors",
    _properties: "color",
    from: {
      _cls: "from",
      _before: "-",
      _additionals: ["gradient", "__text-gradient"],
      _additionalsProperties: [
        "background-image",
        [
          "background-size",
          "background-repeat",
          "background-clip",
          "-webkit-background-clip",
          "color",
        ],
      ],
      _additionalsPropertiesValues: [
        "linear-gradient(to var(--mugen-gradient-direction, left), var(--mugen-gradient-from, transparent) var(--mugen-gradient-from-offset, 0%), var(--mugen-gradient-to, transparent) var(--mugen-gradient-to-offset, 100%))",
        ["100%", "repeat", "text", "text", "transparent"],
      ],
      _themeDescription: "colors",
      _properties: ["--mugen-gradient-from", "color"],
      _propertiesValues: [
        "var(--mugen-color-<value>)",
        "var(--mugen-color-<value>-content)",
      ],
    },
    fromOffset: {
      _cls: "from-offset",
      _before: "-",
      _themeDescription: "gradientOffset",
      _properties: "--mugen-gradient-from-offset",
    },
    to: {
      _cls: "from",
      _before: "-",
      _themeDescription: "colors",
      _properties: "--mugen-gradient-to",
    },
    toOffset: {
      _cls: "to-offset",
      _before: "-",
      _themeDescription: "gradientOffset",
      _properties: "--mugen-gradient-to-offset",
    },
    direction: {
      _cls: "direction",
      _before: "-",
      _properties: "--mugen-gradient-direction",
    },
  },
  font: {
    _cls: "f",
    _separator: "",
    size: {
      _cls: "z",
      _properties: "font-size",
      _themeDescription: "fontSize",
    },
    weight: {
      _cls: "w",
      _properties: "font-weight",
      _themeDescription: "fontWeight",
    },
  },
  relative: buildPosition("relative"),
  absolute: buildPosition("absolute"),
  fixed: buildPosition("fixed"),
  sticky: buildPosition("sticky"),
  flex: {
    _additionals: ["flex"],
    _additionalsProperties: ["display"],
    _spearator: "",
    gap: {
      _cls: "gap",
      _themeDescription: "spacing",
      _properties: "gap",
    },
    justify: {
      _cls: "fjc",
      _properties: "justify-content",
      _themeDescription: "justifyContent",
    },
    items: {
      _cls: "fai",
      _properties: "align-items",
      _themeDescription: "alignItems",
    },
    direction: {
      _cls: "fd",
      _properties: "flex-direction",
      _themeDescription: "flexDirection",
    },
    wrap: {
      _cls: "fw",
      _properties: "flex-wrap",
      _themeDescription: "flexWrap",
    },
  },
  flexItem: {
    basis: {
      _cls: "flex-basis",
      _properties: "flex-basis",
      _themeDescription: "sizes",
    },
    grow: {
      _cls: "flex-grow",
      _properties: "flex-grow",
    },
    shrink: {
      _cls: "flex-shrink",
      _properties: "flex-shrink",
    },
    order: {
      _cls: "order",
      _properties: "order",
    },
  },
  width: buildSize("width"),
  height: buildSize("height"),
  border: {
    _cls: "border",
    _additionals: ["border"],
    _properties: "border-color",
    _themeDescription: "colors",
    ...buildBorder(),
    x: {
      _cls: "border-x",
      ...buildBorder(["left", "right"]),
    },
    y: {
      _cls: "border-y",
      ...buildBorder(["top", "bottom"]),
    },
    left: {
      _cls: "border-l",
      ...buildBorder("left"),
    },
    right: {
      _cls: "border-r",
      ...buildBorder("right"),
    },
    top: {
      _cls: "border-t",
      ...buildBorder("top"),
    },
    bottom: {
      _cls: "border-b",
      ...buildBorder("bottom"),
    },
  },
  transition: {
    _cls: "transition",
    _properties: "transition-property",
    _themeDescription: "transitionProperties",
    property: {
      _useParent: true,
    },
    duration: {
      _ignoreBase: true,
      _cls: "duration",
      _properties: "transition-duration",
      _themeDescription: "transitionDuration",
    },
    ease: {
      _cls: "ease",
      _ignoreBase: true,
      _properties: "transition-timing-function",
      _themeDescription: "transitionTimingFunction",
    },
    delay: {
      _cls: "delay",
      _ignoreBase: true,
      _properties: "transition-delay",
      _themeDescription: "transitionDelay",
    },
  },
  transform: {
    _additionals: ["transform"],
    _additionalsProperties: ["transform"],
    _additionalsPropertiesValues: [
      "translate(var(--mugen-translate-x, 0),var(--mugen-translate-y, 0)) rotate(var(--mugen-rotate, 0)) skewX(var(--mugen-skew-x, 0)) skewY(var(--mugen-skew-y, 0)) scaleX(var(--mugen-scale-x, 1)) scaleY(var(--mugen-scale-y, 1))",
    ],
    translate: {
      _cls: "translate",
      _themeDescription: "spacing",
      _properties: ["--mugen-translate-x", "--mugen-translate-y"],
      value: {
        _useParent: true,
      },
      x: {
        _cls: "x",
        _before: "-",
        _themeDescription: "spacing",
        _properties: "--mugen-translate-x",
      },
      y: {
        _cls: "y",
        _before: "-",
        _themeDescription: "spacing",
        _properties: "--mugen-translate-y",
      },
    },
    scale: {
      _cls: "scale",
      _themeDescription: "transformScale",
      _properties: ["--mugen-scale-x", "--mugen-scale-y"],
      value: {
        _useParent: true,
      },
      x: {
        _cls: "x",
        _before: "-",
        _properties: "--mugen-scale-x",
        _themeDescription: "transformScale",
      },
      y: {
        _cls: "y",
        _before: "-",
        _properties: "--mugen-scale-y",
        _themeDescription: "transformScale",
      },
    },
    skew: {
      _cls: "skew",
      _themeDescription: "transformSkew",
      _properties: ["--mugen-skew-x", "--mugen-skew-y"],
      value: {
        _useParent: true,
      },
      x: {
        _cls: "x",
        _before: "-",
        _properties: "--mugen-skew-x",
        _themeDescription: "transformSkew",
      },
      y: {
        _cls: "y",
        _before: "-",
        _properties: "--mugen-skew-y",
        _themeDescription: "transformSkew",
      },
    },
    rotate: {
      _cls: "rotate",
      _themeDescription: "transformRotate",
      _properties: ["--mugen-rotate"],
    },
  },
  zIndex: {
    _cls: "z",
    _properties: "z-index",
  },
  opacity: {
    _cls: "opacity",
    _properties: "opacity",
    _themeDescription: "opacity",
  },
  filter: {
    _additionals: ["filter"],
    _additionalsProperties: ["filter"],
    _additionalsPropertiesValues: ["blur(var(--mugen-blur))"],
    blur: {
      _cls: "blur",
      _properties: ["--mugen-blur"],
      _propertiesValues: ["<value>px"],
    },
  },
  overflow: {
    _cls: "of",
    _properties: "overflow",
    x: {
      _cls: "of-x",
      _properties: "overflow-x",
    },
    y: {
      _cls: "of-y",
      _properties: "overflow-y",
    },
  },
};
