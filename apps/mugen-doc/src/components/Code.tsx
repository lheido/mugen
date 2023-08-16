import { Box } from "@mugen/components";
import { As } from "@mugen/semantic";
import { Margin, Overflow, Padding, Rounded } from "@mugen/theme";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import { ComponentProps, JSX, onMount, Show, splitProps } from "solid-js";
import "../styles/prism.css";

Prism.manual = true;

export type CodeProps = ComponentProps<"code"> & {
  inline?: boolean;
  language: string;
};

function CodeWrapper(props: { inline?: boolean; children: JSX.Element }) {
  return (
    <Show when={!props.inline} fallback={props.children}>
      <Overflow value="auto">
        <Padding value="4">
          <Margin value="0">
            <Rounded value="lg">
              <As value="pre">
                <Box>{props.children}</Box>
              </As>
            </Rounded>
          </Margin>
        </Padding>
      </Overflow>
    </Show>
  );
}

export const Code = (props: CodeProps) => {
  let ref!: HTMLElement;
  const [local, others] = splitProps(props, ["inline", "language", "children"]);
  onMount(() => {
    Prism.highlightElement(ref);
  });
  return (
    <CodeWrapper inline={local.inline}>
      <As value="code">
        <Box ref={ref} classList={{ [`language-${local.language}`]: true }} {...others}>
          {props.children}
        </Box>
      </As>
    </CodeWrapper>
  );
};
