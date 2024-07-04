import { Box, Modifier, darkTheme } from "@mugen/theme";
import { For, onMount, type Component } from "solid-js";

const App: Component = () => {
  const items = Array.from({ length: 5000 }, (_, i) => i + 1);

  onMount(() => {
    document.body.classList.add(darkTheme);
  });

  const textModifier = Modifier.spacing({
    left: 6,
    right: 6,
    top: 2,
    bottom: 2,
  }).rounded("lg");

  const ulModifier = Modifier.spacing(4).direction("column");
  const itemModifier = Modifier.rounded("lg").spacing(4).gap(4).align("center");
  const countModifier = Modifier.surface("primary").rounded("full").spacing(2);
  const itemLabelModifier = Modifier.fill();

  function Item(props: { item: any }) {
    return (
      // <li
      //   classList={itemModifier.buildClassList()}
      //   style={itemModifier.buildStyle()}
      // >
      //   <div
      //     classList={countModifier.buildClassList()}
      //     style={countModifier.buildStyle()}
      //   />
      //   <div
      //     classList={itemLabelModifier.buildClassList()}
      //     style={itemLabelModifier.buildStyle()}
      //   >
      //     {props.item}
      //   </div>
      // </li>
      <Box as="li" modifier={itemModifier}>
        <Box modifier={countModifier}>
          <Box>{props.item}</Box>
        </Box>
        <Box modifier={itemLabelModifier}>item</Box>
      </Box>
    );
  }

  const fooo = Modifier.spacing(4);

  return (
    <>
      {/* <div classList={fooo.buildClassList()} style={fooo.buildStyle()}>
        Lorem ipsum
      </div>
      <ul
        classList={ulModifier.buildClassList()}
        style={ulModifier.buildStyle()}
      >
        <For each={items}>{(item) => <Item item={item} />}</For>
      </ul> */}
      <Box
        modifier={Modifier.surface("primary")
          .rounded({ bottomLeft: "xl", bottomRight: "xl" })
          .relative()
          .spacing({ left: 4, right: 4, top: 10, bottom: 4, md: { top: 16 } })
          .gap(4)
          .gap({ md: 10, lg: 16 })
          .justify("space-between")
          .align("center")}
      >
        <Box modifier={textModifier.clone().fill().surface("warning")}>
          Lorem ipsum
        </Box>
        <Box modifier={textModifier.clone().surface("secondary")}>
          dolore sit amet
        </Box>
      </Box>
      <Box as="ul" modifier={ulModifier}>
        <For each={items}>{(item) => <Item item={item} />}</For>
      </Box>
    </>
  );
};

export default App;
