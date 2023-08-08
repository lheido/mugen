import { Box, Column, FlexLayout, Paragraph } from "mugen/ui";
import { Component } from "solid-js";
import appCode from "../App.tsx?raw";
import { Button } from "../components/Button";
import { CAButton } from "../components/CAButton";
import { Code } from "../components/Code";
import { H1 } from "../components/H1";
import basicUsage from "../examples/basic_usage.tsx?raw";

const Home: Component = () => {
  console.time("Home");
  const result = (
    <>
      <FlexLayout
        justify="center"
        items="center"
        theme={{
          height: { min: "hscreen" },
          padding: { bottom: "16", top: "44" },
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
        <Column
          gap="16"
          theme={{
            padding: "10",
            zIndex: 1,
            md: {
              width: { value: "2/3", max: "wscreen" },
              margin: "auto",
            },
          }}
        >
          <Paragraph
            theme={{ font: { size: "3xl" }, md: { font: { size: "6xl" } } }}
          >
            An <strong>UI toolkit</strong> that provides low level components to
            build app faster and easier.
          </Paragraph>
          <Paragraph
            theme={{ font: { size: "2xl" }, md: { font: { size: "5xl" } } }}
          >
            It provides a typed way to adopt <strong>design systems</strong>{" "}
            easily!🎉
          </Paragraph>
          <Box
            theme={{
              flex: { gap: "4", justify: "center" },
              md: { flex: { gap: "8" } },
            }}
          >
            <CAButton href="#get-started">Get Started</CAButton>
            <Button href="https://github.com/lheido/mugen" target="_blank">
              Github
            </Button>
          </Box>
        </Column>
      </FlexLayout>
      <Column
        gap="16"
        theme={{
          height: { min: "hscreen" },
          relative: true,
          padding: { top: "0", left: "0", right: "0" },
          background: {
            to: "pageTo",
            from: "page",
            direction: "top",
          },
          border: {
            top: {
              color: "primary",
              width: "16",
            },
            width: "0",
          },
          md: {
            padding: { top: "64", left: "48", right: "48" },
          },
        }}
        id="get-started"
      >
        <Column
          gap="8"
          theme={{ background: "accent", padding: "4", rounded: "lg" }}
        >
          <Paragraph theme={{ md: { font: { size: "2xl" } } }}>
            No need to worry about CSS or semantic/A11y HTML as the toolkit
            handles that for us.
          </Paragraph>
          <Box
            theme={{
              flex: {
                gap: "8",
                direction: "column",
              },
              md: {
                flex: {
                  direction: "row",
                },
              },
            }}
          >
            <Paragraph
              theme={{
                padding: "4",
                background: "page",
                rounded: "lg",
                font: { size: "lg" },
              }}
            >
              CSS is generated dynamically at lightning speed using an
              incredibly small engine.
            </Paragraph>
            <Paragraph
              theme={{
                padding: "4",
                background: "page",
                rounded: "lg",
                font: { size: "lg" },
              }}
            >
              It suggests the appropriate semantics or accessibility standards.
              (TODO)
            </Paragraph>
          </Box>
        </Column>

        <Column as="section" gap="4">
          <H1>Install the package</H1>
          <Code language="bash">{"pnpm install mugen"}</Code>
        </Column>
        <Column as="section" gap="4">
          <H1>Basic usage</H1>
          <Code language="tsx">{basicUsage}</Code>
        </Column>
        <Paragraph>Site under construction</Paragraph>
      </Column>
    </>
  );
  console.timeEnd("Home");
  return result;
};

export default Home;
