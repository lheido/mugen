import { Heading } from "mugen/ui";
import { JSX } from "solid-js";

export function H1(props: { children: JSX.Element }) {
  return (
    <Heading
      as="h1"
      theme={{ font: { size: "2xl", weight: "bold" }, color: "primary" }}
      {...props}
    />
  );
}
