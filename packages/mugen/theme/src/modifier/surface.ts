import { Accessor } from "solid-js";
import { SurfaceColors, surfaceVariants } from "../framework/surface.css";
import { ModifierResult } from "./modifier.type";

export function surface(
  color: SurfaceColors,
  when?: Accessor<boolean>
): ModifierResult {
  return { classList: { [surfaceVariants[color]]: when ?? true } };
}
