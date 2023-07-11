import { Box } from "mugen/ui";
import Prism from "prismjs";
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
      <Box
        as="pre"
        theme={{
          padding: "4",
          margin: "0",
          rounded: "lg",
        }}
      >
        {props.children}
      </Box>
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
      <Box
        as="code"
        ref={ref}
        classList={{ [`language-${local.language}`]: true }}
        {...others}
      >
        {props.children}
      </Box>
    </CodeWrapper>
  );
};
