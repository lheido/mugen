import { Accessor, JSX } from "solid-js";
import data from "../../theme.json";
import {
  spacingCls,
  spacingContract,
  spacingResponsive,
} from "../framework/spacing.css";
import {
  SpacingValues as BaseSpacingValues,
  Breakpoints,
  SpacingProps,
  StringKeysAsInt,
} from "../framework/types";
import { ModifierResult, ModifierStyleValue } from "./modifier.type";
import { contractToVars } from "./utils";

const spacingVars = contractToVars(spacingContract);

export type SpacingContract = typeof spacingContract;

export type SpacingValues =
  | StringKeysAsInt<BaseSpacingValues>
  | Partial<{
      [K in keyof SpacingContract]: SpacingContract[K] extends string
        ? SpacingValues
        : {
            [L in keyof SpacingContract[K]]: SpacingValues;
          };
    }>;

export function getStyleValue(
  value: StringKeysAsInt<BaseSpacingValues>,
  when?: Accessor<boolean>
): ModifierStyleValue {
  return [
    value in data.spacings
      ? data.spacings[value as keyof typeof data.spacings]
      : (value as string),
    when ?? true,
  ];
}

const cache = new Map<string, ModifierResult>();

export function spacing(
  value: SpacingValues,
  when?: Accessor<boolean>
): ModifierResult {
  const result: ModifierResult = {
    classList: {
      [spacingCls]: when ?? true,
    },
    styles: {},
  };
  const key = JSON.stringify(value);
  if (cache.has(key)) {
    const res = cache.get(key)!;
    return res;
  }
  if (typeof value !== "object") {
    const styleVal = getStyleValue(value, when);
    result.styles![spacingVars.top as keyof JSX.CSSProperties] = styleVal;
    result.styles![spacingVars.bottom as keyof JSX.CSSProperties] = styleVal;
    result.styles![spacingVars.left as keyof JSX.CSSProperties] = styleVal;
    result.styles![spacingVars.right as keyof JSX.CSSProperties] = styleVal;
  } else {
    for (const [key, val] of Object.entries(value)) {
      if (typeof val === "object") {
        const breakpoint = key as keyof Breakpoints;
        for (const [k, v] of Object.entries(val)) {
          const propKey = k as keyof SpacingProps;
          result.classList![spacingResponsive[`${breakpoint}-${propKey}`]] =
            when ?? true;
          const prop = spacingVars[breakpoint][
            propKey
          ] as keyof JSX.CSSProperties;
          const sv = v as StringKeysAsInt<BaseSpacingValues>;
          result.styles![prop] = getStyleValue(sv, when);
        }
      } else {
        const styleProp = spacingVars[key as keyof SpacingContract];
        result.styles![styleProp as keyof JSX.CSSProperties] = getStyleValue(
          val as StringKeysAsInt<BaseSpacingValues>,
          when
        );
      }
    }
  }
  cache.set(key, result);
  return result;
}
