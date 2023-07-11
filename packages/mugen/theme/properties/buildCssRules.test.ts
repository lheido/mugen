import { describe, expect, it } from "vitest";
import { themeDescriptionDefaults } from "../default";
import { mugen } from "../global";
import { buildCssRules } from "./buildCssRules";
import { properties } from "./properties";

mugen.themeDescription = {
  ...(themeDescriptionDefaults as any),
  colors: {
    primary: "#8d8dd8",
  },
};

const transformValue = (
  properties.transform._additionalsPropertiesValues as any
)[0] as string;

function getRuleContent(
  prop: string,
  value: any,
  media?: string,
  evt?: string
) {
  const result: string[] = [];
  for (const c of buildCssRules(prop, value, media, evt)) {
    result.push(c.content.map((v: any) => v.join?.("; ") ?? v).join("; "));
  }
  return result.join("; ");
}
const tests = [
  {
    title: "basic-property-without-definition",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "fooo" } => "${this.expected}"`;
          },
          expected: "basic-property-without-definition: fooo",
          fn() {
            expect(getRuleContent(prop, "fooo")).toBe(this.expected);
          },
        },
      ];
    },
  },
  {
    title: "padding",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "8" } => "${this.expected}"`;
          },
          expected: `padding: ${mugen.themeDescription["spacing"]["8"]}`,
          fn() {
            expect(getRuleContent(prop, "8")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "8" } } => "${this.expected}"`;
          },
          expected: `padding-left: ${mugen.themeDescription["spacing"]["8"]}; padding-right: ${mugen.themeDescription["spacing"]["8"]}`,
          fn() {
            expect(getRuleContent(prop, { x: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "4", y: "8" } } => "${this.expected}"`;
          },
          expected: `padding-left: ${mugen.themeDescription["spacing"]["4"]}; padding-right: ${mugen.themeDescription["spacing"]["4"]}; padding-top: ${mugen.themeDescription["spacing"]["8"]}; padding-bottom: ${mugen.themeDescription["spacing"]["8"]}`,
          fn() {
            expect(getRuleContent(prop, { x: "4", y: "8" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { top: "4", left: "8" } } => "${this.expected}"`;
          },
          expected: `padding-top: ${mugen.themeDescription["spacing"]["4"]}; padding-left: ${mugen.themeDescription["spacing"]["8"]}`,
          fn() {
            expect(getRuleContent(prop, { top: "4", left: "8" })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "margin",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "8" } => "${this.expected}"`;
          },
          expected: `margin: ${mugen.themeDescription["spacing"]["8"]}`,
          fn() {
            expect(getRuleContent(prop, "8")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "8" } } => "${this.expected}"`;
          },
          expected: `margin-left: ${mugen.themeDescription["spacing"]["8"]}; margin-right: ${mugen.themeDescription["spacing"]["8"]}`,
          fn() {
            expect(getRuleContent(prop, { x: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "4", y: "8" } } => "${this.expected}"`;
          },
          expected: `margin-left: ${mugen.themeDescription["spacing"]["4"]}; margin-right: ${mugen.themeDescription["spacing"]["4"]}; margin-top: ${mugen.themeDescription["spacing"]["8"]}; margin-bottom: ${mugen.themeDescription["spacing"]["8"]}`,
          fn() {
            expect(getRuleContent(prop, { x: "4", y: "8" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { top: "4", left: "8" } } => "${this.expected}"`;
          },
          expected: `margin-top: ${mugen.themeDescription["spacing"]["4"]}; margin-left: ${mugen.themeDescription["spacing"]["8"]}`,
          fn() {
            expect(getRuleContent(prop, { top: "4", left: "8" })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "rounded",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "lg" } => "${this.expected}"`;
          },
          expected: "border-radius: 0.5rem",
          fn() {
            expect(getRuleContent(prop, "lg")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { left: "lg" } } => "${this.expected}"`;
          },
          expected:
            "border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem",
          fn() {
            expect(getRuleContent(prop, { left: "lg" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { left: "sm", right: "lg" } } => "${this.expected}"`;
          },
          expected:
            "border-top-left-radius: 0.125rem; border-bottom-left-radius: 0.125rem; border-top-right-radius: 0.5rem; border-bottom-right-radius: 0.5rem",
          fn() {
            expect(getRuleContent(prop, { left: "sm", right: "lg" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { topLeft: "sm", bottomRight: "lg" } } => "${this.expected}"`;
          },
          expected:
            "border-top-left-radius: 0.125rem; border-bottom-right-radius: 0.5rem",
          fn() {
            expect(
              getRuleContent(prop, { topLeft: "sm", bottomRight: "lg" })
            ).toBe(this.expected);
          },
        },
      ];
    },
  },
  {
    title: "background",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "primary" } => "${this.expected}"`;
          },
          expected: `background-color: var(--mugen-color-primary); color: var(--mugen-color-primary-content)`,
          fn() {
            expect(getRuleContent(prop, "primary")).toBe(this.expected);
          },
        },
      ];
    },
  },
  {
    title: "color",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "primary" } => "${this.expected}"`;
          },
          expected: `color: ${mugen.themeDescription["colors"]["primary"]}`,
          fn() {
            expect(getRuleContent(prop, "primary")).toBe(this.expected);
          },
        },
      ];
    },
  },
  {
    title: "font",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: { size: "5xl" } } => "${this.expected}"`;
          },
          expected: "font-size: 3rem; line-height: 1",
          fn() {
            expect(getRuleContent(prop, { size: "5xl" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { weight: "black" } } => "${this.expected}"`;
          },
          expected: "font-weight: 900",
          fn() {
            expect(getRuleContent(prop, { weight: "black" })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "position",
    its() {
      const prop = "relative";
      return [
        {
          message() {
            return `should transform { ${prop}: true } => "${this.expected}"`;
          },
          expected: "position: relative",
          fn() {
            expect(getRuleContent(prop, true)).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { left: "4" } } => "${this.expected}"`;
          },
          expected: "position: relative; left: 1rem",
          fn() {
            expect(getRuleContent(prop, { left: "4" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { left: "4", top: "8" } } => "${this.expected}"`;
          },
          expected: "position: relative; left: 1rem; top: 2rem",
          fn() {
            expect(getRuleContent(prop, { left: "4", top: "8" })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "flex",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: { gap: "8" } } => "${this.expected}"`;
          },
          expected: "display: flex; gap: 2rem",
          fn() {
            expect(getRuleContent(prop, { gap: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { justify: "center" } } => "${this.expected}"`;
          },
          expected: "display: flex; justify-content: center",
          fn() {
            expect(getRuleContent(prop, { justify: "center" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { items: "center" } } => "${this.expected}"`;
          },
          expected: "display: flex; align-items: center",
          fn() {
            expect(getRuleContent(prop, { items: "center" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { direction: "row" } } => "${this.expected}"`;
          },
          expected: "display: flex; flex-direction: row",
          fn() {
            expect(getRuleContent(prop, { direction: "row" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { wrap: "wrap" } } => "${this.expected}"`;
          },
          expected: "display: flex; flex-wrap: wrap",
          fn() {
            expect(getRuleContent(prop, { wrap: "wrap" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { wrap: "nowrap" } } => "${this.expected}"`;
          },
          expected: "display: flex; flex-wrap: nowrap",
          fn() {
            expect(getRuleContent(prop, { wrap: "nowrap" })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "flexItem",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: { basis: "8" } } => "${this.expected}"`;
          },
          expected: "flex-basis: 2rem",
          fn() {
            expect(getRuleContent(prop, { basis: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { grow: 1 } } => "${this.expected}"`;
          },
          expected: "flex-grow: 1",
          fn() {
            expect(getRuleContent(prop, { grow: 1 })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { shrink: 0 } } => "${this.expected}"`;
          },
          expected: "flex-shrink: 0",
          fn() {
            expect(getRuleContent(prop, { shrink: 0 })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { order: 6 } } => "${this.expected}"`;
          },
          expected: "order: 6",
          fn() {
            expect(getRuleContent(prop, { order: 6 })).toBe(this.expected);
          },
        },
      ];
    },
  },
  {
    title: "width",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "8" } => "${this.expected}"`;
          },
          expected: "width: 2rem",
          fn() {
            expect(getRuleContent(prop, "8")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { min: "8" } } => "${this.expected}"`;
          },
          expected: "min-width: 2rem",
          fn() {
            expect(getRuleContent(prop, { min: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { max: "8" } } => "${this.expected}"`;
          },
          expected: "max-width: 2rem",
          fn() {
            expect(getRuleContent(prop, { max: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { max: "8", value: "16" } } => "${this.expected}"`;
          },
          expected: "max-width: 2rem; width: 4rem",
          fn() {
            expect(getRuleContent(prop, { max: "8", value: "16" })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "height",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "8" } => "${this.expected}"`;
          },
          expected: "height: 2rem",
          fn() {
            expect(getRuleContent(prop, "8")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { min: "8" } } => "${this.expected}"`;
          },
          expected: "min-height: 2rem",
          fn() {
            expect(getRuleContent(prop, { min: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { max: "8" } } => "${this.expected}"`;
          },
          expected: "max-height: 2rem",
          fn() {
            expect(getRuleContent(prop, { max: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { max: "8", value: "16" } } => "${this.expected}"`;
          },
          expected: "max-height: 2rem; height: 4rem",
          fn() {
            expect(getRuleContent(prop, { max: "8", value: "16" })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "border",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: { width: "8" } } => "${this.expected}"`;
          },
          expected: "border-width: 8px",
          fn() {
            expect(getRuleContent(prop, { width: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { style: "solid" } } => "${this.expected}"`;
          },
          expected: "border-style: solid",
          fn() {
            expect(getRuleContent(prop, { style: "solid" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { color: "primary" } } => "${this.expected}"`;
          },
          expected: `border-color: ${mugen.themeDescription["colors"]["primary"]}`,
          fn() {
            expect(getRuleContent(prop, { color: "primary" })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "transition",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: { duration: "50" } } => "${this.expected}"`;
          },
          expected: "transition-duration: 50ms",
          fn() {
            expect(getRuleContent(prop, { duration: "50" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { delay: "200" } } => "${this.expected}"`;
          },
          expected: "transition-delay: 200ms",
          fn() {
            expect(getRuleContent(prop, { delay: "200" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { ease: "linear" } } => "${this.expected}"`;
          },
          expected: "transition-timing-function: linear",
          fn() {
            expect(getRuleContent(prop, { ease: "linear" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { delay: "50", duration: "200" } } => "${this.expected}"`;
          },
          expected: "transition-delay: 50ms; transition-duration: 200ms",
          fn() {
            expect(getRuleContent(prop, { delay: "50", duration: "200" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: "all" } => "${this.expected}"`;
          },
          expected: "transition-property: all",
          fn() {
            expect(getRuleContent(prop, "all")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { property: "all" } } => "${this.expected}"`;
          },
          expected: "transition-property: all",
          fn() {
            expect(getRuleContent(prop, { property: "all" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { property: "all", duration: '200' } } => "${this.expected}"`;
          },
          expected: "transition-property: all; transition-duration: 200ms",
          fn() {
            expect(
              getRuleContent(prop, { property: "all", duration: "200" })
            ).toBe(this.expected);
          },
        },
      ];
    },
  },
  {
    title: "translate",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "8" } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-translate-x: 2rem; --mugen-translate-y: 2rem`,
          fn() {
            expect(getRuleContent("transform", { [prop]: "8" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "8" } } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-translate-x: 2rem`,
          fn() {
            expect(getRuleContent("transform", { [prop]: { x: "8" } })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { y: "8" } } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-translate-y: 2rem`,
          fn() {
            expect(getRuleContent("transform", { [prop]: { y: "8" } })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "scale",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "50" } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-scale-x: 0.5; --mugen-scale-y: 0.5`,
          fn() {
            expect(getRuleContent("transform", { [prop]: "50" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "50" } } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-scale-x: 0.5`,
          fn() {
            expect(getRuleContent("transform", { [prop]: { x: "50" } })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { y: "50" } } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-scale-y: 0.5`,
          fn() {
            expect(getRuleContent("transform", { [prop]: { y: "50" } })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "skew",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "45" } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-skew-x: 45deg; --mugen-skew-y: 45deg`,
          fn() {
            expect(getRuleContent("transform", { [prop]: "45" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "45" } } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-skew-x: 45deg`,
          fn() {
            expect(getRuleContent("transform", { [prop]: { x: "45" } })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { y: "45" } } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-skew-y: 45deg`,
          fn() {
            expect(getRuleContent("transform", { [prop]: { y: "45" } })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
  {
    title: "rotate",
    its() {
      const prop = this.title;
      return [
        {
          message() {
            return `should transform { ${prop}: "45" } => "${this.expected.slice(
              0,
              20
            )}..."`;
          },
          expected: `transform: ${transformValue}; --mugen-rotate: 45deg`,
          fn() {
            expect(getRuleContent("transform", { [prop]: "45" })).toBe(
              this.expected
            );
          },
        },
      ];
    },
  },
];

describe("properties", () => {
  tests.forEach(({ title, its }) => {
    describe(title, () => {
      its.apply({ title }).forEach((data) => {
        it(
          typeof data.message === "string"
            ? data.message
            : data.message.apply(data),
          () => {
            mugen.classNameRefs.clear();
            data.fn.apply(data);
          }
        );
      });
    });
  });
});
