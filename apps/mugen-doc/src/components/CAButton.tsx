import { BaseComponentProps, ButtonAttributes } from "mugen/types";
import { splitProps } from "solid-js";
import { Button } from "./Button";

export const CAButton = (props: BaseComponentProps & ButtonAttributes) => {
  const [local, others] = splitProps(props, ["theme"]);
  return (
    <Button
      theme={{
        background: "primary",
        font: { weight: "bold" },
        ...local.theme,
      }}
      {...others}
    />
  );
};
