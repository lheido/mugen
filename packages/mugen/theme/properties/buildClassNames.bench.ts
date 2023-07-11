import { bench, describe } from "vitest";
import { oldBuildClassNames } from "../style-sheet";
import { buildClassNames } from "./buildClassName";

function forHelper(fn: any, p: string, v: any, a1?: string, a2?: string) {
  const cls = [];
  for (const c of fn(p, v, a1, a2)) {
    cls.push(c);
  }
}

describe("buildClassNames1", () => {
  bench("new version", () => {
    forHelper(buildClassNames, "width", "1/2");
  });

  bench("old version", () => {
    forHelper(oldBuildClassNames, "width", "1/2");
  });
});
describe("buildClassNames2", () => {
  bench("new version", () => {
    forHelper(buildClassNames, "padding", { x: "1/2" });
  });

  bench("old version", () => {
    forHelper(oldBuildClassNames, "padding", { x: "1/2" });
  });
});
describe("buildClassNames3", () => {
  bench("new version", () => {
    forHelper(buildClassNames, "padding", { x: "1/2" }, "lg", "hover");
  });

  bench("old version", () => {
    forHelper(oldBuildClassNames, "padding", { x: "1/2" }, "hover", "lg");
  });
});
