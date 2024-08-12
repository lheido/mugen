import { Accessor, getOwner, runWithOwner } from "solid-js";
import { useEditorConfig } from "./Config";

export type EditorCommand = {
  description?: string;
  execute: Function;
};

export type EditorCommands = {
  commands: Record<string, EditorCommand>;
};

/**
 * Helper function to execute a command with the right solid-js context (owner).
 */
export function useCommand(command: Accessor<string> | string) {
  const owner = getOwner();
  const config = useEditorConfig();
  return (...args: any[]) => {
    const cmd = typeof command === "function" ? command() : command;
    if (import.meta.env.DEV) {
      if (!config?.commands?.[cmd]) {
        console.warn(`KitaeEditor Warning : Command "${cmd}" not found.`);
      }
    }
    runWithOwner(owner, () => {
      config?.commands?.[cmd]?.execute(...args);
    });
  };
}
