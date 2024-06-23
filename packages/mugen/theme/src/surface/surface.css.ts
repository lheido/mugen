import { styleVariants } from "@vanilla-extract/css";
import { mugen, surfaces } from "../../theme.css";
import data from "../../theme.json";

export const surfaceVariants = styleVariants(
  Object.keys(data.colors).reduce((acc, name) => {
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
  }, {} as Record<keyof typeof data.colors, any>)
);
