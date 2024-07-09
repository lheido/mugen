# @mugen/theme

This package provides theme utilities on top of Tailwind CSS.

## Installation

```bash
pnpm add @mugen/theme
```

```ts
import { mugenThemePlugin } from "@mugen/theme/tailwindcss";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  plugins: [
    mugenThemePlugin({
      themes: {
        light: {
          primary: "#9289FF",
          surface: "#EEEEEE",
          "surface-1": "#DDDDDD",
        },
        dark: {
          primary: "#9289FF",
          surface: "#222222",
          "surface-1": "#333333",
        },
      },
    }),
  ],
} satisfies Config;
```

## Usage

```tsx
import { Box, Text } from "@mugen/core";

function MyComponent(props) {
  return (
    <Box class="bg-surface text-surface-content p-4 rounded">
      <Text>Hello, world!</Text>
    </Box>
  );
}
```
