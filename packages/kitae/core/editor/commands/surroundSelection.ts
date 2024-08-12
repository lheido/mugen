import { TextBlockData, useText } from "../../blocks";
import { NodePath, useNode } from "../../tree";
import { isWrapWith, unwrap, wrapWith } from "../../utils";
import { cleanHTML } from "../../utils/html";
import { EditorCommand } from "../Commands";
import { useHistory } from "../History";

export type SurroundSelectionData = {
  tag: string;
  path: NodePath;
  previous: string;
  next: string;
};

export default {
  execute: (tag: string) => {
    const node = useNode<TextBlockData>();
    const history = useHistory();
    const text = useText();
    if (!node || !text) return;
    if (!text.selection) return;
    if (isWrapWith(text?.selection, tag)) {
      unwrap(text?.selection, tag);
    } else {
      wrapWith(text?.selection, tag);
    }
    const previous = node?.data.text;
    const next = cleanHTML(node?.ref?.innerHTML ?? "", false);
    node?.setState("data", "text", next);
    history?.push({
      type: "surround-selection",
      data: {
        tag,
        path: node?.path,
        previous,
        next,
      } satisfies SurroundSelectionData,
    });
  },
} satisfies EditorCommand;
