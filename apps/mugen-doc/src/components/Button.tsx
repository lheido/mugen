import { Border, Button as BaseButton, ButtonProps, Padding, Rounded, Scale, Transition } from "@mugen/core";
import { isMd } from "../utils/breakpoints";

export const Button = (props: ButtonProps) => {
  return (
    <Transition all duration="100">
      <Padding x="8" y="4">
        <Rounded value="xl">
          <Scale value="100" value:active={isMd() ? "90" : "95"}>
            <Border color="primary" width="1" style="solid">
              <BaseButton {...props} />
            </Border>
          </Scale>
        </Rounded>
      </Padding>
    </Transition>
  );
};
