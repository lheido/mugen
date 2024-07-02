import { Accessor, JSX } from "solid-js";
import data from "../../theme.json";
import {
  PositionProps,
  PositionResponsiveKeys,
  positionCls,
  positionContract,
  positionResponsive,
  positionVariants,
} from "../framework/position.css";
import {
  SpacingValues as BaseSpacingValues,
  Breakpoints,
  StringKeysAsInt,
  ZIndexValues,
} from "../framework/types";
import { ModifierResult, ModifierStyleValue } from "./modifier.type";
import { getStyleValue as getSpacingStyleValue } from "./spacing";
import { contractToVars } from "./utils";

const positionVars = contractToVars(positionContract);

export type PositionContract = typeof positionContract;

type PositionPropsWithoutZIndex = Omit<PositionProps, "zIndex">;

export type PositionSpacingValues = {
  [K in keyof PositionPropsWithoutZIndex]?: StringKeysAsInt<BaseSpacingValues>;
} & {
  [B in keyof Breakpoints]?: {
    [K in keyof PositionPropsWithoutZIndex]?: StringKeysAsInt<BaseSpacingValues>;
  };
};

export type PositionZIndexValues = {
  zIndex?: ZIndexValues;
} & {
  [B in keyof Breakpoints]?: {
    zIndex?: ZIndexValues;
  };
};

export type PositionValues = PositionSpacingValues & PositionZIndexValues;

export function getStyleValue(
  prop: keyof PositionProps,
  value: StringKeysAsInt<BaseSpacingValues> | ZIndexValues,
  when?: Accessor<boolean>
): ModifierStyleValue {
  if (prop === "zIndex") {
    return [
      value in data.zIndex
        ? data.zIndex[value as keyof typeof data.zIndex]
        : (value as string),
      when ?? true,
    ];
  }
  return getSpacingStyleValue(
    value as StringKeysAsInt<BaseSpacingValues>,
    when
  );
}

export function _position(
  key: keyof typeof positionVariants,
  value?: PositionValues,
  when?: Accessor<boolean>
): ModifierResult {
  const result: ModifierResult = {
    classList: {
      [positionVariants[key]]: when ?? true,
      [positionCls]: when ?? true,
    },
    styles: {},
  };
  if (value) {
    for (const [key, val] of Object.entries(value)) {
      if (typeof val === "object") {
        const breakpoint = key as keyof PositionContract;
        for (const [k, v] of Object.entries(val)) {
          const propKey = k as keyof PositionProps;
          const resK = `${breakpoint}-${propKey}` as PositionResponsiveKeys;
          result.classList![positionResponsive[resK]] = when ?? true;
          // TODO: Fix this type casting
          const prop = (positionVars as any)[breakpoint][
            propKey
          ] as keyof JSX.CSSProperties;
          result.styles![prop] = getStyleValue(propKey, v, when);
        }
      } else {
        const styleProp = positionVars[key as keyof PositionProps];
        result.styles![styleProp as keyof JSX.CSSProperties] = getStyleValue(
          key as keyof PositionProps,
          val,
          when
        );
      }
    }
  }
  return result;
}

export function relative(
  value?: PositionValues,
  when?: Accessor<boolean>
): ModifierResult {
  return _position("relative", value, when);
}

export function absolute(
  value?: PositionValues,
  when?: Accessor<boolean>
): ModifierResult {
  return _position("absolute", value, when);
}

export function fixed(
  value?: PositionValues,
  when?: Accessor<boolean>
): ModifierResult {
  return _position("fixed", value, when);
}

export function sticky(
  value?: PositionValues,
  when?: Accessor<boolean>
): ModifierResult {
  return _position("sticky", value, when);
}

export function staticPosition(
  value?: PositionValues,
  when?: Accessor<boolean>
): ModifierResult {
  return _position("static", value, when);
}

export function initialPosition(
  value?: PositionValues,
  when?: Accessor<boolean>
): ModifierResult {
  return _position("initial", value, when);
}
