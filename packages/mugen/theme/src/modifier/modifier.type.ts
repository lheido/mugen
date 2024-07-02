import { Accessor, JSX } from "solid-js";

export type ModifierWhenProp = Accessor<boolean> | true;

export type ModifierStyleValue = [string, ModifierWhenProp];

export type ModifierStyle = {
  [key in keyof JSX.CSSProperties]: ModifierStyleValue;
};

export type ModifierClassList = Record<string, ModifierWhenProp>;

export type ModifierResult = {
  classList?: ModifierClassList;
  styles?: ModifierStyle;
};

export type ModifierFunction = (...args: any[]) => ModifierResult;
