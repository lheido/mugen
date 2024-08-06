import { defaultBlocks } from "../blocks";
import { defaultCommands } from "./commands";
import { EditorConfig } from "./Config";

export const defaultEditorConfig: EditorConfig = {
  addNewBlock: {
    defaultType: "text",
    useModifierKey: "shiftKey",
    reverse: true,
  },
  commands: defaultCommands,
  defaultBlockValues: defaultBlocks.defaultValues,
};
