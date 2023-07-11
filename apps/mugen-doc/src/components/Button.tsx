import { BaseComponentProps, ButtonAttributes } from "mugen/types";
import { Button as B } from "mugen/ui";
import { splitProps } from "solid-js";

export const Button = (props: BaseComponentProps & ButtonAttributes) => {
  const [local, others] = splitProps(props, ["theme"]);
  return (
    <B theme={{ padding: "8", rounded: "xl", ...local.theme }} {...others} />
  );
};
