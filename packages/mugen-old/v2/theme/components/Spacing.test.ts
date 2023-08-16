import { beforeEach, describe, expect, it, vi } from "vitest";
import { MugenTheme } from "../MugenTheme";
import { themeSpacingHandler } from "./Spacing";

describe("themeSpacingHandler", () => {
  let theme: MugenTheme<any>;

  beforeEach(() => {
    theme = new MugenTheme<any>({
      spacing: {
        2: "2px",
      },
    });
  });

  it('should return an array of one class name equal to "p-2"', () => {
    const cls = themeSpacingHandler(theme, { value: "2" }, "padding");
    expect(cls[0]).toBe("p-2");
  });

  it("should call the insertRule method on the MugenTheme instance", () => {
    const spyInsertRule = vi.spyOn(theme, "insertRule");
    themeSpacingHandler(theme, { value: "2" }, "padding");
    expect(spyInsertRule).toHaveBeenCalled();
  });

  it("should call the insertRule method on the MugenTheme instance with the right params", () => {
    const spyInsertRule = vi.spyOn(theme, "insertRule");
    themeSpacingHandler(theme, { top: "2" }, "padding");
    expect(spyInsertRule).toHaveBeenCalledWith("pt-2", ["padding-top: 2px"]);
  });

  it("should call the insertRule method on the MugenTheme instance with the right params", () => {
    const spyInsertRule = vi.spyOn(theme, "insertRule");
    themeSpacingHandler(theme, { x: "2" }, "padding");
    expect(spyInsertRule).toHaveBeenCalledWith("px-2", [
      "padding-left: 2px",
      "padding-right: 2px",
    ]);
  });

  it("should call the insertRule method on the MugenTheme instance once for the same input", () => {
    const spyInsertRule = vi.spyOn(theme, "insertRule");
    themeSpacingHandler(theme, { value: "2" }, "padding");
    themeSpacingHandler(theme, { value: "2" }, "padding");
    expect(spyInsertRule).toHaveBeenCalledTimes(1);
  });
});
