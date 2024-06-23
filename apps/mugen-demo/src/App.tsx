import { Box, Modifier, Text, darkTheme, useBreakpoints } from "@mugen/theme";
import { onMount, type Component } from "solid-js";

const App: Component = () => {
  const breakpoints = useBreakpoints();

  onMount(() => {
    document.body.classList.add(darkTheme);
  });

  const textModifier = Modifier.fill().spacing({ x: 6, y: 2 }).rounded("lg");

  return (
    <Box
      modifier={Modifier.surface("primary")
        .relative()
        .spacing({ top: 10, bottom: 6 })
        .spacing({ x: 4 })
        .direction(breakpoints.sm ? "row" : "column")
        .gap(breakpoints.md ? 16 : 4)
        .justify("space-between")
        .align("center")}
    >
      <Text modifier={textModifier.clone().surface("warning")}>
        Lorem ipsum
      </Text>
      <Text modifier={textModifier.clone().surface("secondary")}>
        dolore sit amet
      </Text>
    </Box>
  );
};

export default App;
