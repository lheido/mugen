import { describe, expect, it } from "vitest";
import { buildClassNames } from "./buildClassName";

function _buildClassNames(
  prop: string,
  value: any,
  media?: string,
  evt?: string
) {
  const cls: string[] = [];
  for (const c of buildClassNames(prop, value, media, evt)) {
    cls.push(c.className);
  }
  return cls.join(" ");
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
          expected: "basic-property-without-definition-fooo",
          fn() {
            expect(_buildClassNames(prop, "fooo")).toBe(this.expected);
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
          expected: "p-8",
          fn() {
            expect(_buildClassNames(prop, "8")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "8" } } => "${this.expected}"`;
          },
          expected: "px-8",
          fn() {
            expect(_buildClassNames(prop, { x: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "4", y: "8" } } => "${this.expected}"`;
          },
          expected: "px-4 py-8",
          fn() {
            expect(_buildClassNames(prop, { x: "4", y: "8" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { top: "4", left: "8" } } => "${this.expected}"`;
          },
          expected: "pt-4 pl-8",
          fn() {
            expect(_buildClassNames(prop, { top: "4", left: "8" })).toBe(
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
          expected: "m-8",
          fn() {
            expect(_buildClassNames(prop, "8")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "8" } } => "${this.expected}"`;
          },
          expected: "mx-8",
          fn() {
            expect(_buildClassNames(prop, { x: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "4", y: "8" } } => "${this.expected}"`;
          },
          expected: "mx-4 my-8",
          fn() {
            expect(_buildClassNames(prop, { x: "4", y: "8" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { top: "4", left: "8" } } => "${this.expected}"`;
          },
          expected: "mt-4 ml-8",
          fn() {
            expect(_buildClassNames(prop, { top: "4", left: "8" })).toBe(
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
            return `should transform { ${prop}: "8" } => "${this.expected}"`;
          },
          expected: "rounded-8",
          fn() {
            expect(_buildClassNames(prop, "8")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { left: "8" } } => "${this.expected}"`;
          },
          expected: "rounded-l-8",
          fn() {
            expect(_buildClassNames(prop, { left: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { left: "4", right: "8" } } => "${this.expected}"`;
          },
          expected: "rounded-l-4 rounded-r-8",
          fn() {
            expect(_buildClassNames(prop, { left: "4", right: "8" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { topLeft: "4", bottomRight: "8" } } => "${this.expected}"`;
          },
          expected: "rounded-tl-4 rounded-br-8",
          fn() {
            expect(
              _buildClassNames(prop, { topLeft: "4", bottomRight: "8" })
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
            return `should transform { ${prop}: "white" } => "${this.expected}"`;
          },
          expected: "bg-white",
          fn() {
            expect(_buildClassNames(prop, "white")).toBe(this.expected);
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
            return `should transform { ${prop}: "white" } => "${this.expected}"`;
          },
          expected: "color-white",
          fn() {
            expect(_buildClassNames(prop, "white")).toBe(this.expected);
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
            return `should transform { ${prop}: { size: "3xl" } } => "${this.expected}"`;
          },
          expected: "fz-3xl",
          fn() {
            expect(_buildClassNames(prop, { size: "3xl" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { weight: "4" } } => "${this.expected}"`;
          },
          expected: "fw-4",
          fn() {
            expect(_buildClassNames(prop, { weight: "4" })).toBe(this.expected);
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
          expected: "relative",
          fn() {
            expect(_buildClassNames(prop, true)).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { left: "4" } } => "${this.expected}"`;
          },
          expected: "relative left-4",
          fn() {
            expect(_buildClassNames(prop, { left: "4" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { left: "4", top: "8" } } => "${this.expected}"`;
          },
          expected: "relative left-4 top-8",
          fn() {
            expect(_buildClassNames(prop, { left: "4", top: "8" })).toBe(
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
          expected: "flex gap-8",
          fn() {
            expect(_buildClassNames(prop, { gap: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { justify: "center" } } => "${this.expected}"`;
          },
          expected: "flex fjc-center",
          fn() {
            expect(_buildClassNames(prop, { justify: "center" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { items: "center" } } => "${this.expected}"`;
          },
          expected: "flex fai-center",
          fn() {
            expect(_buildClassNames(prop, { items: "center" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { direction: "row" } } => "${this.expected}"`;
          },
          expected: "flex fd-row",
          fn() {
            expect(_buildClassNames(prop, { direction: "row" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { wrap: "wrap" } } => "${this.expected}"`;
          },
          expected: "flex fw-wrap",
          fn() {
            expect(_buildClassNames(prop, { wrap: "wrap" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { wrap: "nowrap" } } => "${this.expected}"`;
          },
          expected: "flex fw-nowrap",
          fn() {
            expect(_buildClassNames(prop, { wrap: "nowrap" })).toBe(
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
          expected: "flex-basis-8",
          fn() {
            expect(_buildClassNames(prop, { basis: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { grow: 1 } } => "${this.expected}"`;
          },
          expected: "flex-grow-1",
          fn() {
            expect(_buildClassNames(prop, { grow: 1 })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { shrink: 0 } } => "${this.expected}"`;
          },
          expected: "flex-shrink-0",
          fn() {
            expect(_buildClassNames(prop, { shrink: 0 })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { order: 6 } } => "${this.expected}"`;
          },
          expected: "order-6",
          fn() {
            expect(_buildClassNames(prop, { order: 6 })).toBe(this.expected);
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
          expected: "w-8",
          fn() {
            expect(_buildClassNames(prop, "8")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { min: "8" } } => "${this.expected}"`;
          },
          expected: "min-w-8",
          fn() {
            expect(_buildClassNames(prop, { min: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { max: "8" } } => "${this.expected}"`;
          },
          expected: "max-w-8",
          fn() {
            expect(_buildClassNames(prop, { max: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { max: "8", value: "16" } } => "${this.expected}"`;
          },
          expected: "max-w-8 w-16",
          fn() {
            expect(_buildClassNames(prop, { max: "8", value: "16" })).toBe(
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
          expected: "h-8",
          fn() {
            expect(_buildClassNames(prop, "8")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { min: "8" } } => "${this.expected}"`;
          },
          expected: "min-h-8",
          fn() {
            expect(_buildClassNames(prop, { min: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { max: "8" } } => "${this.expected}"`;
          },
          expected: "max-h-8",
          fn() {
            expect(_buildClassNames(prop, { max: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { max: "8", value: "16" } } => "${this.expected}"`;
          },
          expected: "max-h-8 h-16",
          fn() {
            expect(_buildClassNames(prop, { max: "8", value: "16" })).toBe(
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
          expected: "border border-w-8",
          fn() {
            expect(_buildClassNames(prop, { width: "8" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { style: "solid" } } => "${this.expected}"`;
          },
          expected: "border border-s-solid",
          fn() {
            expect(_buildClassNames(prop, { style: "solid" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { color: "primary" } } => "${this.expected}"`;
          },
          expected: "border border-c-primary",
          fn() {
            expect(_buildClassNames(prop, { color: "primary" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { left: { color: "primary" } } } => "${this.expected}"`;
          },
          expected: "border border-l-c-primary",
          fn() {
            expect(_buildClassNames(prop, { left: { color: "primary" } })).toBe(
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
            return `should transform { ${prop}: { duration: "2s" } } => "${this.expected}"`;
          },
          expected: "duration-2s",
          fn() {
            expect(_buildClassNames(prop, { duration: "2s" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { delay: "1s" } } => "${this.expected}"`;
          },
          expected: "delay-1s",
          fn() {
            expect(_buildClassNames(prop, { delay: "1s" })).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { ease: "my-ease" } } => "${this.expected}"`;
          },
          expected: "ease-my-ease",
          fn() {
            expect(_buildClassNames(prop, { ease: "my-ease" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { delay: "1s", duration: "2s" } } => "${this.expected}"`;
          },
          expected: "delay-1s duration-2s",
          fn() {
            expect(
              _buildClassNames(prop, { delay: "1s", duration: "2s" })
            ).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: "all" } => "${this.expected}"`;
          },
          expected: "transition-all",
          fn() {
            expect(_buildClassNames(prop, "all")).toBe(this.expected);
          },
        },
        {
          message() {
            return `should transform { ${prop}: { value: "all" } } => "${this.expected}"`;
          },
          expected: "transition-all",
          fn() {
            expect(_buildClassNames(prop, { property: "all" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { value: "all", duration: '2s' } } => "${this.expected}"`;
          },
          expected: "transition-all duration-2s",
          fn() {
            expect(
              _buildClassNames(prop, { property: "all", duration: "2s" })
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
            return `should transform { ${prop}: "8" } => "${this.expected}"`;
          },
          expected: "transform translate-8",
          fn() {
            expect(_buildClassNames("transform", { [prop]: "8" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "8" } } => "${this.expected}"`;
          },
          expected: "transform translate-x-8",
          fn() {
            expect(_buildClassNames("transform", { [prop]: { x: "8" } })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { y: "8" } } => "${this.expected}"`;
          },
          expected: "transform translate-y-8",
          fn() {
            expect(_buildClassNames("transform", { [prop]: { y: "8" } })).toBe(
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
            return `should transform { ${prop}: "8" } => "${this.expected}"`;
          },
          expected: "transform scale-8",
          fn() {
            expect(_buildClassNames("transform", { [prop]: "8" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "8" } } => "${this.expected}"`;
          },
          expected: "transform scale-x-8",
          fn() {
            expect(_buildClassNames("transform", { [prop]: { x: "8" } })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { y: "8" } } => "${this.expected}"`;
          },
          expected: "transform scale-y-8",
          fn() {
            expect(_buildClassNames("transform", { [prop]: { y: "8" } })).toBe(
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
            return `should transform { ${prop}: "8" } => "${this.expected}"`;
          },
          expected: "transform skew-8",
          fn() {
            expect(_buildClassNames("transform", { [prop]: "8" })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { x: "8" } } => "${this.expected}"`;
          },
          expected: "transform skew-x-8",
          fn() {
            expect(_buildClassNames("transform", { [prop]: { x: "8" } })).toBe(
              this.expected
            );
          },
        },
        {
          message() {
            return `should transform { ${prop}: { y: "8" } } => "${this.expected}"`;
          },
          expected: "transform skew-y-8",
          fn() {
            expect(_buildClassNames("transform", { [prop]: { y: "8" } })).toBe(
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
            return `should transform { ${prop}: "45" } => "${this.expected}"`;
          },
          expected: "transform rotate-45",
          fn() {
            expect(_buildClassNames("transform", { [prop]: "45" })).toBe(
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
        it.concurrent(
          typeof data.message === "string"
            ? data.message
            : data.message.apply(data),
          () => {
            data.fn.apply(data);
          }
        );
      });
    });
  });

  describe("built classes take into account modifiers", () => {
    it('should transform { color: "primary" } => "hover:color-primary"', () => {
      expect(_buildClassNames("color", "primary", "", "hover")).toBe(
        "hover:color-primary"
      );
    });

    it('should transform { color: "primary" } => "lg:color-primary"', () => {
      expect(_buildClassNames("color", "primary", "lg")).toBe(
        "lg:color-primary"
      );
    });

    it('should transform { color: "primary" } => "lg:hover:color-primary"', () => {
      expect(_buildClassNames("color", "primary", "lg", "hover")).toBe(
        "lg:hover:color-primary"
      );
    });
  });

  // describe("newVersion === oldVersion", () => {
  //   it("should the same result as the old version", () => {
  //     const expected = [];
  //     for (const cls of oldBuildClassNames("padding", { x: "1/2" })) {
  //       expected.push(cls);
  //     }
  //     expect(_buildClassNames("padding", { x: "1/2" })).toEqual(
  //       expected.join(" ")
  //     );
  //   });
  // });
});
