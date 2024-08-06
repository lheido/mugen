import { useNodeChildren } from "../../tree";
import { EditorCommand } from "../Commands";

export default {
  execute: (index: number) => {
    const parentChildren = useNodeChildren();
    setTimeout(() => {
      const elt = parentChildren?.().find((_, i) => i === index)?.ref;
      if (elt) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(elt);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
        elt.focus();
      }
    });
  },
} satisfies EditorCommand;
