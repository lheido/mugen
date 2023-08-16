import { COLOR_VAR_PREFIX, mugen, NON_CONTENT_COLORS } from "./global";
import { preflightRules } from "./preflight";
import { escapeClassName } from "./properties/escapeClassName";
import { ClassList, ThemeDescription } from "./types";

for (const rule of preflightRules) {
  try {
    mugen.styleSheet.insertRule(rule);
  } catch (error) {
    /* ignore preflight errors */
  }
}
try {
  document.adoptedStyleSheets.push(mugen.styleSheet);
} catch (error) {
  /** ignore */
}

// mugen.styleSheet.insertRule(
//   String.raw`.hover\:my-cls:hover { border: 1px solid red; }`
// );

export type ComputeClassConfig = {
  mapIndex: Record<number | string, string>;
  baseCls: (property: string) => string;
  simpleValue: (base: string, value: string) => string | undefined;
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
        const simpleValue = this.simpleValue(
          this.mergeBaseWithModifier(base, _key),
          val
        );
        if (simpleValue) cls.push(simpleValue);
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
      const simpleValue = _config.simpleValue(base, value);
      if (simpleValue) cls.push(simpleValue);
    }
    cls.push(...(_config.additionalClasses?.(key) ?? []));
    return cls;
  };
}

export function computeValue(
  property: string,
  value: string | any[]
): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => {
      if (v.raw) {
        return v.raw;
      }
      return `${property}: ${v}`;
    });
  }
  return [`${property}: ${value}`];
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
      const result: string[] = [];
      properties.forEach((prop, i) =>
        result.push(
          ...computeValue(prop, _config.toRealValue(values[i], description))
        )
      );
      return result;
    }
    return computeValue(
      properties,
      _config.toRealValue(values as string, description)
    );
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
    mapIndex: {
      0: "l",
      1: "t",
      2: "r",
      3: "b",
      left: "l",
      right: "r",
      top: "t",
      bottom: "b",
    },
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
    simpleValue: (base, value) => {
      return [true, false].includes(value as any)
        ? undefined
        : `${base}-${value}`;
    },
  }),
  ruleHandler: createRulesHandler({
    extract(cls) {
      const [pos, value] = cls.split("-");
      if (["relative", "absolute", "fixed", "sticky"].includes(pos as any))
        return ["position", cls];
      return [pos, value] as [string, string];
    },
    toRealValue: (value, description) =>
      ["relative", "absolute", "fixed", "sticky"].includes(value as any)
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
      let [, valueOrLinearGradientStop, value] = cls.split("-");
      const gradientStop =
        value !== undefined ? valueOrLinearGradientStop : undefined;
      value = value === undefined ? valueOrLinearGradientStop : value;
      if (gradientStop) {
        if (gradientStop === "linear") {
          return [
            "background",
            `linear-gradient(to ${value}, var(--mugen-linear-from-stop), var(--mugen-linear-to-stop)) no-repeat`,
          ];
        }
        if (gradientStop === "from") {
          if (
            mugen.opts.autoContentColor !== false &&
            !NON_CONTENT_COLORS.includes(value as any)
          ) {
            return [
              [`--mugen-linear-${gradientStop}-stop`, "color"],
              [value, `${value}-content`],
            ];
          }
        }
        return [`--mugen-linear-${gradientStop}-stop`, value];
      }
      if (
        mugen.opts.autoContentColor !== false &&
        property === "background" &&
        !NON_CONTENT_COLORS.includes(value as any)
      ) {
        return [
          ["background", "color"],
          [value, `${value}-content`],
        ];
      }
      return [property, value];
    },
    toRealValue: (value) =>
      value.startsWith("linear-") ? value : `var(${COLOR_VAR_PREFIX}${value})`,
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
const flexBasisHandler: Handler = {
  clsHandler: defaultXYHandler.clsHandler,
  ruleHandler: createRulesHandler({
    toRealValue: (value, description) =>
      description.flexBasis[value] || description.sizes[value],
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
      description.borderStyle[value] ||
      description.colors[value] ||
      description.borderWidth[value],
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
    extract(cls) {
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
const fontSizeHandler: Handler = {
  clsHandler: createClassNamesHandler(),
  ruleHandler: createRulesHandler({
    toRealValue: (value, description) => description.fontSize[value],
  }),
};
const fontWeightHandler: Handler = {
  clsHandler: createClassNamesHandler(),
  ruleHandler: createRulesHandler({
    toRealValue: (value, description) => description.fontWeight[value],
  }),
};
const shadowHandler: Handler = {
  clsHandler: createClassNamesHandler(),
  ruleHandler: createRulesHandler({
    extract: (cls) => ["box-shadow", cls.replace("shadow-", "")],
    toRealValue: (value, description) => description.shadow[value],
  }),
};
const transitionHandler: Handler = {
  clsHandler: createClassNamesHandler({
    simpleValue: (base, value) => `${base}-property-${value}`,
    additionalClasses: () => ["transition"],
  }),
  ruleHandler: createRulesHandler({
    extract: (cls) => {
      if (cls === "transition") {
        return [
          "transition",
          "var(--mugen-transition-property) var(--mugen-transition-duration, 0.2s) var(--mugen-transition-timing-function, linear) var(--mugen-transition-delay, 0s)",
        ];
      }
      const prop = cls.split("-")[1];
      return [`--mugen-transition-${prop}`, cls.split("-")[2]];
    },
    toRealValue: (value, description) =>
      description.transitionProperties[value] ||
      description.transitionDuration[value] ||
      description.transitionTimingFunction[value] ||
      value,
  }),
};
const transformHandler: Handler = {
  clsHandler: createClassNamesHandler({
    mapIndex: { 0: "x", 1: "y", 2: "z" },
  }),
  ruleHandler: createRulesHandler({
    extract: (cls) => cls.split("-") as [string, string],
    toRealValue: (value, description) => "0",
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
  flexBasis: flexBasisHandler,
  fontSize: fontSizeHandler,
  fontWeight: fontWeightHandler,
  shadow: shadowHandler,
  transition: transitionHandler,
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
  "flex-basis": "flexBasis",
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  shadow: "shadow",
  transition: "transition",
} as const;

// export function oldBuildClassNames(
//   key: string,
//   value: any,
//   emod?: string,
//   media?: string,
//   ps?: string
// ): string[] {
//   const handler = handlers[propHandlerMap[key]] ?? handlers.default;
//   if (!handler && typeof value === "boolean") return [key];
//   const cls = handler.clsHandler(key, value);
//   const classNames = cls.map((className) => {
//     const _emod = emod ? `${emod}:` : "";
//     const _ps = ps ? `${ps}:` : "";
//     const _media = media ? `${media}:` : "";
//     return `${_media}${_emod}${_ps}${className}`.replaceAll(/[/:]/g, "-");
//   });
//   return classNames;
// }
export function* oldBuildClassNames(
  key: string,
  value: any,
  emod?: string,
  media?: string,
  ps?: string
): Generator<string> {
  const handler = handlers[propHandlerMap[key]] ?? handlers.default;
  if (!handler && typeof value === "boolean") {
    yield key;
  } else {
    const cls = handler.clsHandler(key, value);
    for (const className of cls) {
      const _emod = emod ? `${emod}:` : "";
      const _ps = ps ? `${ps}:` : "";
      const _media = media ? `${media}:` : "";
      yield `${_media}${_emod}${_ps}${className}`;
    }
  }
}

export function compute(
  key: string,
  value: any,
  emod?: string,
  media?: string,
  ps?: string
): ClassList {
  const handler = handlers[propHandlerMap[key]] ?? handlers.default;
  const cls = handler.clsHandler(key, value);
  // if (!handler && typeof value === "boolean") return { [key]: value };
  // const classNames = cls.map((className) => {
  //   const _emod = emod ? `${emod}:` : "";
  //   const _ps = ps ? `${ps}:` : "";
  //   const _media = media ? `${media}:` : "";
  //   return escapeClassName(`${_media}${_emod}${_ps}${className}`);
  // });
  const classNames = [];
  for (const c of oldBuildClassNames(key, value, emod, media, ps)) {
    const i = classNames.push(c) - 1;
    if (!mugen.classNameRefs.has(c)) {
      mugen.classNameRefs.set(c, true);
      const ruleContent = handler.ruleHandler(
        cls[i],
        key,
        mugen.themeDescription
      );
      const _evt = emod ? `:${emod}` : "";
      const __ps = ps ? `::${ps}` : "";
      const rule = `.${escapeClassName(c)}${_evt}${__ps} {${ruleContent.join(
        ";"
      )}}`;
      let ss = mugen.styleSheet;
      if (media) {
        if (!mugen.mediaStyleSheets.has(media)) {
          const newMediaStyleSheet = new CSSStyleSheet({
            media: `(min-width: ${mugen.themeDescription.breakpoints[media]})`,
          });
          document.adoptedStyleSheets.push(newMediaStyleSheet);
          mugen.mediaStyleSheets.set(media, newMediaStyleSheet);
        }
        ss = mugen.mediaStyleSheets.get(media)!;
      }
      ss.insertRule(rule);
    }
  }
  // classNames.forEach((className, i) => {
  //   if (!global.classNameRefs.has(className)) {
  //     global.classNameRefs.set(className, true);
  //     const ruleContent = handler.ruleHandler(
  //       cls[i],
  //       key,
  //       global.themeDescription
  //     );
  //     const _evt = emod ? `:${emod}` : "";
  //     const __ps = ps ? `::${ps}` : "";
  //     const rule = `.${className}${_evt}${__ps} {${ruleContent.join(";")}}`;
  //     let ss = global.styleSheet;
  //     if (media) {
  //       if (!global.mediaStyleSheets.has(media)) {
  //         const newMediaStyleSheet = new CSSStyleSheet({
  //           media: `(min-width: ${global.themeDescription.breakpoints[media]})`,
  //         });
  //         document.adoptedStyleSheets.push(newMediaStyleSheet);
  //         global.mediaStyleSheets.set(media, newMediaStyleSheet);
  //       }
  //       ss = global.mediaStyleSheets.get(media)!;
  //     }
  //     ss.insertRule(rule);
  //   }
  // });
  return classNames.reduce((list, className) => {
    list[className] = true;
    return list;
  }, {} as ClassList);
}
