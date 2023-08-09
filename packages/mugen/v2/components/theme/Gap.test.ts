import { beforeEach, describe, expect, it, vi } from "vitest";
import { MugenTheme } from "../../MugenTheme";
import { themeGapHandler } from "./Gap";

describe("themeGapHandler", () => {
  let theme: MugenTheme<any>;

  beforeEach(() => {
    theme = new MugenTheme<any>({
      spacing: {
        2: "2px",
        4: "4px",
      },
    });
  });

  it('should return an array of one class name equal to "gap-2"', () => {
    const cls = themeGapHandler(theme, { value: "2" });
    expect(cls[0]).toBe("gap-2");
  });

  it("should call the insertRule method on the MugenTheme instance", () => {
    const spyInsertRule = vi.spyOn(theme, "insertRule");
    themeGapHandler(theme, { value: "2" });
    expect(spyInsertRule).toHaveBeenCalled();
  });

  it("should call the insertRule method on the MugenTheme instance with the right params", () => {
    const spyInsertRule = vi.spyOn(theme, "insertRule");
    themeGapHandler(theme, { value: "2" });
    expect(spyInsertRule).toHaveBeenCalledWith("gap-2", ["gap: 2px"]);
  });

  it("should call the insertRule method on the MugenTheme instance with the right params", () => {
    const spyInsertRule = vi.spyOn(theme, "insertRule");
    themeGapHandler(theme, { x: "2" });
    expect(spyInsertRule).toHaveBeenCalledWith("gap-x-2", ["column-gap: 2px"]);
  });

  it("should call the insertRule method on the MugenTheme instance once for the same input", () => {
    const spyInsertRule = vi.spyOn(theme, "insertRule");
    themeGapHandler(theme, { value: "2" });
    themeGapHandler(theme, { value: "2" });
    expect(spyInsertRule).toHaveBeenCalledTimes(1);
  });
});
