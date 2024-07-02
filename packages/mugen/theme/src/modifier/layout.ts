import { Accessor, JSX } from "solid-js";
import {
  layoutCls,
  layoutContract,
  layoutGapResponsive,
  layoutVariants,
} from "../framework/layout.css";
import {
  SpacingValues as BaseSpacingValues,
  Breakpoints,
  LayoutFlex,
  StringKeysAsInt,
} from "../framework/types";
import { ModifierResult } from "./modifier.type";
import { getStyleValue } from "./spacing";
import { contractToVars } from "./utils";

export function fill(when?: Accessor<boolean>): ModifierResult {
  const result: ModifierResult = {
    styles: {
      "flex-grow": ["1", when ?? true],
    },
  };
  return result;
}

export type LayoutValue<K extends keyof LayoutFlex> = LayoutFlex[K];
export type LayoutResponsiveValue<K extends keyof LayoutFlex> = {
  [key in keyof Breakpoints]?: LayoutFlex[K];
};

const cache = new Map<string, ModifierResult>();

function _layoutModifier<K extends keyof LayoutFlex>(
  prefix: "justify" | "items" | "direction" | "wrap",
  valueOrResponsive: LayoutValue<K> | LayoutResponsiveValue<K>,
  when?: Accessor<boolean>
) {
  const cachekey = JSON.stringify({ prefix, valueOrResponsive });
  if (cache.has(cachekey)) {
    return cache.get(cachekey)!;
  }
  const result: ModifierResult = {
    classList: {
      [layoutCls]: when ?? true,
    },
  };
  const isResponsive = typeof valueOrResponsive === "object";
  if (isResponsive) {
    for (const [key, val] of Object.entries(valueOrResponsive)) {
      const breakpoint = key as keyof Breakpoints;
      const variant =
        `${prefix}-${breakpoint}-${val}` as keyof typeof layoutVariants;
      result.classList![layoutVariants[variant]] = when ?? true;
    }
  } else {
    const variant =
      `${prefix}-${valueOrResponsive}` as keyof typeof layoutVariants;
    result.classList![layoutVariants[variant]] = when ?? true;
  }
  cache.set(cachekey, result);
  return result;
}

export function justify(
  valueOrResponsive:
    | LayoutValue<"justifyContent">
    | LayoutResponsiveValue<"justifyContent">,
  when?: Accessor<boolean>
): ModifierResult {
  return _layoutModifier("justify", valueOrResponsive, when);
}

export function align(
  value: LayoutFlex["alignItems"],
  when?: Accessor<boolean>
): ModifierResult {
  return _layoutModifier("items", value, when);
}

export function direction(
  value: LayoutFlex["flexDirection"],
  when?: Accessor<boolean>
): ModifierResult {
  return _layoutModifier("direction", value, when);
}

export function wrap(
  value: LayoutFlex["flexWrap"],
  when?: Accessor<boolean>
): ModifierResult {
  return _layoutModifier("wrap", value, when);
}

const layoutVars = contractToVars(layoutContract);

export type LayoutGapValues = StringKeysAsInt<BaseSpacingValues>;
export type layoutGapResponsiveValues = {
  [key in keyof Breakpoints]?: LayoutGapValues;
};

export function gap(
  valueOrResponsive: LayoutGapValues | layoutGapResponsiveValues,
  when?: Accessor<boolean>
): ModifierResult {
  const result: ModifierResult = {
    classList: {
      [layoutCls]: when ?? true,
    },
    styles: {},
  };
  const key = JSON.stringify(valueOrResponsive);
  if (cache.has(key)) {
    const res = cache.get(key)!;
    return res;
  }
  if (typeof valueOrResponsive !== "object") {
    result.styles![layoutVars.gap as keyof JSX.CSSProperties] = getStyleValue(
      valueOrResponsive,
      when
    );
  } else {
    for (const [key, val] of Object.entries(valueOrResponsive)) {
      const breakpoint = key as keyof Breakpoints;
      result.classList![layoutGapResponsive[breakpoint]] = when ?? true;
      result.styles![layoutVars[breakpoint].gap as keyof JSX.CSSProperties] =
        getStyleValue(val, when);
    }
  }
  cache.set(key, result);
  return result;
}
