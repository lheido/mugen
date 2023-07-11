import { mergeProps } from "solid-js";
import { BaseComponentProps, UniversalAttributes } from "../types";
import { Text } from "./Text";

export const Paragraph = (props: BaseComponentProps & UniversalAttributes) => {
  // TODO: auto detect span/p usage ?
  return <Text {...mergeProps({ as: "p" }, props)} />;
};
