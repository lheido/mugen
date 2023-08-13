import { FlowProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useMugenSemanticContext } from "../semantic";
import { useMugenThemeContext } from "../theme";

export const Box = (props: FlowProps & { id?: string }) => {
  const theme = useMugenThemeContext();
  const semantic = useMugenSemanticContext();
  const component = semantic?.as ?? "div";
  semantic.as = undefined;
  const handlers = theme.consumeAvailable();
  const classes = () => {
    const cls = handlers.reduce((acc, handler) => [...acc, ...handler()], [] as string[]).join(" ");
    return cls;
  };
  return <Dynamic component={component} id={props.id} class={classes()} {...props} />;
};
