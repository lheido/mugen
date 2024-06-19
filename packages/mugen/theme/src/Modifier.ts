import { surfaceVariants } from "../src/surface/surface.css";
import { darkTheme, spacings } from "../theme.css";
import {
  LayoutFlex,
  layout,
  layoutClass,
  layoutVariants,
} from "./layout/layout.css";
/**
 * Modifier is a utility class that provides a way to modify the style of a component.
 * Inspired by Android Kotlin's Modifier design pattern.
 */

/**
 * StyleModifier is a class that provides a way to modify the style of a component.
 */
class StyleModifier {
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

  addClasse(...classNames: string[]) {
    for (const cls of classNames) {
      if (!this.classes.includes(cls)) {
        this.classes.push(cls);
      }
    }
    return this;
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
