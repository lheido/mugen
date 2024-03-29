import { FlowProps, splitProps } from "solid-js";
import { IntrinsicElements } from "../types";
import { useMugenSemanticContext } from "./context";

// export type AsProps = Either<
//   Split<Record<IntrinsicElements, boolean>>,
//   { value?: IntrinsicElements }
// >;

export type AsProps = { value: IntrinsicElements };

export const As = (props: FlowProps & AsProps) => {
  const [flow, local] = splitProps(props, ["children"]);
  const ctx = useMugenSemanticContext();
  if (ctx?.as === undefined) {
    ctx.as = () => local.value;
  }
  return flow.children;
};
