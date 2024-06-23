import { styleVariants } from "@vanilla-extract/css";
import data from "../../theme.json";

export const roundedVariants = styleVariants(
  Object.keys(data.rounded).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        borderRadius: data.rounded[name as keyof typeof data.rounded],
      },
    };
  }, {})
) as Record<keyof typeof data.rounded, string>;
