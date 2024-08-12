import { describe, expect, it } from "vitest";
import { cleanHTML } from "./html";

describe("kitae/core/utils/html", () => {
  it("should remove empty tags from HTML", () => {
    expect(cleanHTML("<p></p>")).toBe("");
    expect(cleanHTML("<p> </p>")).toBe("<p> </p>");
    expect(cleanHTML("<p>foo</p>")).toBe("<p>foo</p>");
    expect(cleanHTML("<p>foo</p><p></p>")).toBe("<p>foo</p>");
    expect(cleanHTML("<p>foo</p><p> </p>")).toBe("<p>foo</p><p> </p>");
  });
  it("should remove empty tags from HTML without keeping whitespace content", () => {
    expect(cleanHTML("<p></p>", false)).toBe("");
    expect(cleanHTML("<p> </p>", false)).toBe("");
    expect(cleanHTML("<p>foo</p>", false)).toBe("<p>foo</p>");
    expect(cleanHTML("<p>foo</p><p></p>", false)).toBe("<p>foo</p>");
    expect(cleanHTML("<p>foo</p><p> </p>", false)).toBe("<p>foo</p>");
  });
});
