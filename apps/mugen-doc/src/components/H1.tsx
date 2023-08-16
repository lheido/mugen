import { Box } from "@mugen/components";
import { As } from "@mugen/semantic";
import { Color, Font } from "@mugen/theme";
import { JSX } from "solid-js";

export function H1(props: { children: JSX.Element }) {
  return (
    <Font size="2xl" weight="bold">
      <Color value="primary">
        <As value="h1">
          <Box {...props} />
        </As>
      </Color>
    </Font>
  );
}
