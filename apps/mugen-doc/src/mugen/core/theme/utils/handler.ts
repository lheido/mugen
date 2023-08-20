import { PseudoClasses } from "@mugen/types";

export function getNegative<V extends string>(value: V) {
  return value.startsWith("-") ? "-" : "";
}

export function getValue<V extends string>(value: V) {
  return value.startsWith("-") ? value.slice(1) : value;
}

export function getKeyAndModifier<K extends string>(key: K) {
  return key.split(":") as [K, PseudoClasses | undefined];
}
