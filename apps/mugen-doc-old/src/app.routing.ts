import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
  },
  {
    path: "/home2",
    component: lazy(() => import("./pages/Home2")),
  },
  {
    path: "/home-v2",
    component: lazy(() => import("./pages/HomeV2")),
  },
];
