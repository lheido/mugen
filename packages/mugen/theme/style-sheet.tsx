import { getContrast50 } from "./colors";
import { preflightRules } from "./preflight";
import {
  ClassList,
  defaultThemeBorderWidth,
  ThemeBorderStyleValue,
  ThemeDescription,
  ThemePositionsValues,
} from "./types";

const COLOR_VAR_PREFIX = "--mugen-color-";
const NON_CONTENT_COLORS = [
  "transparent",
  "inherit",
  "initial",
  "unset",
  "currentColor",
];

const styleSheet = new CSSStyleSheet();
for (const rule of preflightRules) {
  try {
    styleSheet.insertRule(rule);
  } catch (error) {
    /* ignore preflight errors */
  }
}
document.adoptedStyleSheets.push(styleSheet);
const mediaStyleSheets = new Map<string, CSSStyleSheet>();
const classNameRefs = new Map<string, boolean>();

export type ComputeClassConfig = {
  mapIndex: Record<number | string, string>;
  baseCls: (property: string) => string;
  simpleValue: (base: string, value: string) => string;
  arrayValue: (base: string, values: (string | undefined)[]) => string[];
  objectValue: (
    base: string,
    values: Record<string, string | (string | undefined)[]>
  ) => string[];
  mergeBaseWithModifier: (base: string, modifier: string) => string;
  additionalClasses?: (property: string) => string[];
};
export type ComputeClassHandler = (
  key: string,
  value:
    | string
    | (string | undefined)[]
    | Record<string, string | (string | undefined)[]>
) => string[];
const defaultComputeClassConfig: ComputeClassConfig = {
  mapIndex: {},
  baseCls: (property) => property,
  mergeBaseWithModifier: (base, modifier) => `${base}-${modifier}`,
  simpleValue: (base, value) => `${base}-${value}`,
  arrayValue(base, values) {
    return values
      .map((val, i) =>
        val
          ? this.simpleValue?.(
              this.mergeBaseWithModifier(base, this.mapIndex[i] ?? `${i}`),
              val
            )
          : undefined
      )
      .filter(Boolean) as string[];
  },
  objectValue(base, values) {
    return Object.entries(values).reduce((cls, [key, val]) => {
      const _key = this.mapIndex[key as string] ?? (key === "_" ? "" : key);
      if (Array.isArray(val)) {
        cls.push(
          ...this.arrayValue(this.mergeBaseWithModifier(base, _key), val)
        );
      } else {
        cls.push(this.simpleValue(this.mergeBaseWithModifier(base, _key), val));
      }
      return cls;
    }, [] as string[]);
  },
  additionalClasses: () => [],
};
export function createClassNamesHandler(
  config?: Partial<ComputeClassConfig>
): ComputeClassHandler {
  const _config = Object.assign({}, defaultComputeClassConfig, config ?? {});
  return (key, value) => {
    const base = _config.baseCls(key);
    const cls: string[] = [];
    if (Array.isArray(value)) {
      cls.push(..._config.arrayValue(base, value));
    } else if (typeof value === "object") {
      cls.push(..._config.objectValue(base, value));
    } else {
      cls.push(_config.simpleValue(base, value));
    }
    cls.push(...(_config.additionalClasses?.(key) ?? []));
    return cls;
  };
}

export type ComputeRulesHandlerConfig = {
  clsMap?: Record<string, string | string[]>;
  extract: (
    cls: string,
    property: string
  ) => [string | string[], string | string[]];
  toRealValue(value: string, description: ThemeDescription): string;
};
export type ComputeRulesHandler = (
  cls: string,
  property: string,
  description: ThemeDescription
) => string[];
const defaultComputeRulesConfig: ComputeRulesHandlerConfig = {
  extract: (cls, property) => [property, cls.replace(`${property}-`, "")],
  toRealValue: (value) => value,
};
export function createRulesHandler(
  config?: Partial<ComputeRulesHandlerConfig>
): ComputeRulesHandler {
  const _config = Object.assign({}, defaultComputeRulesConfig, config ?? {});
  return (cls, property, description) => {
    const [properties, values] = _config.extract(cls, property);
    if (Array.isArray(properties)) {
      return properties.map(
        (prop, i) => `${prop}: ${_config.toRealValue(values[i], description)}`
      );
    }
    return [
      `${properties}: ${_config.toRealValue(values as string, description)}`,
    ];
  };
}

export type Handler = {
  clsHandler: ComputeClassHandler;
  ruleHandler: ComputeRulesHandler;
};

const defaultHandler: Handler = {
  clsHandler: createClassNamesHandler(),
  ruleHandler: createRulesHandler(),
};
const spacingHandler: Handler = {
  clsHandler: createClassNamesHandler({
    baseCls: (property: string) => property[0],
    mergeBaseWithModifier: (base, modifier) => `${base}${modifier}`,
    mapIndex: { 0: "l", 1: "t", 2: "r", 3: "b" },
  }),
  ruleHandler: createRulesHandler({
    clsMap: {
      x: ["left", "right"],
      y: ["top", "bottom"],
      l: "left",
      t: "top",
      r: "right",
      b: "bottom",
    },
    extract(cls, property) {
      const _cls = cls.slice(1);
      const [m, value] = _cls.split("-");
      if (Array.isArray(this.clsMap![m])) {
        const map = this.clsMap![m] as string[];
        const props = map.map((prop) => `${property}-${prop}`);
        return [props, map.map(() => value)];
      } else if (m in this.clsMap!) {
        return [`${property}-${this.clsMap![m]}`, value];
      }
      return [property, value];
    },
    toRealValue: (value, description) => description.spacing[value],
  }),
};
const positionHandler: Handler = {
  clsHandler: createClassNamesHandler({
    mapIndex: {
      0: "left",
      1: "top",
      2: "right",
      3: "bottom",
    },
    mergeBaseWithModifier: (_, modifier) => modifier,
    additionalClasses: (property) => [property],
  }),
  ruleHandler: createRulesHandler({
    extract(cls) {
      if (ThemePositionsValues.includes(cls as any)) return ["position", cls];
      return cls.split("-") as [string, string];
    },
    toRealValue: (value, description) =>
      ThemePositionsValues.includes(value as any)
        ? value
        : description.spacing[value],
  }),
};
const colorHandler: Handler = {
  clsHandler: createClassNamesHandler({
    baseCls: (property) => (property === "background" ? "bg" : "color"),
  }),
  ruleHandler: createRulesHandler({
    extract: (cls, property) => {
      const value = cls.split("-")[1];
      if (
        opts.autoContentColor !== false &&
        property === "background" &&
        !NON_CONTENT_COLORS.includes(value)
      ) {
        return [
          ["background", "color"],
          [value, `${value}-content`],
        ];
      }
      return [property, value];
    },
    toRealValue: (value) => `var(${COLOR_VAR_PREFIX}${value})`,
  }),
};
const defaultXYHandler: Handler = {
  clsHandler: createClassNamesHandler({
    mapIndex: { 0: "x", 1: "y" },
  }),
  ruleHandler: createRulesHandler({
    extract: (cls, property) => {
      const splitCls = cls.split("-");
      if (splitCls.length === 2) {
        return [property, splitCls[1]];
      }
      return [`${splitCls[0]}-${splitCls[1]}`, splitCls[2]];
    },
  }),
};
const gapHandler: Handler = {
  clsHandler: defaultXYHandler.clsHandler,
  ruleHandler: createRulesHandler({
    clsMap: {
      x: "row",
      y: "column",
    },
    extract(cls, property) {
      const splitCls = cls.split("-");
      if (splitCls.length === 2) {
        return [property, splitCls[1]];
      }
      return [`${this.clsMap![splitCls[1]]}-${property}`, splitCls[2]];
    },
    toRealValue: (value, description) => description.spacing[value],
  }),
};
const sizeHandler: Handler = {
  clsHandler: createClassNamesHandler({
    baseCls: (property) => property[0],
    mapIndex: { 0: "", 1: "min-", 2: "max-", min: "min-", max: "max-" },
    mergeBaseWithModifier: (base, modifier) => `${modifier}${base}`,
  }),
  ruleHandler: createRulesHandler({
    extract: (cls, property) => {
      const splitCls = cls.split("-");
      if (splitCls.length === 2) {
        return [property, splitCls[1]];
      }
      return [`${splitCls[0]}-${property}`, splitCls[2]];
    },
    toRealValue: (value, description) => description.sizes[value],
  }),
};
const borderHandler: Handler = {
  clsHandler: createClassNamesHandler({
    mapIndex: { 0: "l", 1: "t", 2: "r", 3: "b" },
    additionalClasses: (property) => [property],
  }),
  ruleHandler: createRulesHandler({
    clsMap: { l: "left", t: "top", r: "right", b: "bottom" },
    extract(cls, property) {
      const splitCls = cls.split("-");
      if (splitCls.length === 1) {
        return ["border-width", "0"];
      }
      if (splitCls.length === 2) {
        return [property, splitCls[1]];
      } else if (splitCls.length === 3) {
        return [`${property}-${splitCls[1]}`, splitCls[2]];
      }
      return [
        `${property}-${this.clsMap![splitCls[2]]}-${splitCls[1]}`,
        splitCls[3],
      ];
    },
    toRealValue: (value, description) =>
      ThemeBorderStyleValue.includes(value as any)
        ? value
        : value in description.colors
        ? description.colors[value]
        : description.borderWidth?.[value] ??
          (defaultThemeBorderWidth as any)[value],
  }),
};
const roundedHandler: Handler = {
  clsHandler: createClassNamesHandler({
    mapIndex: { 0: "lt", 1: "tr", 2: "br", 3: "bl" },
  }),
  ruleHandler: createRulesHandler({
    clsMap: {
      tl: "border-top-left-radius",
      tr: "border-top-right-radius",
      br: "border-bottom-right-radius",
      bl: "border-bottom-left-radius",
      l: ["border-top-left-radius", "border-bottom-left-radius"],
      r: ["border-top-right-radius", "border-bottom-right-radius"],
      t: ["border-top-left-radius", "border-top-right-radius"],
      b: ["border-bottom-left-radius", "border-bottom-right-radius"],
    },
    extract(cls, property) {
      const splitCls = cls.split("-");
      if (splitCls.length === 2) {
        return ["border-radius", splitCls[1]];
      }
      const props = this.clsMap![splitCls[1]];
      return [
        props,
        Array.isArray(props) ? props.map(() => splitCls[2]) : splitCls[2],
      ];
    },
    toRealValue: (value, description) => description.rounded[value],
  }),
};
const handlers = {
  default: defaultHandler,
  defaultXY: defaultXYHandler,
  spacing: spacingHandler,
  position: positionHandler,
  color: colorHandler,
  gap: gapHandler,
  size: sizeHandler,
  border: borderHandler,
  rounded: roundedHandler,
} as const;
type HandlersKeys = keyof typeof handlers;
const propHandlerMap: Record<string, HandlersKeys> = {
  padding: "spacing",
  margin: "spacing",
  background: "color",
  color: "color",
  rounded: "rounded",
  relative: "position",
  absolute: "position",
  fixed: "position",
  sticky: "position",
  height: "size",
  width: "size",
  gap: "gap",
  overflow: "defaultXY",
  border: "border",
} as const;

export function compute(
  key: string,
  value: any,
  emod?: string,
  media?: string,
  ps?: string
): ClassList {
  if (typeof value === "boolean") return { [key]: value };
  const handler = handlers[propHandlerMap[key]] ?? handlers.default;
  const cls = handler.clsHandler(key, value);
  const classNames = cls.map((className) => {
    const _emod = emod ? `${emod}:` : "";
    const _ps = ps ? `${ps}:` : "";
    const _media = media ? `${media}:` : "";
    return `${_media}${_emod}${_ps}${className}`.replaceAll(/[/:]/g, "-");
  });
  classNames.forEach((className, i) => {
    if (!classNameRefs.has(className)) {
      classNameRefs.set(className, true);
      const ruleContent = handler.ruleHandler(cls[i], key, themeDescription);
      const _evt = emod ? `:${emod}` : "";
      const __ps = ps ? `::${ps}` : "";
      const rule = `.${className}${_evt}${__ps} {${ruleContent.join(";")}}`;
      let ss = styleSheet;
      if (media) {
        if (!mediaStyleSheets.has(media)) {
          const newMediaStyleSheet = new CSSStyleSheet({
            media: `(min-width: ${themeDescription.breakpoints[media]})`,
          });
          document.adoptedStyleSheets.push(newMediaStyleSheet);
          mediaStyleSheets.set(media, newMediaStyleSheet);
        }
        ss = mediaStyleSheets.get(media)!;
      }
      ss.insertRule(rule);
    }
  });
  return classNames.reduce((list, className) => {
    list[className] = true;
    return list;
  }, {} as ClassList);
}

export let themeDescription: ThemeDescription;
export let opts: RegisterThemeOptions<ThemeDescription>;

export type RegisterThemeOptions<T extends ThemeDescription> = {
  defaultTheme?: keyof T["themes"] extends string ? string : undefined;
  pageColor?: (keyof T["colors"] extends string ? string : undefined) | "page";
  autoContentColor?: ((color: string) => string) | false;
};

export function registerTheme<T extends ThemeDescription>(
  description: T,
  options?: RegisterThemeOptions<T>
): void {
  themeDescription = description;
  opts = {
    pageColor: "page",
    autoContentColor: (color: string) =>
      getContrast50(color.replace("#", "")) === "black" ? "#000" : "#fff",
    ...options,
  };
  // Replace colors with custom properties.
  const themeCustomProperties: Record<string, [string, string][]> = {
    ":root": [],
  };
  Object.entries(description.colors).forEach(([key, value]) => {
    const propName = `${COLOR_VAR_PREFIX}${key}`;
    // description.colors[key] = `var(${propName})`;
    themeCustomProperties[":root"].push([propName, value]);
    if (opts.autoContentColor && !NON_CONTENT_COLORS.includes(value)) {
      themeCustomProperties[":root"].push([
        `${propName}-content`,
        opts.autoContentColor(value),
      ]);
    }
  });
  if (description.themes) {
    Object.entries(description.themes).forEach(([name, theme]) => {
      const themeName = `.${name}`;
      themeCustomProperties[themeName] = [];
      Object.entries(theme.colors).forEach(([key, value]) => {
        const propName = `${COLOR_VAR_PREFIX}${key}`;
        themeCustomProperties[themeName].push([propName, value]);
        if (opts.autoContentColor && !NON_CONTENT_COLORS.includes(value)) {
          themeCustomProperties[themeName].push([
            `${propName}-content`,
            opts.autoContentColor(value),
          ]);
        }
      });
    });
  }
  Object.entries(themeCustomProperties)
    // Make sure the :root theme is always at the end.
    .reverse()
    .forEach(([themeName, customProperties]) => {
      styleSheet.insertRule(
        `${themeName} { ${customProperties
          .map(([propName, value]) => `${propName}: ${value}`)
          .join(";")} }`
      );
    });
  if (themeDescription.colors[opts.pageColor as string] !== undefined) {
    compute("background", opts.pageColor);
    document.documentElement.classList.add(`bg-${opts.pageColor as string}`);
  }
  if (opts?.defaultTheme) {
    document.documentElement.classList.add(opts.defaultTheme as string);
  }
}
