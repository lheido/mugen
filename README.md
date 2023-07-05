# Mugen

![](https://badgen.net/github/licence/lheido/mugen?label=licence)
![](https://badgen.net/github/release/lheido/mugen)
![](https://badgen.net/github/stars/lheido/mugen?label=★)
![](https://badgen.net/github/open-issues/lheido/mugen)
![](https://badgen.net/github/dependabot/lheido/mugen?label=&icon=dependabot)


An UI toolkit that provides low level components to build app faster and easier.
Also bring to us a typed, but simple way to embrace design systems !

No need to worry about CSS or semantic/A11y HTML as the toolkit handles that for us.

* CSS is generated dynamically at lightning speed using an incredibly small amount of code.
* It suggests the appropriate semantics or accessibility standards (comming soon).


## Setup

TODO

```typescript
// src/theme.ts
import { themeDescriptionDefaults } from "mugen/theme";

const theme = themeDescriptionDefaults;
```

```typescript
// src/mugen.d.ts
import { theme } from "./theme";

declare module "mugen/theme" {
  type ThemeDescription = typeof theme;
}
```

## Usage

```tsx
import { Box, List, Row, FlexItem, Text } from "mugen/ui"

function MyComponent() {
  return (
    <Box theme={{ padding: "4", hover: { padding: "6" }, transition: "all" }}>
      <List mixins={[Row.mixin({ gap: "4" })]} each={["1", "2", "3", "4", "5"]}>
        {(item, i) => (
          <Text
            theme={{
              background: "primary",
              rounded: "4xl",
              padding: { x: "6", y: "4" },
            }}
            mixins={[FlexItem.mixin({ grow: i() === 0 ? 1 : 0, basis: "4" })]}
          >
            {item}
          </Text>
        )}
      </List>
    </Box>
  );
}
```
