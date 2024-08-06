import { produce } from "solid-js/store";
import { NodePath, useNode } from "../../tree";
import { EditorCommand } from "../Commands";
import { useEditorConfig } from "../Config";
import { useHistory } from "../History";

export type RemoveBlockData = {
  path: NodePath;
};

export default {
  execute: () => {
    const node = useNode();
    const history = useHistory();
    const config = useEditorConfig();
    if (!node) return;
    const path = node.path;
    const index = path[path.length - 1];
    node.parent?.setState(
      produce((draft) => {
        draft.children = draft.children?.filter((_, i) => i !== index) ?? [];
      })
    );
    history?.push({
      type: "remove-block",
      data: {
        path,
      } satisfies RemoveBlockData,
    });
    config?.commands?.focus?.execute(Math.max(0, index - 1));
  },
} satisfies EditorCommand;
