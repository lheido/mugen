export function getNegative<V extends string>(value: V) {
  return value.startsWith("-") ? "-" : "";
}

export function getValue<V extends string>(value: V) {
  return value.startsWith("-") ? value.slice(1) : value;
}
