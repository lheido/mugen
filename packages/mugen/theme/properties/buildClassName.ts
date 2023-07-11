import {
  properties,
  PropertyDefinition,
  PropertyDefinitions,
} from "./properties";

export function* buildClassNames<V extends string | object | boolean>(
  property: string,
  value: V,
  media?: string,
  evt?: string,
  definition: any = properties,
  base?: string
): Generator<{
  className: string;
  parent: PropertyDefinitions | PropertyDefinition;
  definition: PropertyDefinition;
  property: string;
  value: V;
  isAdditional?: boolean;
  useParent?: boolean;
}> {
  const baseCls = definition[property]?._cls ?? "";
  const separator = definition[property]?._separator ?? "-";
  const additionals = (definition[property]?._additionals ?? []) as string[];
  const _additionalsProperties = (definition[property]
    ?._additionalsProperties ?? []) as string[];
  const _additionalsPropertiesValues = (definition[property]
    ?._additionalsPropertiesValues ?? []) as string[];
  const before = definition[property]?._before ?? "";
  const ignoreBase = definition[property]?._ignoreBase ?? false;
  const useParent = (definition[property]?._useParent as boolean) ?? false;
  for (const [i, className] of additionals.entries()) {
    yield {
      className,
      property: _additionalsProperties[i],
      value: (_additionalsPropertiesValues[i] ?? className) as any,
      parent: definition,
      definition: definition[property],
      isAdditional: true,
      useParent,
    };
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    for (const i in keys) {
      const k = keys[i];
      const v = (value as any)[k];
      const def = definition[property] as PropertyDefinitions;
      yield* buildClassNames(k, v, media, evt, def, baseCls as any);
    }
  } else {
    evt = evt ? `${evt}:` : "";
    media = media ? `${media}:` : "";
    let className;
    if (definition[property] === undefined) {
      className = `${media}${evt}${property}${separator}${value}`;
    } else if (typeof baseCls === "string" && value !== true) {
      className = `${media}${evt}${
        ignoreBase ? "" : base ?? ""
      }${before}${baseCls}${separator}${value}`;
    }
    if (className) {
      yield {
        className,
        parent: definition,
        definition: definition[property],
        property,
        value,
        useParent,
      };
    }
  }
}
