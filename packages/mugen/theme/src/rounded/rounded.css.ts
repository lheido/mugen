import { styleVariants } from "@vanilla-extract/css";
import { roundedValues } from "../../theme.css";

export const roundedVariants = styleVariants(
  Object.keys(roundedValues).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        borderRadius: roundedValues[name as keyof typeof roundedValues],
      },
    };
  }, {})
) as Record<keyof typeof roundedValues, string>;
