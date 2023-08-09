import { ComponentProps } from "solid-js";
import { useMugenThemeContext } from "../context";

export const ThemeConsumer = (props: ComponentProps<"div">) => {
  const theme = useMugenThemeContext();
  const handlers = theme.consumeAvailable();
  return (
    <div
      class={handlers
        .reduce((acc, handler) => [...acc, ...handler()], [] as string[])
        .join(" ")}
      {...props}
    />
  );
};
