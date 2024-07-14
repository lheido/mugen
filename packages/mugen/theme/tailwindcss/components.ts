import { CSSRuleObject } from "tailwindcss/types/config";
import { ComponentFunction } from "./types";
import { getColorVarNames } from "./utils";

const BUTTON_VAR_PREFIX = "--mugen-btn";
export function buttonVarNames(name: string) {
  return {
    bg: `${BUTTON_VAR_PREFIX}-${name}-bg`,
    content: `${BUTTON_VAR_PREFIX}-${name}-content`,
    variant: `${BUTTON_VAR_PREFIX}-${name}-variant-bg`,
    "variant-content": `${BUTTON_VAR_PREFIX}-${name}-variant-content`,
  };
}

export const DEFAULT_BUTTON_CONFIG = {
  default: {
    surface: { variant: ["surface", "variant"] },
    "surface-variant": { variant: ["surface-1", "DEFAULT"] },
    "surface-1": { variant: ["surface", "variant"] },
    primary: { variant: ["primary", "variant"] },
    accent: { variant: ["accent", "variant"] },
    // warning: "warning-variant",
    // success: "success-variant",
    // danger: "danger-variant",
    // info: "info-variant",
  },
  main: {
    surface: "primary",
    "surface-1": "primary",
    primary: "accent",
    accent: "primary",
  },
  accent: {
    surface: "accent",
    "surface-1": "accent",
    accent: "surface",
    primary: "surface",
  },
  // accent: buttonVarNames("accent"),
  // warning: buttonVarNames("warning"),
  // success: buttonVarNames("success"),
  // danger: buttonVarNames("danger"),
  // info: buttonVarNames("info"),
};

export function button(btnConfig = DEFAULT_BUTTON_CONFIG): ComponentFunction {
  return (api) => {
    const {
      bg,
      content,
      variant,
      "variant-content": variantContent,
    } = buttonVarNames("default");
    api.addComponents({
      ".btn": {
        padding: `${api.theme("spacing.2")} ${api.theme("spacing.4")}`,
        userSelect: "none",
        transitionDuration: "200ms",
        transitionProperty: "all",
        "--tw-bg-opacity": "1",
        "--tw-text-opacity": "1",
        backgroundColor: `rgb(var(${bg}) / var(--tw-bg-opacity))`,
        color: `rgb(var(${content}) / var(--tw-text-opacity))`,
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "transparent",
        outlineOffset: "3px",
        "&:hover,&:focus": {
          backgroundColor: `rgb(var(${variant}))`,
          color: `rgb(var(${variantContent}))`,
        },
        "&:focus-visible": {
          outlineColor: `rgb(var(${content}))`,
        },
      },
    });
    Object.entries(btnConfig).forEach(([btnType, data]) => {
      const btnVarNames = buttonVarNames(btnType);
      if (btnType !== "default") {
        api.addComponents({
          [`.btn-${btnType}`]: {
            backgroundColor: `rgb(var(${btnVarNames.bg}) / var(--tw-bg-opacity))`,
            color: `rgb(var(${btnVarNames.content}) / var(--tw-text-opacity))`,
            "&:hover,&:focus": {
              backgroundColor: `rgb(var(${btnVarNames.variant}) / var(--tw-bg-opacity))`,
              color: `rgb(var(${btnVarNames["variant-content"]}) / var(--tw-text-opacity))`,
            },
            "&:focus-visible": {
              outlineColor: `rgb(var(${btnVarNames.variant}))`,
            },
          },
        });
      }
      Object.entries(data).forEach(([bgName, color]) => {
        if (typeof color === "string") {
          const colorVars = getColorVarNames(color);
          api.addUtilities({
            [`.bg-${bgName}`]: {
              [btnVarNames.bg]: `var(${colorVars.DEFAULT})`,
              [btnVarNames.content]: `var(${colorVars.content})`,
              [btnVarNames.variant]: `var(${colorVars.variant})`,
              [btnVarNames[
                "variant-content"
              ]]: `var(${colorVars["variant-content"]})`,
            },
          });
        } else {
          const { variant, base } = color;
          const rules: CSSRuleObject = {};
          if (base) {
            if (typeof base === "string") {
              const baseColors = getColorVarNames(base);
              rules[btnVarNames.bg] = `var(${baseColors.DEFAULT})`;
              rules[btnVarNames.content] = `var(${baseColors.content})`;
            } else if (Array.isArray(base)) {
              const [c, k] = base;
              const baseColors = getColorVarNames(c);
              rules[btnVarNames.bg] = `var(${
                baseColors[k as keyof typeof baseColors]
              })`;
              rules[btnVarNames.content] = `var(${
                baseColors[`${k}-content` as keyof typeof baseColors]
              })`;
            }
          } else {
            const bgColors = getColorVarNames(bgName);
            rules[btnVarNames.content] = `var(${bgColors.content})`;
          }
          if (variant) {
            if (typeof variant === "string") {
              const variantColors = getColorVarNames(variant);
              rules[btnVarNames.variant] = `var(${variantColors.DEFAULT})`;
              rules[
                btnVarNames["variant-content"]
              ] = `var(${variantColors.content})`;
            } else if (Array.isArray(variant)) {
              const [c, k] = variant;
              const variantColors = getColorVarNames(c);
              rules[btnVarNames.variant] = `var(${
                variantColors[k as keyof typeof variantColors]
              })`;
              rules[btnVarNames["variant-content"]] = `var(${
                variantColors[`${k}-content` as keyof typeof variantColors]
              })`;
            }
          }
          api.addUtilities({
            [`.bg-${bgName}`]: rules,
          });
        }
      });
    });
  };
}
