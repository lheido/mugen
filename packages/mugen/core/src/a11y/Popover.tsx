import { ComponentProps, createContext, JSX } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

export type HeadlessPopoverProps = {
  store: PopoverStore;
  children: (
    props: ComponentProps<"div">,
    setRef: (elt: Element) => void
  ) => JSX.Element;
};

export type HeadlessPopoverTriggerProps = {
  store: PopoverStore;
  children: (props: ComponentProps<"div">) => JSX.Element;
};

export type PopoverState = {
  opened: boolean;
  id: string;
  ref?: HTMLElement;
};

export type PopoverStore = {
  state: PopoverState;
  setState: SetStoreFunction<PopoverState>;
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

let PopoverId = 0;

export function createPopover(customId?: string): PopoverStore {
  const [state, setState] = createStore<PopoverState>({
    opened: false,
    id: customId ?? `mugen-popover-${PopoverId++}`,
  });
  return {
    state,
    setState,
    show: () => state.ref?.showPopover(),
    hide: () => state.ref?.hidePopover(),
    toggle: () => state.ref?.togglePopover(),
  };
}

const PopoverContext = createContext<PopoverStore>();

export function Popover(props: HeadlessPopoverProps) {
  return (
    <PopoverContext.Provider value={props.store}>
      {props.children(
        { id: props.store.state.id, popover: "auto" },
        (ref: Element) => {
          (ref as HTMLElement).ontoggle = () =>
            props.store.setState("opened", (opened) => !opened);
          props.store.setState("ref", ref);
        }
      )}
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger(props: HeadlessPopoverTriggerProps) {
  return (
    <PopoverContext.Provider value={props.store}>
      {props.children({
        // @ts-ignore
        popovertarget: props.store.state.id,
      })}
    </PopoverContext.Provider>
  );
}
