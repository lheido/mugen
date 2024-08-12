import { EditorCommands } from "../Commands";
import focus from "./focus";
import insertNewBlock from "./insertNewBlock";
import removeBlock from "./removeBlock";
import surroundSelection from "./surroundSelection";
import transformBlock from "./transformBlock";

export const defaultCommands = {
  insertNewBlock,
  removeBlock,
  focus,
  transformBlock,
  surroundSelection,
} satisfies EditorCommands["commands"];
