import { useEditorConfig } from "@kitae/core";
import { Box, Text } from "@mugen/core";
import { getOwner, runWithOwner } from "solid-js";

export function BlockAdd() {
  const config = useEditorConfig();
  const owner = getOwner();
  return (
    <Box
      class="p-4 rounded border border-transparent focus:border-primary w-5 h-5 leading-[0] font-thin flex items-center justify-center outline-none"
      onClick={() => {
        runWithOwner(owner, () => {
          config?.commands?.insertNewBlock?.execute();
        });
      }}
    >
      <Text class="text-xl">+</Text>
    </Box>
  );
}
