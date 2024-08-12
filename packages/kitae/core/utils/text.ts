export function getSelection() {
  if (typeof window === "undefined") return null;
  return window.getSelection();
}

export function createRange() {
  return document!.createRange();
}

export function isWrapWith(selection: Selection, tagName: string): boolean {
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  if (range.collapsed) return false;
  const tag = tagName.toUpperCase();
  // TODO: fix nested tags issue (e.g. <b><i>text</i></b>)
  if (range.commonAncestorContainer.nodeType !== Node.TEXT_NODE) {
    const ancestorTag = (range.commonAncestorContainer as Element).tagName;
    if (ancestorTag === tag) {
      return true;
    }
  } else if (range.commonAncestorContainer.parentElement?.tagName === tag) {
    return true;
  }
  return false;
}

export function canWrapWith(selection: Selection, tagName: string): boolean {
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  if (range.collapsed) return false;
  const tag = tagName.toUpperCase();
  if (range.commonAncestorContainer.nodeType !== Node.TEXT_NODE) {
    if ((range.commonAncestorContainer as Element).tagName === tag) {
      return false;
    }
  } else {
    if (
      range.commonAncestorContainer.parentElement?.tagName === tag ||
      range.commonAncestorContainer.parentNode?.nodeName === tag
    ) {
      return false;
    }
  }
  const fragment = range.cloneContents();
  const childNodes = Array.from(fragment.childNodes);
  if (
    childNodes.length > 1 &&
    !Array.from(fragment.childNodes).every(
      (node) => node.nodeType === Node.TEXT_NODE
    )
  ) {
    return false;
  }
  return true;
}

export function wrapWith(selection: Selection, tagName: string): boolean {
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  if (range.collapsed) return false;
  if (!canWrapWith(selection, tagName)) return false;
  const wrapper = document.createElement(tagName);
  range.surroundContents(wrapper);
  range.selectNode(wrapper.firstChild!);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}

function _unwrap(element: Element) {
  const parent = element.parentNode;
  while (element.firstChild) {
    parent?.insertBefore(element.firstChild, element);
  }
  parent?.removeChild(element);
}

export function unwrap(selection: Selection, tagName: string): boolean {
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  if (range.collapsed) return false;
  if (!isWrapWith(selection, tagName)) return false;
  const commonAncestor = range.commonAncestorContainer;
  const tag = tagName.toUpperCase();
  if (commonAncestor.nodeType !== Node.ELEMENT_NODE) {
    if (commonAncestor.parentElement?.tagName === tag) {
      _unwrap(commonAncestor.parentElement);
      // TODO: find a way to restore the right selection
      return true;
    }
    return false;
  } else if ((commonAncestor as Element).tagName === tag) {
    _unwrap(commonAncestor as Element);
    // TODO: find a way to restore the right selection
    return true;
  }
  const elts = (commonAncestor as Element).querySelectorAll(tagName);

  elts.forEach((elt) => {
    if (range.intersectsNode(elt)) {
      _unwrap(elt);
    }
  });
  // TODO: find a way to restore the right selection
  return true;
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
