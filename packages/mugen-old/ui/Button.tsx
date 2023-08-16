import {
  BaseComponentProps,
  ButtonAttributes,
  Either,
  LinkAttributes,
} from "../types";
import { Box } from "./Box";

export type ButtonProps = BaseComponentProps &
  Either<Partial<ButtonAttributes>, Partial<LinkAttributes>>;

export function Button(props: ButtonProps) {
  return <Box as={props.href ? "a" : "button"} {...props} />;
}
