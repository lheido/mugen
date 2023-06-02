import { Box, Button, Image, Link, Text } from "mugen/ui";
import { Component, For } from "solid-js";

import logo from "./logo.svg";
import { AppTheme } from "./theme";

const buttonTheme = AppTheme.build({
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
});

const reuseStyle = AppTheme.build({
  padding: "4",
  background: "primary",
});

const App: Component = () => {
  return (
    <Box
      theme={AppTheme.build({
        height: [, "screen"],
        background: "primary",
        color: "primary-content",
        sm: {
          background: "secondary",
          color: "secondary-content",
        },
      })}
    >
      <Box
        as="header"
        theme={AppTheme.build({
          padding: "2",
        })}
      >
        <Image src={logo} width={200} height={200} />
        <For each={Array.from({ length: 5 })}>
          {() => (
            <Text theme={reuseStyle}>
              Edit <code>src/App.tsx</code> and save to reload.
            </Text>
          )}
        </For>
        <Link
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </Link>
        <Button theme={buttonTheme} onClick={() => console.log("Clicked")}>
          I'm a button !
        </Button>
      </Box>
    </Box>
  );
};

export default App;
