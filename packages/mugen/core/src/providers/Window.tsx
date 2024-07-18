import {
  FlowProps,
  createContext,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";

export type WindowState = {
  width?: number;
  height?: number;
};

const windowContext = createContext<WindowState>();

export function useWindow() {
  return useContext(windowContext) as WindowState;
}

export function Window(props: FlowProps) {
  const [state, setState] = createStore<WindowState>({});
  if (!isServer) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setState({ width, height });
      }
    });
    onMount(() => resizeObserver.observe(document.body));
    onCleanup(() => resizeObserver.disconnect());
  }

  return (
    <windowContext.Provider value={state}>
      {props.children}
    </windowContext.Provider>
  );
}
