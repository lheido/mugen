import { ThemeDescription, ThemeElementApi } from "mugen/theme";
import { Component } from "solid-js";

import { useRoutes } from "@solidjs/router";
import { routes } from "./app.routing";

const reuseStyle: ThemeElementApi<ThemeDescription> = {
  padding: "4",
  background: "primary",
};

const App: Component = () => {
  const Routes = useRoutes(routes);
  return <Routes />;
};

export default App;
