import { theme } from "./theme";

declare module "mugen/theme" {
  // ! TODO: find a workaround to the duplicate identifier error
  // @ts-ignore ignore duplicate identifier error for now...
  type ThemeDescription = typeof theme;
}

declare module "mugen/v2" {
  // ! TODO: find a workaround to the duplicate identifier error
  // @ts-ignore ignore duplicate identifier error for now...
  type ThemeDescription = typeof theme;
}
