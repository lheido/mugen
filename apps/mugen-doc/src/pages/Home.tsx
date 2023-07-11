import { Box, Column, FlexLayout, Paragraph, Row } from "mugen/ui";
import { Component } from "solid-js";
import appCode from "../App.tsx?raw";
import { Button } from "../components/Button";
import { CAButton } from "../components/CAButton";
import { Code } from "../components/Code";
import basicUsage from "../examples/basic_usage.tsx?raw";

const Home: Component = () => {
  console.time("Home");
  const result = (
    <>
      <FlexLayout
        justify="center"
        items="center"
        theme={{
          height: "screen",
          relative: true,
          background: {
            from: "page",
            to: "pageTo",
            direction: "bottom",
          },
        }}
      >
        <Box
          aria-hidden="true"
          theme={{
            absolute: { top: "0", left: "0" },
            width: "full",
            height: "full",
            overflow: "hidden",
            opacity: 25,
            filter: {
              blur: 5,
            },
          }}
        >
          <Code language="tsx">{appCode}</Code>
        </Box>
        <Column gap="16" theme={{ width: "2/3", margin: "auto", zIndex: 1 }}>
          <Paragraph theme={{ font: { size: "6xl" } }}>
            An <strong>UI toolkit</strong> that provides low level components to
            build app faster and easier.
          </Paragraph>
          <Paragraph theme={{ font: { size: "5xl" } }}>
            It provides a typed way to adopt <strong>design systems</strong>{" "}
            easily!🎉
          </Paragraph>
          <Row gap="8" justify="center">
            <CAButton>Get Started</CAButton>
            <Button theme={{ padding: "8" }}>Github</Button>
          </Row>
        </Column>
      </FlexLayout>
      <Box theme={{ height: "screen" }}>
        <Paragraph>
          No need to worry about CSS or semantic/A11y HTML as the toolkit
          handles that for us.
        </Paragraph>
        <Paragraph>
          CSS is generated dynamically at lightning speed using an incredibly
          small amount of code.
        </Paragraph>
        <Paragraph>
          It suggests the appropriate semantics or accessibility standards.
          (comming soon?)
        </Paragraph>

        <Code language="tsx">{basicUsage}</Code>
      </Box>
    </>
  );
  console.timeEnd("Home");
  return result;
};

export default Home;
