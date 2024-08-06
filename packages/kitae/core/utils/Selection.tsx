import { Accessor, createSignal, onCleanup, onMount } from "solid-js";
import { getSelection } from "./text";

export function observeSelection(
  container: HTMLElement | Accessor<HTMLElement | undefined> | undefined
) {
  const [selection, setSelection] = createSignal<Selection | null>(null, {
    equals: false,
  });

  const getContainer = () =>
    typeof container === "function" ? container() : container;

  const onSelectionChange = () => {
    const elt = getContainer();
    const selection = getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (elt && elt.contains(range.commonAncestorContainer)) {
        setSelection(selection);
        return;
      }
    }
    setSelection(null);
  };

  onMount(() => {
    document.addEventListener("selectionchange", onSelectionChange);
    onCleanup(() => {
      document.removeEventListener("selectionchange", onSelectionChange);
    });
  });

  return selection;
}
