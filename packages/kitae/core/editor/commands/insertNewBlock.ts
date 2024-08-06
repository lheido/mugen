import { produce } from "solid-js/store";
import { NodeData, NodePath, useNode } from "../../tree";
import { EditorCommand } from "../Commands";
import { useEditorConfig } from "../Config";
import { useHistory } from "../History";

export type InsertNewBlockData = {
  path: NodePath;
  newNode: NodeData;
};

export default {
  execute: (caret?: { position: number; start: boolean; end: boolean }) => {
    const node = useNode();
    const history = useHistory();
    const config = useEditorConfig();
    const defaultType = config?.addNewBlock?.defaultType;
    if (!node || !defaultType) return;
    const defaultBlockValue =
      config.defaultBlockValues?.[defaultType]?.() ?? {};
    const path = node.path;
    const newNode = { type: defaultType, ...defaultBlockValue };
    const before = caret?.start && !caret?.end;
    const newIndex = path[path.length - 1] + (before ? 0 : 1);
    node.parent?.setState(
      produce((draft) => {
        const children = [...(draft.children ?? [])];
        children.splice(newIndex, 0, newNode);
        draft.children = children;
      })
    );
    history?.push({
      type: "insert-new-block",
      data: {
        path,
        newNode,
      } satisfies InsertNewBlockData,
    });
    config?.commands?.focus?.execute(newIndex);
  },
} satisfies EditorCommand;
