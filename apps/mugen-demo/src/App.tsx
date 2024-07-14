import { Box, List, Text } from "@mugen/core";
import { type Component } from "solid-js";

const App: Component = () => {
  // const items = Array.from({ length: 5000 }, (_, i) => i + 1);
  const items = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <>
      <Box
        as="header"
        class="bg-surface-variant sticky top-0 text-surface-variant-content rounded-b-xl px-4 pt-10 pb-4 md:pt-16 gap-4 md:gap-10 lg:gap-16 grid grid-cols-2 content-between items-center"
      >
        <Box class="p-4 flex gap-4">
          <Box onClick={() => console.log("click!")} class="btn rounded-lg">
            Default btn
          </Box>
          <Box
            onClick={() => console.log("click!")}
            class="btn btn-main rounded-lg"
          >
            Main btn
          </Box>
          <Box
            onClick={() => console.log("click!")}
            class="btn btn-accent rounded-lg"
          >
            Accent btn
          </Box>
          <Box
            onClick={() => console.log("click!")}
            class="btn bg-gradient-to-r from-primary-variant to-accent-variant rounded-lg px-6"
          >
            <Box class="text-primary-variant-content">CTA btn</Box>
          </Box>
        </Box>
        <Box class="bg-surface p-4 flex gap-4">
          <Box onClick={() => console.log("click!")} class="btn rounded-lg">
            Default btn
          </Box>
          <Box
            onClick={() => console.log("click!")}
            class="btn btn-main rounded-lg"
          >
            Main btn
          </Box>
          <Box
            onClick={() => console.log("click!")}
            class="btn btn-accent rounded-lg"
          >
            Accent btn
          </Box>
        </Box>
        <Box class="bg-primary p-4 flex gap-4">
          <Box onClick={() => console.log("click!")} class="btn rounded-lg">
            Default btn
          </Box>
          <Box
            onClick={() => console.log("click!")}
            class="btn btn-main rounded-lg"
          >
            Main btn
          </Box>
          <Box
            onClick={() => console.log("click!")}
            class="btn btn-accent rounded-lg"
          >
            Accent btn
          </Box>
        </Box>
        <Box class="bg-accent p-4 flex gap-4">
          <Box onClick={() => console.log("click!")} class="btn rounded-lg">
            Default btn
          </Box>
          <Box
            onClick={() => console.log("click!")}
            class="btn btn-main rounded-lg"
          >
            Main btn
          </Box>
          <Box
            onClick={() => console.log("click!")}
            class="btn btn-accent rounded-lg"
          >
            Accent btn
          </Box>
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
