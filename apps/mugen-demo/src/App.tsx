import { Box, Modifier, Text, darkTheme, useBreakpoints } from "@mugen/theme";
import { onMount, type Component } from "solid-js";

const App: Component = () => {
  const breakpoints = useBreakpoints();

  onMount(() => {
    document.body.classList.add(darkTheme);
  });

  const textModifier = Modifier.spacing({
    left: 6,
    right: 6,
    top: 2,
    bottom: 2,
  }).rounded("lg");
  return (
    <Box
      modifier={Modifier.surface("primary")
        .rounded({ bottomLeft: "xl", bottomRight: "xl" })
        .relative()
        .spacing({ left: 4, right: 4, top: 10, bottom: 6, md: { top: 16 } })
        .gap(4)
        .gap({ md: 10, lg: 16 })
        .justify("space-between")
        .align("center")}
    >
      <Text modifier={textModifier.clone().fill().surface("warning")}>
        Lorem ipsum
      </Text>
      <Text
        modifier={textModifier
          .clone()
          .surface("secondary")
          .absolute({ top: 4, left: 4 })}
      >
        dolore sit amet
      </Text>
    </Box>
  );
};

export default App;
