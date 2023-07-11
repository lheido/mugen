import { mugen } from "../global";
import { buildClassNames } from "./buildClassName";
import { properties } from "./properties";

function buildContent(
  property: string,
  value: string | any[],
  minus?: boolean
): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => {
      if (v.raw) {
        return v.raw;
      }
      return `${property}: ${v}`;
    });
  }
  return [`${property}: ${minus ? "-" : ""}${value}`];
}

export function* buildCssRules(
  property: string,
  value: any,
  media?: string,
  evt?: string
): Generator<any> {
  for (const clsInfo of buildClassNames(
    property,
    value,
    media,
    evt,
    properties
  )) {
    if (mugen.classNameRefs.has(clsInfo.className)) yield clsInfo;
    else {
      mugen.classNameRefs.set(clsInfo.className, true);
      if (!clsInfo.definition) {
        yield {
          ...clsInfo,
          content: [`${clsInfo.property}: ${clsInfo.value}`],
        };
      } else {
        if (clsInfo.isAdditional) {
          const props = Array.isArray(clsInfo.property)
            ? clsInfo.property
            : [clsInfo.property];
          const val = Array.isArray(clsInfo.value)
            ? clsInfo.value
            : [clsInfo.value];
          yield {
            ...clsInfo,
            content: props.map((p, i) => buildContent(p, val[i])),
          };
        } else {
          const def = clsInfo.useParent ? clsInfo.parent : clsInfo.definition;
          let properties = def._properties;
          if (!properties) properties = [clsInfo.property];
          if (!Array.isArray(properties)) properties = [properties as any];
          let val = clsInfo.value;
          const useMinus = clsInfo.value?.startsWith?.("-") || false;
          let usePropertiesValues = false;
          if (clsInfo.definition._propertiesValues) {
            usePropertiesValues = true;
            val = (clsInfo.definition._propertiesValues as string[]).map((v) =>
              v.replace("<value>", clsInfo.value)
            );
          } else if (def._themeDescription !== undefined) {
            const absVal =
              typeof clsInfo.value === "string" && useMinus
                ? clsInfo.value.slice(1)
                : clsInfo.value;
            val =
              (mugen.themeDescription as any)[def._themeDescription as any][
                absVal
              ] ?? absVal;
          }
          if (!def._themeDescription) {
            yield {
              ...clsInfo,
              content: properties.map((p) => buildContent(p, val)),
            };
          } else {
            yield {
              ...clsInfo,
              content: properties.map((p, i) =>
                buildContent(
                  p,
                  usePropertiesValues && Array.isArray(val) ? val[i] : val,
                  useMinus
                )
              ),
            };
          }
        }
      }
    }
  }
}
