import { ComponentProps } from "solid-js";
import { useMugenThemeContext } from "../context";

export const ThemeConsumer = (props: ComponentProps<"div">) => {
  const theme = useMugenThemeContext();
  const handlers = theme.consumeAvailable();
  const classes = () => {
    const cls = handlers
      .reduce((acc, handler) => [...acc, ...handler()], [] as string[])
      .join(" ");
    return cls;
  };
  return <div class={classes()} {...props} />;
};
