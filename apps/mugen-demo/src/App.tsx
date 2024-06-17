import { Modifier, darkTheme } from "@mugen/theme";
import { onMount, type Component } from "solid-js";

const App: Component = () => {
  onMount(() => {
    document.body.classList.add(darkTheme);
  });

  return (
    <div
      class={Modifier.surface("base")
        .spacing({ top: 10 })
        .spacing({ x: 10 })
        .gap(16)
        .justify("space-between")
        .toString()}
    >
      <span>Lorem ipsum</span>
      <span>dolore sit amet</span>
    </div>
  );
};

export default App;
