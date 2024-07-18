import { Box } from "@mugen/core";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <Box
      class="rounded-full btn btn-main py-8 px-24"
      onClick={() => setCount(count() + 1)}
    >
      Clicks: {count()}
    </Box>
  );
}
