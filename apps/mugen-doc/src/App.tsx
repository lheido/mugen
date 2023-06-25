import type { Component } from "solid-js";

import { useRoutes } from "@solidjs/router";
import { routes } from "./app.routing";

const App: Component = () => {
  const Routes = useRoutes(routes);
  return <Routes />;
};

export default App;
