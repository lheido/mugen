import { ButtonProps } from "@mugen/components";
import { BackgroundColor, Font } from "@mugen/theme";
import { Button } from "./Button";

export const CAButton = (props: ButtonProps) => {
  // const [local, others] = splitProps(props, ["theme"]);
  return (
    <BackgroundColor value="primary">
      <Font weight="bold">
        <Button
          // theme={{
          //   background: "primary",
          //   font: { weight: "bold" },
          //   hover: {
          //     background: "primary-focus",
          //   },
          //   ...local.theme,
          // }}
          {...props}
        />
      </Font>
    </BackgroundColor>
  );
};
