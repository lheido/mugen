import { Accessor } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { surfaceVariants } from "../src/surface/surface.css";
import { ColorKeys, darkTheme, spacings } from "../theme.css";
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

export type StringKeysAsInt<T extends string> =
  T extends `${infer N extends number}` ? N : never;

export type SpacingKeysAsInt = StringKeysAsInt<keyof typeof spacings>;

/**
 * StyleModifier is a class that provides a way to modify the style of a component.
 */
class StyleModifier {
  private styles: JSX.CSSProperties = {};
  private classList: Record<string, (() => boolean) | true> = {};

  surface(color: ColorKeys, when?: Accessor<boolean>) {
    return this.addClasse(surfaceVariants[color], when);
  }

  dark(when?: Accessor<boolean>) {
    return this.addClasse(darkTheme, when);
  }

  spacing(
    value:
      | SpacingKeysAsInt
      | Partial<Record<keyof typeof layout.padding, SpacingKeysAsInt>>
      | Partial<Record<"x" | "y", SpacingKeysAsInt>>,
    when?: Accessor<boolean>
  ) {
    this.addClasse(layoutClass);
    (typeof value === "object"
      ? Object.entries(value).map(
          ([key, val]) => layoutVariants[`spacing-${key}-${val}`]
        )
      : [layoutVariants[`spacing-${value}`]]
    ).forEach((className) => this.addClasse(className, when));
    return this;
  }

  justify(value: LayoutFlex["justifyContent"], when?: Accessor<boolean>) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`justifyContent-${value}`],
      when
    );
  }

  align(value: LayoutFlex["alignItems"], when?: Accessor<boolean>) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`alignItems-${value}`],
      when
    );
  }

  direction(value: LayoutFlex["flexDirection"], when?: Accessor<boolean>) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`flexDirection-${value}`],
      when
    );
  }

  wrap(value: LayoutFlex["flexWrap"], when?: Accessor<boolean>) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`flexWrap-${value}`],
      when
    );
  }

  gap(value: SpacingKeysAsInt, when?: Accessor<boolean>) {
    return this.addClasse(layoutClass).addClasse(
      layoutVariants[`gap-${value}`],
      when
    );
  }

  fill(when?: Accessor<boolean>) {
    return this.addClasse(layoutClass).addClasse(layoutVariants.fill, when);
  }

  relative(
    opts?: Partial<Record<keyof typeof positionVars, string | number>>,
    when?: Accessor<boolean>
  ) {
    Object.entries(opts ?? {}).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse(positionClass).addClasse(
      positionVariants.relative,
      when
    );
  }

  absolute(
    opts: Partial<Record<keyof typeof positionVars, string | number>>,
    when?: Accessor<boolean>
  ) {
    Object.entries(opts).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse(positionClass).addClasse(
      positionVariants.absolute,
      when
    );
  }

  fixed(
    opts: Partial<Record<keyof typeof positionVars, string | number>>,
    when?: Accessor<boolean>
  ) {
    Object.entries(opts).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse(positionClass).addClasse(
      positionVariants.fixed,
      when
    );
  }

  sticky(
    opts: Partial<Record<keyof typeof positionVars, string | number>>,
    when?: Accessor<boolean>
  ) {
    Object.entries(opts).forEach(([key, value]) => {
      this.styles[positionVars[key as keyof typeof positionVars] as any] =
        value;
    });
    return this.addClasse(positionClass).addClasse(
      positionVariants.sticky,
      when
    );
  }

  rounded(value: keyof typeof roundedVariants, when?: Accessor<boolean>) {
    return this.addClasse(roundedVariants[value], when);
  }

  addClasse(cls: string, when?: Accessor<boolean>) {
    if (!this.classList.hasOwnProperty(cls)) {
      this.classList[cls] = when ?? true;
    }
    return this;
  }

  clone() {
    const instance = new StyleModifier();
    instance.styles = { ...this.styles };
    instance.classList = { ...this.classList };
    return instance;
  }

  getStyle() {
    return this.styles;
  }

  getClassList() {
    return Object.entries(this.classList).reduce((acc, [key, value]) => {
      return { ...acc, [key]: typeof value === "function" ? value() : value };
    }, {});
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
