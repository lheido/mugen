import { Box, FlexItem, Heading, List, Row, Text } from "mugen/ui";
import { Component } from "solid-js";

const Home: Component = () => {
  console.time("Home");
  const result = (
    <Box
      theme={{
        padding: "4",
      }}
    >
      <Heading as="h1">Mugen UI</Heading>
      <Text>
        An UI toolkit that provides low level components to build app faster and
        easier. Also bring to us a typed, but simple way to embrace design
        systems !
      </Text>
      <Text>
        No need to worry about CSS or semantic/A11y HTML as the toolkit handles
        that for us.
      </Text>
      <Text>
        CSS is generated dynamically at lightning speed using an incredibly
        small amount of code.
      </Text>
      <Text>
        It suggests the appropriate semantics or accessibility standards.
      </Text>

      <List
        theme={{ padding: "4" }}
        mixins={[Row.mixin({ gap: "4" })]}
        each={["1", "2", "3", "4", "5"]}
      >
        {(item, i) => (
          <Text
            mixins={[FlexItem.mixin({ grow: i() === 0 ? 1 : 0, basis: "3" })]}
          >
            {item}
          </Text>
        )}
      </List>
    </Box>
  );
  console.timeEnd("Home");
  return result;
};

export default Home;
