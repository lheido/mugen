import { JSX } from "solid-js/jsx-runtime";
import { surfaceVariants } from "../src/surface/surface.css";
import { darkTheme, spacings } from "../theme.css";
import {
  LayoutFlex,
  layout,
  layoutClass,
  layoutVariants,
} from "./layout/layout.css";
import {
  positionClass,
  positionContract,
  positionVariants,
} from "./position/position.css";
import { roundedVariants } from "./rounded/rounded.css";
/**
 * Modifier is a utility class that provides a way to modify the style of a component.
 * Inspired by Android Kotlin's Modifier design pattern.
 */

const positionVars = Object.entries(positionContract).reduce(
  (acc, [key, varFn]) => {
    return { ...acc, [key]: varFn.replace("var(", "").replace(")", "") };
  },
  {} as Record<keyof typeof positionContract, string>
);

/**
 * StyleModifier is a class that provides a way to modify the style of a component.
 */
class StyleModifier {
  private styles: JSX.CSSProperties = {};
  private classes: Record<string, string> = {};

  surface(color: keyof typeof surfaceVariants) {
    return this.addClasse("surface", surfaceVariants[color]);
  }

  dark() {
    return this.addClasse("surface-dark", darkTheme);
  }

  spacing(
    value:
      | keyof typeof spacings
      | Partial<Record<keyof typeof layout.padding, keyof typeof spacings>>
      | Partial<Record<"x" | "y", keyof typeof spacings>>
  ) {
    this.addClasse("layout", layoutClass);
    (typeof value === "object"
      ? Object.entries(value).map(([key, val]) => [
          `s-${key}`,
          layoutVariants[`spacing-${key}-${val}`],
        ])
      : [["s", layoutVariants[`spacing-${value}`]]]
    ).forEach(([key, className]) => this.addClasse(key, className));
    return this;
  }

  justify(value: LayoutFlex["justifyContent"]) {
    return this.addClasse("layout", layoutClass).addClasse(
      "ljc",
      layoutVariants[`justifyContent-${value}`]
    );
  }

  align(value: LayoutFlex["alignItems"]) {
    return this.addClasse("layout", layoutClass).addClasse(
      "lai",
      layoutVariants[`alignItems-${value}`]
    );
  }

  direction(value: LayoutFlex["flexDirection"]) {
    return this.addClasse("layout", layoutClass).addClasse(
      "lfd",
      layoutVariants[`flexDirection-${value}`]
    );
  }

  wrap(value: LayoutFlex["flexWrap"]) {
    return this.addClasse("layout", layoutClass).addClasse(
      "lfw",
      layoutVariants[`flexWrap-${value}`]
    );
  }

  gap(value: keyof typeof spacings) {
    return this.addClasse("layout", layoutClass).addClasse(
      "lfg",
      layoutVariants[`gap-${value}`]
    );
  }

  fill() {
    return this.addClasse("layout", layoutClass).addClasse(
      "lfill",
      layoutVariants.fill
    );
  }

  relative(opts?: Partial<Record<keyof typeof positionVars, string | number>>) {
    Object.entries(opts ?? {}).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse("position", positionClass).addClasse(
      "pos-r",
      positionVariants.relative
    );
  }

  absolute(opts: Partial<Record<keyof typeof positionVars, string | number>>) {
    Object.entries(opts).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse("position", positionClass).addClasse(
      "pos-a",
      positionVariants.absolute
    );
  }

  fixed(opts: Partial<Record<keyof typeof positionVars, string | number>>) {
    Object.entries(opts).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse("position", positionClass).addClasse(
      "pos-f",
      positionVariants.fixed
    );
  }

  sticky(opts: Partial<Record<keyof typeof positionVars, string | number>>) {
    Object.entries(opts).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    // return this.addClasse(positionClass).addClasse(positionVariants.sticky);
    return this.addClasse("position", positionClass).addClasse(
      "pos-s",
      positionVariants.sticky
    );
  }

  rounded(value: keyof typeof roundedVariants) {
    return this.addClasse("rounded", roundedVariants[value]);
  }

  addClasse(key: string, classNames: string) {
    this.classes[key] = classNames;
    return this;
  }

  clone() {
    const instance = new StyleModifier();
    instance.styles = { ...this.styles };
    instance.classes = { ...this.classes };
    return instance;
  }

  getStyle() {
    return this.styles;
  }

  toString() {
    return Object.values(this.classes).join(" ");
  }
}

const methods = Object.getOwnPropertyNames(StyleModifier.prototype).filter(
  (key) => key !== "constructor"
);

/**
 * Modifier is a utility class that provides a way to modify the style of a component.
 */
export const Modifier = new Proxy(
  {},
  {
    get: (target, key: keyof StyleModifier) => {
      if (methods.includes(key)) {
        const instance = new StyleModifier();
        return instance[key].bind(instance);
      }
      throw new Error(`Method ${key} does not exist on Modifier`);
    },
  }
) as StyleModifier;
