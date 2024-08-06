import { Accessor, createContext, FlowProps, useContext } from "solid-js";
import { EditorCommands } from "./Commands";

export type EditorConfig = {
  addNewBlock?: {
    defaultType?: string;
    useModifierKey?: false | "ctrlKey" | "altKey" | "metaKey" | "shiftKey";
    /**
     * Add the new block using the modifier key and add new line without the modifier key.
     * Or reverse the behavior.
     */
    reverse?: boolean;
  };
  commands?: EditorCommands["commands"];
  defaultBlockValues?: Record<string, Accessor<any>>;
};

const EditorConfigContext = createContext<EditorConfig>();

export function EditorConfigProvider(
  props: FlowProps<{ config: EditorConfig }>
) {
  return (
    <EditorConfigContext.Provider value={props.config}>
      {props.children}
    </EditorConfigContext.Provider>
  );
}

export function useEditorConfig() {
  return useContext(EditorConfigContext);
}
