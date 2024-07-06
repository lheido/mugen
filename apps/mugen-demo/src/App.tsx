import { For, type Component } from "solid-js";

const App: Component = () => {
  const items = Array.from({ length: 5000 }, (_, i) => i + 1);

  function Item(props: { item: number }) {
    return (
      <li class="rounded-lg bg-surface-1 text-surface-1-content p-4 flex gap-4 items-center">
        <div class="bg-primary rounded-full p-4 aspect-square" />
        <div class="text-lg flex-1 bg-gray-100 rounded px-4 py-2">
          {props.item}
        </div>
      </li>
    );
  }

  return (
    <>
      <div class="bg-primary sticky top-0 text-primary-content rounded-b-xl px-4 pt-10 pb-4 md:pt-16 gap-4 md:gap-10 lg:gap-16 flex content-between items-center">
        <div class="bg-primary-variant rounded-lg px-4 py-2">Lorem ipsum</div>
        <div class="border border-primary-border rounded-lg px-4 py-2">
          dolore sit amet
        </div>
      </div>
      <ul class="p-4 flex flex-col gap-3">
        <For each={items}>{(item) => <Item item={item} />}</For>
      </ul>
    </>
  );
};

export default App;
