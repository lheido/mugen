import { FlowProps, splitProps } from "solid-js";
import { As } from "../semantic";
import { IntrinsicElements } from "../types";
import { Box, useParent } from "./Box";

const USE_SPAN = [
  "button",
  "span",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "adress",
  "em",
  "cite",
  "code",
  "i",
  "label",
  "small",
  "strong",
  "sub",
  "sup",
  "time",
  "q",
  "progress",
  "select",
  "option",
];

export const Text = (props: FlowProps & { as?: IntrinsicElements }) => {
  const [flow, local] = splitProps(props, ["children"]);
  const parent = useParent();
  const as = () => {
    if (local.as) return local.as;
    if (parent) {
      return parent.path.some((tag) => USE_SPAN.includes(tag)) ? "span" : "p";
    }
    return "span";
  };
  return (
    <As value={as()}>
      <Box {...flow} />
    </As>
  );
};
