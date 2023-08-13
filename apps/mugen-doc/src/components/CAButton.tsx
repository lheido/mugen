import { BackgroundColor, ButtonProps, FontWeight } from "mugen/v2";
import { Button } from "./Button";

export const CAButton = (props: ButtonProps) => {
  // const [local, others] = splitProps(props, ["theme"]);
  return (
    <BackgroundColor value="primary">
      <FontWeight value="bold">
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
      </FontWeight>
    </BackgroundColor>
  );
};
