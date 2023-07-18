import type { Component } from "solid-js";

import { useRoutes } from "@solidjs/router";
import { Box, Column, FlexItem, Heading, List, Row, Text } from "mugen/ui";
import { routes } from "./app.routing";

const categories = [
  "General",
  "Layout",
  "Typography",
  "Navigation",
  "Feedback",
  "Overlay",
  "Others",
];

const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <Row>
      <Column
        as="aside"
        theme={{
          background: "primary",
          height: { min: "screen" },
        }}
      >
        <List
          each={categories}
          theme={{ sticky: { top: "64" } }}
          mixins={[Column.mixin({})]}
        >
          {(category) => (
            <Text
              theme={{
                padding: { x: "20", y: "4" },
                font: { weight: "medium" },
              }}
            >
              {category}
            </Text>
          )}
        </List>
        {/* <Row
          gap="1"
          theme={{
            fixed: { bottom: "0" },
            padding: "4",
          }}
        >
          <Image src="https://badgen.net/github/license/lheido/mugen" />
          <Image src="https://badgen.net/github/release/lheido/mugen" />
          <Image src="https://badgen.net/github/stars/lheido/mugen?label=★" />
        </Row> */}
      </Column>
      <Box as="header" theme={{ relative: true }}>
        <Box theme={{ sticky: { top: "0" }, zIndex: 1 }}>
          <Box href="/">
            <Heading
              as="h1"
              theme={{
                font: {
                  size: "base",
                  weight: "black",
                },
                absolute: { top: "14", left: "0" },
                width: "max",
                color: {
                  direction: "right",
                  from: "page",
                  to: "primary",
                  fromOffset: "50",
                  toOffset: "50",
                },
                transform: {
                  translate: {
                    x: "-1/2",
                  },
                  scale: "600",
                },
              }}
            >
              Mugen
            </Heading>
          </Box>
        </Box>
      </Box>
      <FlexItem as="main" grow={1} theme={{ relative: true }}>
        <Routes />
      </FlexItem>
    </Row>
  );
};

export default App;
