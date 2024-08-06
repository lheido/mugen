export type EditorCommand = {
  shortcut?: string;
  description?: string;
  execute: Function;
};

export type EditorCommands = {
  commands: Record<string, EditorCommand>;
};
