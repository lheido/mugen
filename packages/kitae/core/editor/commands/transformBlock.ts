import { produce, unwrap } from "solid-js/store";
import { NodeData, NodePath, useNode } from "../../tree";
import { EditorCommand } from "../Commands";
import { useEditorConfig } from "../Config";
import { useHistory } from "../History";

export type TransformBlock = {
  path: NodePath;
  previous: NodeData;
  next: NodeData;
};

export default {
  execute: (type: string) => {
    const node = useNode();
    const history = useHistory();
    const config = useEditorConfig();
    if (!node) return;
    const path = node.path;
    const defaultBlockValue = config?.defaultBlockValues?.[type]?.() ?? {};
    const newNode: NodeData = { type, ...defaultBlockValue };
    const previous = unwrap(node.state);
    const index = path[path.length - 1];
    node.parent?.setState(
      produce((draft) => {
        const children = draft.children ?? [];
        children.splice(index, 1, newNode);
        draft.children = children;
      })
    );
    history?.push({
      type: "transform-block",
      data: {
        path,
        previous,
        next: defaultBlockValue,
      } satisfies TransformBlock,
    });
    config?.commands?.focus?.execute(index);
  },
} satisfies EditorCommand;
