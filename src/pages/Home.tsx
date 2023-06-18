import { Box, Column, List, Row, Text } from "mugen/ui";
import { Component } from "solid-js";

const Home: Component = () => {
  return (
    <Box
      theme={{
        padding: "4",
      }}
    >
      <Box
        as="h1"
        theme={{
          background: "primary",
          padding: "2",
          rounded: "2",
          sticky: { top: "4" },
        }}
      >
        Mugen UI Toolkit - Expérimentation.
      </Box>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quas
        ratione nostrum! Adipisci mollitia illum vel architecto optio. Molestias
        eaque, sunt officiis molestiae eius similique culpa quisquam omnis fugit
        saepe?
      </Text>
      <Row gap="8" content="evenly" theme={{ padding: "8" }}>
        <List
          theme={{ padding: ["8"] }}
          bullet
          each={["lorem", "ipsum", "dolor", "sit", "amet"]}
        >
          {(item) => <Text>{item}</Text>}
        </List>
        <List
          theme={{ padding: ["8"] }}
          mixins={[Column.mixin({ gap: "4", reverse: true })]}
          each={Array.from({ length: 5 }, (_, i) => i)}
        >
          {(item) => (
            <Text theme={{ padding: { x: "4" } }}>{`item ${item}`}</Text>
          )}
        </List>
      </Row>
      <List
        theme={{ padding: ["8"], height: { _: "5" }, overflow: [, "scroll"] }}
        each={Array.from({ length: 50 }, (_, i) => i)}
        minItemHeight={24}
      >
        {(item) => (
          <Text theme={{ padding: { x: "4" } }}>{`item ${item}`}</Text>
        )}
      </List>
    </Box>
  );
};

export default Home;
