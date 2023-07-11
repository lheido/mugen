import { BaseComponentProps, ButtonAttributes } from "../types";
import { Box } from "./Box";

export function Button(props: BaseComponentProps & ButtonAttributes) {
  return <Box as="button" {...props} />;
}
