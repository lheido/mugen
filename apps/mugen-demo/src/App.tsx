import { Box, List, Text } from "@mugen/core";
import { type Component } from "solid-js";

const App: Component = () => {
  // const items = Array.from({ length: 5000 }, (_, i) => i + 1);
  const items = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <>
      <Box
        as="header"
        class="bg-primary sticky top-0 text-primary-content rounded-b-xl px-4 pt-10 pb-4 md:pt-16 gap-4 md:gap-10 lg:gap-16 flex content-between items-center"
      >
        <Box
          onClick={() => console.log("click!")}
          class="bg-primary-variant rounded-lg px-4 py-2"
        >
          Lorem ipsum
        </Box>
        <Box class="border border-primary-border rounded-lg px-4 py-2">
          dolore sit amet
        </Box>
      </Box>
      <List each={items} class="p-4 flex flex-col gap-3">
        {(item, index) => (
          <Box class="bg-surface-1 text-surface-1-content rounded-lg p-4 flex gap-4 items-center group">
            <Box class="bg-primary border border-primary-content group-odd:bg-primary-variant rounded-full p-4 aspect-square" />
            <Text class="text-lg flex-1 bg-gray-100 rounded px-4 py-2">
              {`Item ${item}, index ${index()}`}
            </Text>
          </Box>
        )}
      </List>
    </>
  );
};

export default App;
