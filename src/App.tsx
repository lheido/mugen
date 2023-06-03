import { ThemeDescription, ThemeElementApi } from "mugen/theme";
import { Box, Button, Image, Link, Row, Text } from "mugen/ui";
import { Component, For } from "solid-js";

import logo from "./logo.svg";

const reuseStyle: ThemeElementApi<ThemeDescription> = {
  padding: "4",
  background: "primary",
};

const App: Component = () => {
  return (
    <Box
      theme={{
        height: [, "screen"],
        background: "primary",
        color: "primary-content",
        sm: {
          background: "secondary",
          color: "secondary-content",
        },
      }}
    >
      <Box
        as="header"
        theme={{
          padding: "2",
        }}
      >
        <Box theme={{ height: "5" }}>
          <Image src={logo} width="200" height="200" />
        </Box>
        <Box theme={{ height: "5", overflow: "scroll" }}>
          <For each={Array.from({ length: 5 })}>
            {() => (
              <Text theme={reuseStyle}>
                Edit <code>src/App.tsx</code> and save to reload.
              </Text>
            )}
          </For>
        </Box>
        <Row
          gap="4"
          content="around"
          items="center"
          theme={{ background: "primary", padding: "4" }}
        >
          <Row
            as={Link}
            href="https://github.com/solidjs/solid"
            target="_blank"
            rel="noopener noreferrer"
            gap="2"
            content="center"
            items="center"
            theme={{
              height: "5",
              width: "5",
              background: "primary-focus",
              color: "primary-content",
              rounded: "full",
            }}
          >
            <Text as="span">Learn Solid</Text>
            <Text as="span">&gt;</Text>
          </Row>
          <Button
            theme={{
              padding: ["4", "2"],
              background: "secondary",
              color: "secondary-content",
              rounded: "3",
              hover: {
                background: "secondary-focus",
              },
              sm: {
                background: "primary",
                color: "primary-content",
                hover: {
                  background: "primary-focus",
                },
              },
            }}
            onClick={() => console.log("Clicked")}
          >
            I'm a button !
          </Button>
        </Row>
      </Box>
    </Box>
  );
};

export default App;
