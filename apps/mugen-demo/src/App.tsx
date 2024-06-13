import { Box } from "@mugen/theme";
import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <Box surface="error" style={{ padding: "1rem" }}>
      <header>
        <Box as="p" surface="primaryLight" style={{ padding: "1rem" }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Box>
        <Box as="p" surface="primary" style={{ padding: "1rem" }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Box>
        <Box as="p" surface="primaryDark" style={{ padding: "1rem" }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Box>
        <Box as="p" surface="secondaryLight" style={{ padding: "1rem" }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Box>
        <Box as="p" surface="secondary" style={{ padding: "1rem" }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Box>
        <Box as="p" surface="secondaryDark" style={{ padding: "1rem" }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Box>
        <Box as="p" surface="baseLight" style={{ padding: "1rem" }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Box>
        <Box as="p" surface="base" style={{ padding: "1rem" }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Box>
        <Box as="p" surface="baseDark" style={{ padding: "1rem" }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Box>
        <a
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </Box>
  );
};

export default App;
