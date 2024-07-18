import { Box, Text } from "@mugen/core";
import { A } from "@solidjs/router";
import Counter from "~/components/Counter";

export default function Home() {
  return (
    <Box as="main" class="text-center mx-auto p-4">
      <Box
        as="h1"
        class="max-6-xs text-6xl text-primary font-thin uppercase my-16"
      >
        Hello world!
      </Box>
      <Counter />
      <Text class="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-accent hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </Text>
      <Text class="my-4">
        <Text>Home</Text>
        {" - "}
        <A href="/about" class="hover:border-b-accent">
          About Page
        </A>{" "}
      </Text>
    </Box>
  );
}
