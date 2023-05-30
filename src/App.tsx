import { Box, Button, Image, Link } from "mugen/ui";
import { Component, For } from "solid-js";

import logo from "./logo.svg";
import { AppTheme } from "./theme";

const App: Component = () => {
  return (
    <Box
      theme={AppTheme.build({
        padding: "4",
        background: "primary",
        color: "primary-content",
        hover: {
          background: "primary-focus",
        },
      })}
    >
      <Box
        tag="header"
        theme={AppTheme.build({
          padding: "2",
        })}
      >
        <Image src={logo} width={200} height={200} />
        <For each={Array.from({ length: 100 })}>
          {() => (
            <Box
              theme={AppTheme.build({
                padding: "4",
                height: "4",
              })}
            >
              Edit <code>src/App.tsx</code> and save to reload.
            </Box>
          )}
        </For>
        <Link
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </Link>
        <Button onClick={() => console.log("Clicked")}>I'm a button !</Button>
      </Box>
    </Box>
  );
};

export default App;
