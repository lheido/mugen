export function getSelection() {
  return window.getSelection();
}

export function createRange() {
  return document.createRange();
}

export function wrapSelection(node: Node, keepSelection = true): boolean {
  const selection = getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  if (range.collapsed) return false;
  try {
    range.surroundContents(node);
  } catch (error) {
    const fragment = range.extractContents();
    node.appendChild(fragment);
    range.insertNode(node);
  }
  if (keepSelection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
  return true;
}

export function isSelectionWrappedBy(node: string) {
  const selection = getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  if (range.collapsed) return false;

  let startNode: Node | null = range.startContainer;
  while (startNode && startNode !== range.commonAncestorContainer) {
    if (
      startNode.nodeType === Node.ELEMENT_NODE &&
      (startNode as Element).tagName === "B"
    ) {
      return true;
    }
    startNode = startNode.parentNode;
  }

  let endNode: Node | null = range.endContainer;
  while (endNode && endNode !== range.commonAncestorContainer) {
    if (
      endNode.nodeType === Node.ELEMENT_NODE &&
      (endNode as Element).tagName === "B"
    ) {
      return true;
    }
    endNode = endNode.parentNode;
  }

  if (
    range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE &&
    (range.commonAncestorContainer as Element).tagName === "B"
  ) {
    return true;
  }

  return false;
}

export function isCaretAtEnd(element: HTMLElement): boolean {
  const position = getCaretPosition(element);
  const elementSize = element.textContent?.length ?? 0;
  return position === elementSize;
}

export function isCaretAtStart(element: HTMLElement): boolean {
  const position = getCaretPosition(element);
  const elementSize = element.textContent?.length ?? 0;
  return position === 0 && elementSize > 0;
}

export function getCaretPosition(element: HTMLElement): number {
  let position = 0;
  const selection = window.getSelection();

  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    position = preCaretRange.toString().length;
  }

  return position;
}
