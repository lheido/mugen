import { useSemantic } from "../semantic";
import { Box, BoxProps } from "./Box";

export type TextProps = Omit<BoxProps<"span">, "as">;

export function Text(props: TextProps) {
  const parent = useSemantic();
  return (
    <Box
      as={parent?.type !== "p" && parent?.type !== "span" ? "p" : "span"}
      {...props}
    />
  );
}
