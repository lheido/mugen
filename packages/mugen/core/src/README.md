# @mugen/core

Provides:

- Directives and unstyled components for accessibility and semantic.
- Convenient providers for many common use cases.

## Installation

```bash
pnpm add @mugen/core
```

## Usage

```tsx
import { Box, List, Text } from "@mugen/core";

function App() {
  const items = [1, 2, 3];
  return (
    <Box as="main">
      <Text as="h1">Hello, world!</Text>
      <List each={items}>
        {(item) => (
          <Box>
            <Text>Item {item}</Text>
          </Box>
        )}
      </List>
    </Box>
  );
}
```
