import { align, direction, fill, gap, justify, wrap } from "./layout";
import {
  ModifierClassList,
  ModifierResult,
  ModifierStyle,
  ModifierWhenProp,
} from "./modifier.type";
import {
  absolute,
  fixed,
  initialPosition,
  relative,
  staticPosition,
} from "./position";
import { rounded } from "./rounded";
import { spacing } from "./spacing";
import { surface } from "./surface";

const modifiers = {
  surface,
  spacing,
  fill,
  justify,
  align,
  direction,
  wrap,
  gap,
  relative,
  absolute,
  fixed,
  staticPosition,
  initialPosition,
  rounded,
} as const;

class _ElementModifier {
  styles: ModifierStyle = {};
  classList: ModifierClassList = {};

  constructor() {
    for (const [key, modifier] of Object.entries(modifiers)) {
      (this as any)[key] = (...args: any[]) => {
        return this.add((modifier as any)(...args));
      };
    }
  }

  add(result: ModifierResult) {
    if (result.classList) {
      for (const [key, value] of Object.entries(result.classList)) {
        this.addClass(key, value);
      }
    }
    if (result.styles) {
      this.addStyle(result.styles);
    }
    return this;
  }

  addClass(cls: string, when?: ModifierWhenProp) {
    if (!this.classList.hasOwnProperty(cls)) {
      this.classList[cls] = when ?? true;
    }
    return this;
  }

  addStyle(style: ModifierStyle) {
    this.styles = { ...style, ...this.styles };
    return this;
  }

  clone() {
    const instance = new ElementModifier();
    instance.styles = { ...this.styles };
    instance.classList = { ...this.classList };
    return instance;
  }

  buildClassList() {
    return Object.entries(this.classList).reduce((acc, [key, value]) => {
      return { ...acc, [key]: typeof value === "function" ? value() : value };
    }, {});
  }

  buildStyle() {
    return Object.entries(this.styles).reduce((acc, [key, style]) => {
      const [value, when] = style;
      if (when === true || (typeof when === "function" && when())) {
        return { ...acc, [key]: value };
      }
      return acc;
    }, {});
  }
}

export type _Modifier<T> = {
  [K in keyof typeof modifiers]: (
    ...args: Parameters<(typeof modifiers)[K]>
  ) => T & _Modifier<T>;
};

export type ElementModifier = _ElementModifier & _Modifier<_ElementModifier>;

const ElementModifier = _ElementModifier as new () => _ElementModifier &
  _Modifier<_ElementModifier>;

export const Modifier = new Proxy(
  {},
  {
    get: (_, key: keyof typeof modifiers) => {
      if (key in modifiers) {
        const instance = new ElementModifier();
        return instance[key].bind(instance);
      }
      throw new Error(`Method ${key} does not exist on Modifier`);
    },
  }
) as _Modifier<_ElementModifier>;
