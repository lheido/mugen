import { Button as B, ButtonProps } from "mugen/ui";
import { splitProps } from "solid-js";

export const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, ["theme"]);
  return (
    <B
      theme={{
        padding: { x: "8", y: "4" },
        rounded: "xl",
        border: { color: "primary", width: "1" },
        transform: {
          scale: "100",
        },
        transition: {
          property: "all",
          duration: "200",
        },
        active: {
          transform: {
            scale: "95",
          },
        },
        ...local.theme,
      }}
      {...(others as any)}
    />
  );
};
