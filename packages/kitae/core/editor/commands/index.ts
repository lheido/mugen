import { EditorCommands } from "../Commands";
import focus from "./focus";
import insertNewBlock from "./insertNewBlock";
import removeBlock from "./removeBlock";
import transformBlock from "./transformBlock";

export const defaultCommands = {
  insertNewBlock,
  removeBlock,
  focus,
  transformBlock,
} satisfies EditorCommands["commands"];
