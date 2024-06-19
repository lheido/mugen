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
  private classes: string[] = [];

  surface(color: keyof typeof surfaceVariants) {
    return this.addClasse(surfaceVariants[color]);
  }

  dark() {
    return this.addClasse(darkTheme);
  }

  spacing(
    value:
      | keyof typeof spacings
      | Partial<Record<keyof typeof layout.padding, keyof typeof spacings>>
      | Partial<Record<"x" | "y", keyof typeof spacings>>
  ) {
    return this.addClasse(layoutClass).addClasse(
      ...(typeof value === "object"
        ? Object.entries(value).map(
            ([key, val]) => layoutVariants[`spacing-${key}-${val}`]
          )
        : [layoutVariants[`spacing-${value}`]])
    );
  }

  justify(value: LayoutFlex["justifyContent"]) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`justifyContent-${value}`]
    );
  }

  align(value: LayoutFlex["alignItems"]) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`alignItems-${value}`]
    );
  }

  direction(value: LayoutFlex["flexDirection"]) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`flexDirection-${value}`]
    );
  }

  wrap(value: LayoutFlex["flexWrap"]) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`flexWrap-${value}`]
    );
  }

  gap(value: keyof typeof spacings) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`gap-${value}`]
    );
  }

  fill() {
    return this.addClasse(layoutClass).addClasse(layoutVariants.fill);
  }

  relative(opts?: Partial<Record<keyof typeof positionVars, string | number>>) {
    Object.entries(opts ?? {}).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse(positionClass).addClasse(positionVariants.relative);
  }

  absolute(opts: Partial<Record<keyof typeof positionVars, string | number>>) {
    Object.entries(opts).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse(positionClass).addClasse(positionVariants.absolute);
  }

  fixed(opts: Partial<Record<keyof typeof positionVars, string | number>>) {
    Object.entries(opts).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse(positionClass).addClasse(positionVariants.fixed);
  }

  sticky(opts: Partial<Record<keyof typeof positionVars, string | number>>) {
    Object.entries(opts).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse(positionClass).addClasse(positionVariants.sticky);
  }

  addClasse(...classNames: string[]) {
    for (const cls of classNames) {
      if (!this.classes.includes(cls)) {
        this.classes.push(cls);
      }
    }
    return this;
  }

  getStyle() {
    return this.styles;
  }

  toString() {
    return this.classes.join(" ");
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
