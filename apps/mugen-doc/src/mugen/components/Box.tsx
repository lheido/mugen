import { FlowProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useMugenSemanticContext } from "../semantic";
import { useMugenThemeContext } from "../theme";
import { GlobalAttributes } from "../types";

export type BoxProps = GlobalAttributes;

export const Box = (props: FlowProps & BoxProps) => {
  const theme = useMugenThemeContext();
  const semantic = useMugenSemanticContext();
  const component = semantic?.as ?? "div";
  semantic.as = undefined;
  const handlers = theme.consumeAvailable();
  const classes = () => {
    const cls = handlers.reduce((acc, handler) => ({ ...acc, ...handler() }), {} as Record<string, boolean>);
    return cls;
  };
  return <Dynamic component={component} id={props.id} classList={classes()} {...props} />;
};
