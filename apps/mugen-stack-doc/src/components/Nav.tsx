import { Box, List } from "@mugen/core";
import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  const items = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
  ];
  return (
    <Box as="nav" class="bg-primary text-primary-content">
      <List each={items} class="container flex items-center p-3">
        {(item) => (
          <Box
            class="border-b-2 mx-1.5 sm:mx-6 hover:border-accent"
            classList={{
              "border-accent": item.href === location.pathname,
            }}
          >
            <Box as="a" href={item.href}>
              {item.title}
            </Box>
          </Box>
        )}
      </List>
    </Box>
  );
}
