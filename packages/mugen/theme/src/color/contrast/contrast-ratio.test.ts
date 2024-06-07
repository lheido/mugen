import { describe, expect, it } from "vitest";
import { hexToRgb } from "../converter";
import { getContrastRatio } from "./contrast-ratio";

describe("getContrastRatio", () => {
  it("should return 21 for white against black", () => {
    const white = hexToRgb("#ffffff");
    const black = hexToRgb("#000000");
    expect(getContrastRatio(white, black)).toEqual(21);
  });
  it("should return 1 for white against white", () => {
    const white = hexToRgb("#ffffff");
    expect(getContrastRatio(white, white)).toEqual(1);
  });
});
