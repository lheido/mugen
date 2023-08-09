import { Height, Padding, Rounded, ThemeConsumer } from "mugen/v2";
import { FlowProps } from "solid-js";

const Fooo = (props: FlowProps) => {
  return (
    <Height min="1/2">
      <Padding value="4">
        <ThemeConsumer>{props.children}</ThemeConsumer>
      </Padding>
    </Height>
  );
};

const HomeV2 = () => {
  console.time("HomeV2");
  const result = (
    <Height value="hscreen">
      <Padding value="2">
        <Fooo>
          <Padding value="6">
            <Rounded value="lg">
              <ThemeConsumer>Lorem ipsum</ThemeConsumer>
            </Rounded>
          </Padding>
        </Fooo>
      </Padding>
    </Height>
  );
  console.timeEnd("HomeV2");
  return result;
};

export default HomeV2;
