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

function determineTag(path: IntrinsicElements[]): IntrinsicElements {
  // TODO: find a better way to determine the tag.
  // For now, we just determine the tag according to the presence of an inline element in the path.
  return path.reverse().reduce((tag, current) => {
    if (tag === "span" && !USE_SPAN.includes(current)) {
      return "p";
    }
    return tag;
  }, "span" as IntrinsicElements);
}

export const Text = (props: FlowProps & { as?: IntrinsicElements }) => {
  const [flow, local] = splitProps(props, ["children"]);
  const parent = useParent();
  const as = () => {
    if (local.as) return local.as;
    return determineTag(parent?.path ?? []);
  };
  return (
    <As value={as()}>
      <Box {...flow} />
    </As>
  );
};
