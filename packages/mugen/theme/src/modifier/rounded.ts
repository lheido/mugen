import { Accessor, JSX } from "solid-js";
import data from "../../theme.json";
import {
  roundedCls,
  roundedContract,
  roundedResponsive,
} from "../framework/rounded.css";
import {
  RoundedValues as BaseRoundedValues,
  RoundedProps,
  StringKeysAsInt,
} from "../framework/types";
import { ModifierResult, ModifierStyleValue } from "./modifier.type";
import { contractToVars } from "./utils";

const roundedVars = contractToVars(roundedContract);

export type RoundedContract = typeof roundedContract;

export function getStyleValue(
  value: StringKeysAsInt<BaseRoundedValues>,
  when?: Accessor<boolean>
): ModifierStyleValue {
  return [
    value in data.rounded
      ? data.rounded[value as keyof typeof data.rounded]
      : (value as string),
    when ?? true,
  ];
}

export type RoundedValues =
  | StringKeysAsInt<BaseRoundedValues>
  | Partial<{
      [K in keyof RoundedContract]: RoundedContract[K] extends string
        ? RoundedValues
        : {
            [L in keyof RoundedContract[K]]: RoundedValues;
          };
    }>;

const cache = new Map<string, ModifierResult>();

export function rounded(
  value: RoundedValues,
  when?: Accessor<boolean>
): ModifierResult {
  const result: ModifierResult = {
    classList: {
      [roundedCls]: true,
    },
    styles: {},
  };

  const cacheKey = JSON.stringify(value);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }
  if (typeof value !== "object") {
    const _val = getStyleValue(value, when);
    result.styles![roundedVars.topLeft as keyof JSX.CSSProperties] = _val;
    result.styles![roundedVars.topRight as keyof JSX.CSSProperties] = _val;
    result.styles![roundedVars.bottomLeft as keyof JSX.CSSProperties] = _val;
    result.styles![roundedVars.bottomRight as keyof JSX.CSSProperties] = _val;
  } else {
    for (const [key, val] of Object.entries(value)) {
      if (typeof val === "object") {
        const breakpoint = key as keyof typeof data.breakpoints;
        for (const [subKey, subVal] of Object.entries(val)) {
          const _key = subKey as keyof RoundedProps;
          result.classList![roundedResponsive[`${breakpoint}-${_key}`]] =
            when ?? true;
          const prop = roundedVars[breakpoint][_key] as keyof JSX.CSSProperties;
          const sv = subVal as StringKeysAsInt<BaseRoundedValues>;
          result.styles![prop] = getStyleValue(sv, when);
        }
      } else {
        const sv = roundedVars[key as keyof RoundedContract];
        result.styles![sv as keyof JSX.CSSProperties] = getStyleValue(
          val as StringKeysAsInt<BaseRoundedValues>,
          when
        );
      }
    }
  }
  cache.set(cacheKey, result);
  return result;
}
