import { Node, NodeChildren, useNode } from "@kitae/core";
import { Box, Text } from "@mugen/core";
import { BlockAdd } from "./ui/BlockAdd";

export function createDefaultColumnsBlock() {
  return {
    data: {
      columns: "grid-cols-1",
    },
    children: [{ type: "text", data: { text: "New column", tag: "p" } }],
  };
}

export function ColumnsBlock() {
  const node = useNode();
  return (
    <Box
      class="grid gap-0"
      classList={{
        [node.data?.columns]: true,
      }}
    >
      <NodeChildren>{() => <Node />}</NodeChildren>
    </Box>
  );
}

export function EditableColumnsBlock() {
  const node = useNode();
  return (
    <Box as="section">
      <Box
        as="header"
        class="rounded-t-lg transition-all duration-300 bg-surface-1 text-surface-1-content px-4 py-2 flex justify-between items-center"
      >
        <Text># Columns</Text>

        <select
          class="px-4 py-1 bg-surface-variant text-surface-variant-content rounded outline-none border border-surface-variant focus:border-primary"
          onChange={(e) => {
            node.setState("data", "columns", e.currentTarget.value);
          }}
        >
          <option value="grid-cols-1">1</option>
          <option value="grid-cols-2">2</option>
          <option value="grid-cols-3">3</option>
          <option value="grid-cols-4">4</option>
          <option value="grid-cols-5">5</option>
          <option value="grid-cols-6">6</option>
        </select>
      </Box>
      <Box class="p-2 border border-t-0 border-surface-1 rounded-b-lg transition-all duration-300">
        <Box
          class="grid gap-1"
          classList={{
            [node.data?.columns]: true,
          }}
        >
          <NodeChildren>{() => <Node />}</NodeChildren>
        </Box>
      </Box>
      <Box as="aside" class="flex justify-center py-2">
        <BlockAdd />
      </Box>
    </Box>
  );
}
