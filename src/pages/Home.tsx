import { Box } from "mugen/ui";
import { Component, createSignal, onMount } from "solid-js";

const Home: Component = () => {
  const [light, setLight] = createSignal(true);
  onMount(() => {
    setTimeout(() => {
      setLight((prev) => !prev);
    }, 1000);
  });
  return (
    <Box
      theme={{
        background: "primary",
        color: "primary-content",
        padding: "4",
        relative: {
          t: "4",
        },
        hover: {
          background: "primary-focus",
          padding: "2",
          relative: { t: "2" },
        },
        light: light(),
      }}
    >
      <h2>Home</h2>
    </Box>
  );
};

export default Home;
