import { describe, expect, it } from "vitest";
import { escapeClassName } from "./escapeClassName";

describe("properties:escapeValue", () => {
  it(`should escape ':'`, () => {
    expect(escapeClassName(":")).toBe(String.raw`\:`);
  });

  it(`should escape '[]'`, () => {
    expect(escapeClassName("[")).toBe(String.raw`\[`);
    expect(escapeClassName("]")).toBe(String.raw`\]`);
  });

  it(`should escape '{}'`, () => {
    expect(escapeClassName("{")).toBe(String.raw`\{`);
    expect(escapeClassName("}")).toBe(String.raw`\}`);
  });

  it(`should escape '$'`, () => {
    expect(escapeClassName("$")).toBe(String.raw`\$`);
  });

  it(`should escape '/'`, () => {
    expect(escapeClassName("/")).toBe(String.raw`\/`);
  });
});
