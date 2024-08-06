import {
  createContext,
  getOwner,
  JSX,
  runWithOwner,
  untrack,
  useContext,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { DynamicProps } from "solid-js/web";
import { useEditorConfig } from "../editor/Config";
import { useNode } from "../tree";
import {
  getCaretPosition,
  isCaretAtEnd,
  isCaretAtStart,
  observeSelection,
} from "../utils";

type EditableTextState = {
  mouseDown: boolean;
  mouseUp: boolean;
  keyDown: boolean;
  keyUp: boolean;
  caret: {
    position: number;
    start: boolean;
    end: boolean;
  };
  patterns: TextPatterns;
  selection: Selection | null;
};

const HeadlessTextContext = createContext<EditableTextState>();

export type HeadlessTextProps = {
  children: (
    props: DynamicProps<"span">,
    setRef: (elt: HTMLElement) => void
  ) => JSX.Element;
};

export function useText() {
  return useContext(HeadlessTextContext);
}

export function createDefaultTextBlock() {
  return {
    data: {
      tag: "p",
      text: "",
    },
  };
}

export function TextBlock(props: HeadlessTextProps) {
  const node = useNode<{ text: string; tag: "p" | "span" }>();
  return props.children(
    {
      get component() {
        return node.data?.tag ?? "p";
      },
      get innerHTML() {
        return node.state.data?.text;
      },
    },
    (ref) => {
      node.ref = ref;
    }
  );
}

export function EditableTextBlock(props: HeadlessTextProps) {
  const config = useEditorConfig();
  const owner = getOwner();
  const node = useNode();

  const selection = observeSelection(() => node.ref);

  const [state, setState] = createStore<EditableTextState>({
    mouseDown: false,
    mouseUp: false,
    keyDown: false,
    keyUp: false,
    caret: {
      position: 0,
      start: false,
      end: true,
    },
    get selection() {
      return selection();
    },
    patterns: {},
  });

  const onInput = (e: Event) => {
    node.setState(
      "data",
      "text",
      (e.currentTarget as HTMLElement).innerHTML.trim()
    );
    setState(
      "patterns",
      parseText((e.currentTarget as HTMLElement).textContent ?? "")
    );
  };
  const onKeyDown = (e: KeyboardEvent) => {
    setState(
      produce((draft) => {
        draft.keyDown = true;
        draft.caret.position = getCaretPosition(node.ref!);
        draft.caret.start = isCaretAtStart(node.ref!);
        draft.caret.end = isCaretAtEnd(node.ref!);
      })
    );
    const modifier = config?.addNewBlock?.useModifierKey;
    const reverseBehavior = config?.addNewBlock?.reverse;
    if (e.key === "Enter") {
      if (
        (!reverseBehavior && modifier && e[modifier]) ||
        (reverseBehavior && modifier && !e[modifier])
      ) {
        e.preventDefault();
        runWithOwner(owner, () => {
          const command = state.patterns?.slashCommand ?? "insertNewBlock";
          if (import.meta.env.DEV) {
            if (!config?.commands?.[command]) {
              console.warn(
                `KitaeEditor Warning : Command ${command} not found`
              );
            }
          }
          config?.commands?.[command]?.execute(state);
        });
      }
    } else if (e.key === "Backspace" && node.state.data?.text === "") {
      e.preventDefault();
      runWithOwner(owner, () => {
        config?.commands?.removeBlock?.execute(state);
      });
    }
  };
  const onKeyUp = () => {
    setState(
      produce((draft) => {
        draft.keyUp = true;
        draft.keyDown = false;
      })
    );
  };
  const onMouseDown = () => {
    setState(
      produce((draft) => {
        draft.mouseDown = true;
        draft.mouseUp = false;
      })
    );
  };
  const onMouseUp = () => {
    setState(
      produce((draft) => {
        draft.mouseUp = true;
        draft.mouseDown = false;
      })
    );
  };

  const innerHTML = untrack(() => node.state.data?.text);

  return (
    <HeadlessTextContext.Provider value={state}>
      {props.children(
        {
          get component() {
            return node.data?.tag ?? "p";
          },
          contentEditable: true,
          onInput,
          onKeyDown,
          onKeyUp,
          onMouseDown,
          onMouseUp,
          get innerHTML() {
            return innerHTML;
          },
        },
        (ref: HTMLElement) => {
          node.ref = ref;
        }
      )}
    </HeadlessTextContext.Provider>
  );
}

export const textPatterns: Record<string, RegExp> = {
  slashCommand: /\/(\w+)(?:\s|$)/,
  heading: /^#{1,6}\s/m,
};

type TextPatterns = {
  [key: keyof typeof textPatterns]: string | undefined;
};

export function parseText(text: string) {
  const result: TextPatterns = {};
  for (const [name, regex] of Object.entries(textPatterns)) {
    const match = regex.test(text);
    result[name] = match ? regex.exec(text)?.[1] : undefined;
  }
  return result;
}
