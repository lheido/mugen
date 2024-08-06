import { useSemantic } from "../semantic";
import { Box, BoxProps } from "./Box";

export type TextProps = Omit<BoxProps<"span">, "as">;

const PARENT_TAGS_NOT_ALLOWED_FOR_PARAGRAPH = [
  "p",
  "span",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "button",
  "a",
  "label",
  "legend",
];

function useParagraphTag(type?: string) {
  if (!type) return true;
  return !PARENT_TAGS_NOT_ALLOWED_FOR_PARAGRAPH.includes(type);
}

export function Text(props: TextProps) {
  const parent = useSemantic();
  return <Box as={useParagraphTag(parent?.type) ? "p" : "span"} {...props} />;
}
