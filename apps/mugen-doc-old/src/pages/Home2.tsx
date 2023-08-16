import { Component, For } from "solid-js";

const Home: Component = () => {
  console.time("Home2");
  const result = (
    <div style="padding: 8px;">
      <h1>Mugen UI</h1>
      <p>
        An UI toolkit that provides low level components to build app faster and
        easier. Also bring to us a typed, but simple way to embrace design
        systems !
      </p>
      <p>
        No need to worry about CSS or semantic/A11y HTML as the toolkit handles
        that for us.
      </p>
      <p>
        CSS is generated dynamically at lightning speed using an incredibly
        small amount of code.
      </p>
      <p>It suggests the appropriate semantics or accessibility standards.</p>

      <ul style="padding: 8px; display: flex; gap: 8px;">
        <For each={["1", "2", "3", "4", "5"]}>
          {(item, i) => (
            <li style="display: contents">
              <p
                style={{
                  "flex-grow": i() === 0 ? 1 : 0,
                  "flex-basis": "64px",
                }}
              >
                {item}
              </p>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
  console.timeEnd("Home2");
  return result;
};

export default Home;
