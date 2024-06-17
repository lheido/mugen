import { styleVariants } from "@vanilla-extract/css";
import { colors, mugen, surfaces } from "../../theme.css";

export const surfaceVariants = styleVariants(
  Object.keys(colors).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        "@layer": {
          [mugen]: {
            backgroundColor: `hsl(${surfaces[name as keyof typeof surfaces]})`,
            color: `hsl(${
              surfaces[`${name}-content` as keyof typeof surfaces]
            })`,
          },
        },
      },
    };
  }, {} as Record<keyof typeof colors, any>)
);
