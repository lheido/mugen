import { Box, Modifier, Text, darkTheme } from "@mugen/theme";
import { onMount, type Component } from "solid-js";

const App: Component = () => {
  onMount(() => {
    document.body.classList.add(darkTheme);
  });

  return (
    <Box
      modifier={Modifier.surface("primary")
        .relative()
        .spacing({ top: 10, bottom: 6 })
        .spacing({ x: 4 })
        .gap(16)
        .justify("space-between")
        .align("center")}
    >
      <Text modifier={Modifier.surface("warning").fill().spacing(2)}>
        Lorem ipsum
      </Text>
      <Text modifier={Modifier.surface("secondary").spacing(2)}>
        dolore sit amet
      </Text>
    </Box>
  );
};

export default App;
