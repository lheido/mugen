import {
  MugenThemeProvider,
  Padding,
  ThemeConsumer,
  themeDescriptionDefaults,
} from "mugen/v2";
import { FlowProps } from "solid-js";

const Fooo = (props: FlowProps) => {
  return (
    <Padding value="4">
      <ThemeConsumer>{props.children}</ThemeConsumer>
    </Padding>
  );
};

const HomeV2 = () => {
  console.time("HomeV2");
  const result = (
    <MugenThemeProvider description={themeDescriptionDefaults as any}>
      <Padding value="2">
        <Fooo>
          <Padding value="6">
            <ThemeConsumer>Lorem ipsum</ThemeConsumer>
          </Padding>
        </Fooo>
      </Padding>
    </MugenThemeProvider>
  );
  console.timeEnd("HomeV2");
  return result;
};

export default HomeV2;
