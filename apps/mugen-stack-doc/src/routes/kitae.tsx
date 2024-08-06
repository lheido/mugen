import {
  defaultBlocks,
  defaultCommands,
  defaultEditorConfig,
  KitaeEditor,
  KitaeRenderer,
  NodeData,
  NodeTypeContextValue,
} from "@kitae/core";
import { Box, Text } from "@mugen/core";
import {
  ColumnsBlock,
  createDefaultColumnsBlock,
  EditableColumnsBlock,
} from "~/blocks/Columns";
import { EditableTextBlock, TextBlock } from "~/blocks/Text";

export default function Kitae() {
  const data = [
    {
      type: "columns",
      data: {
        columns: "grid-cols-1",
      },
      children: [
        {
          type: "text",
          data: { text: "A block editor!", tag: "p" },
        },
        {
          type: "text",
          data: { text: "Another text block", tag: "p" },
        },
      ],
    },
  ] satisfies NodeData[];
  const editableBlocks = {
    text: EditableTextBlock,
    columns: EditableColumnsBlock,
  } satisfies NodeTypeContextValue;
  const rendererBlocks = {
    text: TextBlock,
    columns: ColumnsBlock,
  } satisfies NodeTypeContextValue;
  const defaultValues = {
    ...defaultBlocks.defaultValues,
    columns: createDefaultColumnsBlock,
  };
  const commands = defaultCommands;
  return (
    <Box
      as="main"
      class="px-4 max-md:flex max-md:flex-col lg:grid lg:grid-cols-2 flex-1 gap-6"
    >
      <Box>
        <Box as="h1" class="text-center font-thin text-4xl px-3 pt-16 pb-8">
          <Text>Weekend Challenge</Text>
        </Box>
        <KitaeEditor
          data={data}
          blocks={editableBlocks}
          config={{
            ...defaultEditorConfig,
            defaultBlockValues: defaultValues,
            commands,
          }}
        />
      </Box>
      <Box class="border border-surface-1 max-md:flex-1">
        <Box
          as="h2"
          class="text-center text-xl p-2 bg-surface-1 text-surface-1-content"
        >
          <Text>Preview</Text>
        </Box>
        <KitaeRenderer data={data} blocks={rendererBlocks} />
      </Box>
    </Box>
  );
}
