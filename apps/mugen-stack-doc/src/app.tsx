import { Box, MugenCore } from "@mugen/core";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";

export default function App() {
  return (
    <MugenCore>
      <Router
        root={(props) => (
          <Box class="min-h-[100svh] flex flex-col">
            <Nav />
            <Suspense>{props.children}</Suspense>
          </Box>
        )}
      >
        <FileRoutes />
      </Router>
    </MugenCore>
  );
}
