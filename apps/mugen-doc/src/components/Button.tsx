import { Button as BaseButton, ButtonProps } from "@mugen/components";
import { Padding, Rounded, Scale } from "@mugen/theme";
import { isMd } from "../utils/breakpoints";

export const Button = (props: ButtonProps) => {
  return (
    <Padding x="8" y="4">
      <Rounded value="xl">
        <Scale value="100" value:active={isMd() ? "90" : "95"}>
          <BaseButton {...props} />
        </Scale>
      </Rounded>
    </Padding>
  );
  // return (
  //   <B
  //     theme={{
  //       padding: { x: "8", y: "4" },
  //       rounded: "xl",
  //       border: { color: "primary", width: "1" },
  //       transform: {
  //         scale: "100",
  //       },
  //       transition: {
  //         property: "all",
  //         duration: "200",
  //       },
  //       active: {
  //         transform: {
  //           scale: "95",
  //         },
  //       },
  //       ...local.theme,
  //     }}
  //     {...(others as any)}
  //   />
  // );
};
