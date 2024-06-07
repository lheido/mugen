import { PolymorphicComponent } from "@mugen/core";
import { ContextProviderComponent, createContext, useContext } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { SetStoreFunction } from "solid-js/store";

export type BoxContextState<
  R = any,
  T extends PolymorphicComponent<R> = "div"
> = {
  classList: Record<string, boolean | undefined>;
  style: JSX.CSSProperties;
  as?: T;
  consumedProps: string[];
};

export type BoxContext<R = any, T extends PolymorphicComponent<R> = "div"> = [
  BoxContextState<R, T>,
  SetStoreFunction<BoxContextState<R, T>>
];

const boxContext = createContext<BoxContext>();
/**
 * Simple helper to access the context
 */
export function useBox<R = any, T extends PolymorphicComponent<R> = "div">() {
  return useContext(boxContext) as BoxContext<R, T> | undefined;
}
/**
 * Simple helper to typing the context provider
 */
export function getContextProvider<
  R = any,
  T extends PolymorphicComponent<R> = "div"
>() {
  return boxContext.Provider as ContextProviderComponent<BoxContext<R, T>>;
}
