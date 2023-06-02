import { preflightRules } from "./preflight";
import {
  ClassList,
  ThemeDescription,
  ThemeElementApi,
  ThemeEventNames,
  themeEventNames,
} from "./types";

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

function processStyle<
  T extends ThemeDescription,
  B extends keyof T["breakpoints"] extends string ? string : undefined,
  V = any
>(data: {
  baseCls?: (property: string) => string;
  computeClassNames: (baseCls: string, value: V) => string[];
  computeRules: (
    className: string,
    property: string,
    value: V,
    description: T
  ) => string[];
}) {
  return (
    property: string,
    value: V,
    description: T,
    emod?: ThemeEventNames,
    media?: B,
    ps?: string
  ): ClassList => {
    const baseCls = data.baseCls ? data.baseCls(property) : property;
    const cls = data.computeClassNames(baseCls, value);
    const classNames = cls.map((className) => {
      const _emod = emod ? `${emod}:` : "";
      const _ps = ps ? `${ps}:` : "";
      const _media = media ? `${media}:` : "";
      return `${_media}${_emod}${_ps}${className}`.replaceAll(/[/:]/g, "-");
    });
    classNames.forEach((className, i) => {
      if (!classNameRefs.has(className)) {
        classNameRefs.set(className, true);
        const ruleContent = data.computeRules(
          cls[i],
          property,
          value,
          description
        );
        const _evt = emod ? `:${emod}` : "";
        const __ps = ps ? `::${ps}` : "";
        const rule = `.${className}${_evt}${__ps} {${ruleContent.join(";")}}`;
        let ss = styleSheet;
        if (media) {
          if (!mediaStyleSheets.has(media)) {
            const newMediaStyleSheet = new CSSStyleSheet({
              media: `(min-width: ${description.breakpoints[media]})`,
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
  };
}

const createPaddingHandler = <T extends ThemeDescription>() => {
  const dblEdges = ["x", "y"];
  const edges = ["l", "t", "r", "b"];
  const propSuffixes = ["left", "top", "right", "bottom"];
  return processStyle({
    baseCls: (property: string) => property[0],
    computeClassNames: (baseCls: string, value: string | string[]) =>
      Array.isArray(value)
        ? value.length <= 2
          ? (value
              .map((v, i) => v && `${baseCls}${dblEdges[i]}-${v}`)
              .filter(Boolean) as string[])
          : (value
              .map((v, i) => v && `${baseCls}${edges[i]}-${v}`)
              .filter(Boolean) as string[])
        : [`${baseCls}-${value}`],
    computeRules: (
      className,
      property,
      value: string | string[],
      description
    ) => {
      if (Array.isArray(value)) {
        if (value.length <= 2) {
          const index = className.includes("x") ? 0 : 1;
          const val = value[index];
          if (val)
            return [
              `${property}-${index === 0 ? "left" : "top"}: ${
                description.spacing[val]
              }`,
              `${property}-${index === 0 ? "right" : "bottom"}: ${
                description.spacing[val]
              }`,
            ];
          return [];
        } else {
          const index = className.includes("l")
            ? 0
            : className.includes("t")
            ? 1
            : className.includes("r")
            ? 2
            : 3;
          const val = value[index];
          const suffix = propSuffixes[index];
          if (val)
            return [`${property}-${suffix}: ${description.spacing[val]}`];
          return [];
        }
      }
      return value ? [`${property}: ${description.spacing[value]}`] : [];
    },
  });
};

const createPositionHandler = <T extends ThemeDescription>() => {
  const edges = ["left", "right", "top", "bottom"] as const;
  const positions = ["absolute", "fixed", "relative", "sticky"] as const;
  return processStyle({
    computeClassNames: (baseCls: string, value: string[]) =>
      [
        baseCls,
        ...value?.filter(Boolean).map((v, i) => `${edges[i]}-${v}`),
      ] as string[],
    computeRules: (className, property, value, description) => {
      if (positions.includes(className as (typeof positions)[number]))
        return [`position: ${property}`];
      return value.reduce<string[]>((acc, v, i) => {
        if (v) {
          acc.push(`${edges[i]}: ${description.spacing[v]}`);
        }
        return acc;
      }, []);
    },
  });
};

const createRoundedHandler = <T extends ThemeDescription>() => {
  const dblEdges = ["l", "r"];
  const edges = ["tl", "tr", "br", "bl"];
  const propSuffixes = ["top-left", "top-right", "bottom-right", "bottom-left"];
  return processStyle({
    computeClassNames: (baseCls: string, value: string | string[]) =>
      Array.isArray(value)
        ? value.length <= 2
          ? (value
              .map((v, i) => (v ? `${baseCls}-${dblEdges[i]}-${v}` : undefined))
              .filter(Boolean) as string[])
          : (value
              .map((v, i) => (v ? `${baseCls}-${edges[i]}-${v}` : undefined))
              .filter(Boolean) as string[])
        : [`${baseCls}-${value}`],
    computeRules: (className, property, value, description) => {
      if (Array.isArray(value)) {
        if (value.length <= 2) {
          const index = className.includes("-l") ? 0 : 1;
          const val = value[index];
          if (val)
            return [
              `${
                index === 0
                  ? "border-top-left-radius"
                  : "border-top-right-radius"
              }: ${description.spacing[val]}`,
              `${
                index === 0
                  ? "border-bottom-left-radius"
                  : "border-bottom-right-radius"
              }: ${description.spacing[val]}`,
            ];
          return [];
        } else {
          const index = className.includes("-tl")
            ? 0
            : className.includes("-tr")
            ? 1
            : className.includes("-br")
            ? 2
            : 3;
          const val = value[index];
          const suffix = propSuffixes[index];
          if (val)
            return [`border-${suffix}-radius: ${description.spacing[val]}`];
          return [];
        }
      }
      return value ? [`border-radius: ${description.spacing[value]}`] : [];
    },
  });
};

const createSizeHandler = <T extends ThemeDescription>() => {
  const prefixes = ["", "min-", "max-"];
  const clsPrefix = ["", "min-", "max-"];
  return processStyle({
    baseCls: (property: string) => property[0],
    computeClassNames: (baseCls: string, value: string | string[]) =>
      Array.isArray(value)
        ? (value
            .map((v, i) => v && `${clsPrefix[i]}${baseCls}-${v}`)
            .filter(Boolean) as string[])
        : [`${baseCls}-${value}`],
    computeRules: (
      className,
      property,
      value: string | string[],
      description
    ) => {
      if (Array.isArray(value)) {
        const index = className.includes("min")
          ? 1
          : className.includes("max")
          ? 2
          : 0;
        const val = value[index];
        if (!val) return [];
        const prefix = prefixes[index];
        return [`${prefix}${property}: ${description.sizes[val]}`];
      }
      return value ? [`${property}: ${description.sizes[value]}`] : [];
    },
  });
};

const createColorHandler = <T extends ThemeDescription>() => {
  const propMap: Record<string, string> = {
    background: "background-color",
    color: "color",
  };
  return processStyle({
    baseCls: (property: string) => (property === "background" ? "bg" : "color"),
    computeClassNames: (baseCls, value: string) =>
      value ? [`${baseCls}-${value}`] : [],
    computeRules: (_, property, value: string, description) => {
      return value
        ? [`${propMap[property]}: ${description.colors[value as string]}`]
        : [];
    },
  });
};

export interface ThemeApi {
  execute(): ClassList;
}

const cachedThemes: Record<string, ClassList> = {};

export const Theme = <
  T extends ThemeDescription,
  B extends keyof T["breakpoints"] extends string ? string : undefined
>(
  description: T
) => {
  const handlersMap: Record<string, (...args: any[]) => ClassList> = {
    spacing: createPaddingHandler<T>(),
    sizes: createSizeHandler<T>(),
    colors: createColorHandler<T>(),
    rounded: createRoundedHandler<T>(),
    position: createPositionHandler<T>(),
  };

  const propHandlerMap: Record<string, string> = {
    padding: "spacing",
    margin: "spacing",
    background: "colors",
    color: "colors",
    rounded: "rounded",
    relative: "position",
    absolute: "position",
    fixed: "position",
    sticky: "position",
    height: "sizes",
    width: "sizes",
  };

  return class ThemeApi implements ThemeApi {
    static build(theme: ThemeElementApi<T>) {
      return new this(description, theme);
    }

    private constructor(
      private description: T,
      private theme: ThemeElementApi<T>
    ) {}

    execute(): ClassList {
      const cachedKey = JSON.stringify(this.theme);
      if (cachedThemes[cachedKey]) {
        return cachedThemes[cachedKey];
      }
      const classList: Record<string, boolean> = {};
      Object.entries(this.theme).forEach(([key, value]) => {
        this.computed(key, value, classList);
      });
      cachedThemes[cachedKey] = classList;
      return classList;
    }

    private computed(
      key: string,
      value: any,
      classList: ClassList,
      emod?: ThemeEventNames,
      media?: B
    ) {
      if (themeEventNames.includes(key as ThemeEventNames)) {
        Object.entries(value).forEach(([k, v]) => {
          this.computed(k, v, classList, key as ThemeEventNames, media);
        });
      } else if (key in this.description.breakpoints) {
        Object.entries(value).forEach(([k, v]) => {
          this.computed(k, v, classList, emod, key as B);
        });
      } else {
        const handler = handlersMap[propHandlerMap[key]];
        if (handler) {
          Object.assign(
            classList,
            handler(key, value, this.description, emod, media)
          );
        }
      }
    }
  };
};
