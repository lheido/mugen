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
    path: "/empty",
    component: lazy(() => import("./pages/Empty")),
  },
];
