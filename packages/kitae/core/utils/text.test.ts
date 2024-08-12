import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { canWrapWith, unwrap, wrapWith } from "./text";

describe("kitae/core/utils/text", () => {
  let container: HTMLElement;
  let selection: Selection | null;
  let range: Range;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    range = document.createRange();
    selection = getSelection();
    selection?.removeAllRanges();
  });
  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("getSelection", () => {
    it("should return the selection when there is a selection", () => {
      container.innerHTML = "hello world";
      range.setStart(container.firstChild!, 0);
      range.setEnd(container.firstChild!, 5);
      selection?.addRange(range);
      expect(getSelection()).toBe(selection);
    });
  });
  describe("canWrapWith", () => {
    it("should return true when the selection is not wrapped by the given tag", () => {
      container.innerHTML = "hello world";
      range.setStart(container.firstChild!, 0);
      range.setEnd(container.firstChild!, 5);
      selection?.addRange(range);
      expect(canWrapWith(selection!, "span")).toBe(true);
    });
    it("should return false when the selection is wrapped by the given tag", () => {
      container.innerHTML = "<span>hello world</span>";
      range.setStart(container.firstChild!.firstChild!, 0);
      range.setEnd(container.firstChild!.firstChild!, 5);
      selection?.addRange(range);
      expect(canWrapWith(selection!, "span")).toBe(false);
    });
  });
  describe("isWrapWith", () => {
    it("should return true when the selection is wrapped by the given tag", () => {
      container.innerHTML = "<span>hello world</span>";
      range.setStart(container.firstChild!.firstChild!, 0);
      range.setEnd(container.firstChild!.firstChild!, 5);
      selection?.addRange(range);
      expect(canWrapWith(selection!, "span")).toBe(false);
    });
    it("should return false when the selection is not wrapped by the given tag", () => {
      container.innerHTML = "hello world";
      range.setStart(container.firstChild!, 0);
      range.setEnd(container.firstChild!, 5);
      selection?.addRange(range);
      expect(canWrapWith(selection!, "span")).toBe(true);
    });
  });
  describe("wrapWith", () => {
    it("should wrap the selection with the given node", () => {
      container.innerHTML = "hello world";
      range.setStart(container.firstChild!, 0);
      range.setEnd(container.firstChild!, 5);
      selection?.addRange(range);
      wrapWith(selection!, "span");
      expect(container.innerHTML).toBe("<span>hello</span> world");
    });
    it("should wrap the selection containing HTML content", () => {
      container.innerHTML = "<b>hello</b> world";
      range.setStart(container.firstChild!.firstChild!, 0);
      range.setEnd(container.firstChild!.firstChild!, 5);
      selection?.addRange(range);
      wrapWith(selection!, "span");
      expect(container.innerHTML).toBe("<b><span>hello</span></b> world");
    });
    it("should wrap a partial selection of HTML content", () => {
      container.innerHTML = "<b>hello</b> world";
      range.setStart(container.firstChild!.firstChild!, 2);
      range.setEnd(container.firstChild!.firstChild!, 4);
      selection?.addRange(range);
      wrapWith(selection!, "span");
      expect(container.innerHTML).toBe("<b>he<span>ll</span>o</b> world");
    });
    it("should not wrap a selection that includes text nodes and HTML elements", () => {
      container.innerHTML = "hello <b>world</b>";
      range.setStart(container.firstChild!, 2);
      range.setEnd(container.lastChild!.firstChild!, 3);
      selection?.addRange(range);
      expect(wrapWith(selection!, "span")).toBe(false);
    });
    it("should keep the selection intact", () => {
      container.innerHTML = "hello world";
      range.setStart(container.firstChild!, 0);
      range.setEnd(container.firstChild!, 5);
      selection?.addRange(range);
      wrapWith(selection!, "span");
      expect(selection?.toString()).toBe("hello");
    });
  });
  describe("unwrap", () => {
    it("should unwrap the selection", () => {
      container.innerHTML = "<span>hello</span> world";
      range.setStart(container.firstChild!.firstChild!, 0);
      range.setEnd(container.firstChild!.firstChild!, 5);
      selection?.addRange(range);
      unwrap(selection!, "span");
      expect(container.innerHTML).toBe("hello world");
    });
    it("should unwrap the selection and keep the selection intact", () => {
      container.innerHTML = "<span>hello</span> world";
      range.setStart(container.firstChild!.firstChild!, 0);
      range.setEnd(container.firstChild!.firstChild!, 5);
      selection?.addRange(range);
      unwrap(selection!, "span");
      expect(selection?.toString()).toBe("hello");
    });
  });
});
