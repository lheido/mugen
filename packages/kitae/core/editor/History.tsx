import { createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";

export type HistoryEntry<D = any> = { type: string; data: D };

export type History = {
  entries: HistoryEntry[];
  index: number;
};

export type HistoryContextValue = History & {
  undo(): void;
  redo(): void;
  canUndo(): boolean;
  canRedo(): boolean;
  clear(): void;
  push<D = any>(entry: HistoryEntry<D>): void;
};

const HistoryContext = createContext<HistoryContextValue>();

export function useHistory() {
  return useContext(HistoryContext);
}

export function createHistory() {
  const [state, setState] = createStore<History>({ entries: [], index: -1 });
  return new Proxy(
    {
      undo() {
        if (this.canUndo()) {
          setState("index", state.index - 1);
        }
      },
      redo() {
        if (this.canRedo()) {
          setState("index", state.index + 1);
        }
      },
      canUndo() {
        return state.index >= 0;
      },
      canRedo() {
        return state.index < state.entries.length - 1;
      },
      clear() {
        setState(
          produce((draft) => {
            draft.entries = [];
            draft.index = -1;
          })
        );
      },
      push(entry) {
        setState(
          produce((draft) => {
            draft.entries.push(entry);
            draft.index = draft.entries.length - 1;
          })
        );
      },
    } satisfies Omit<HistoryContextValue, keyof History>,
    {
      get(target, prop, receiver) {
        if (prop in state) return state[prop as keyof History];
        return Reflect.get(target, prop, receiver);
      },
    }
  ) as HistoryContextValue;
}

export const HistoryProvider = HistoryContext.Provider;
