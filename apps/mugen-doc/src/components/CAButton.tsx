import { ButtonProps } from "mugen/ui";
import { splitProps } from "solid-js";
import { Button } from "./Button";

export const CAButton = (props: ButtonProps) => {
  const [local, others] = splitProps(props, ["theme"]);
  return (
    <Button
      theme={{
        background: "primary",
        font: { weight: "bold" },
        hover: {
          background: "primary-focus",
        },
        ...local.theme,
      }}
      {...(others as any)}
    />
  );
};
