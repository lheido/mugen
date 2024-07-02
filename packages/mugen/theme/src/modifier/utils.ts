import { createThemeContract } from "@vanilla-extract/css";

export function contractToVars<
  T extends {},
  V extends ReturnType<typeof createThemeContract<T>>
>(contract: V): V {
  return Object.keys(contract).reduce((acc, name) => {
    const value = contract[name as keyof V];
    return {
      ...acc,
      [name]:
        typeof value === "object"
          ? contractToVars(value)
          : value.replace("var(", "").replace(")", ""),
    };
  }, {}) as V;
}
