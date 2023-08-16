import { ButtonProps } from "@mugen/components";
import { BackgroundColor, Font } from "@mugen/theme";
import { Button } from "./Button";

export const CAButton = (props: ButtonProps) => {
  // const [local, others] = splitProps(props, ["theme"]);
  return (
    <BackgroundColor value="primary" value:hover="primary-focus">
      <Font weight="bold">
        <Button {...props} />
      </Font>
    </BackgroundColor>
  );
};
