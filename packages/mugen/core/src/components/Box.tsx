import {
  ComponentProps,
  JSX,
  onMount,
  splitProps,
  ValidComponent,
} from "solid-js";
import { Dynamic, DynamicProps } from "solid-js/web";
import {
  createSemanticNode,
  SEMANTIC_ERROR,
  SEMANTIC_REQUIRED_CHILD_TAG,
  SemanticNode,
} from "../semantic";

export type BoxDirective = (elt: HTMLElement, node: SemanticNode) => void;

export type BoxProps<T extends ValidComponent> = Omit<
  DynamicProps<T, ComponentProps<T>>,
  "component"
> & {
  as?: T | keyof JSX.HTMLElementTags | undefined;
  use?: BoxDirective[] | BoxDirective | undefined;
  ref?: ((el: HTMLElement) => void) | undefined;
};

export function Box<T extends ValidComponent = "div">(props: BoxProps<T>) {
  let ref!: HTMLElement;
  const [local, others] = splitProps(props, ["as", "use", "ref"]);
  const as = () => {
    if (!local.as) {
      if (props.onClick !== undefined) return "button";
    }
    return local.as;
  };
  const semanticNode = createSemanticNode(as, props);
  if (import.meta.env.DEV) {
    onMount(() => {
      if (semanticNode.error) {
        switch (semanticNode.error) {
          case SEMANTIC_ERROR.REQUIRED_CHILD:
            const expected =
              SEMANTIC_REQUIRED_CHILD_TAG[semanticNode.parent?.type!];
            if (semanticNode.type !== expected) {
              console.warn(
                `Box inside a "${semanticNode.parent?.type}" must be a "${expected}" instead of "${semanticNode.type}"`,
                ref
              );
            }
            break;
          case SEMANTIC_ERROR.NON_NESTABLE:
            console.error(`"${local.as}" cannot be nested.`, ref);
            break;
        }
      }
    });
  }
  const onRef = (el: HTMLElement) => {
    ref = el;
    if (local.use) {
      const directives: BoxDirective[] = Array.isArray(local.use)
        ? local.use
        : [local.use];
      for (const directive of directives) {
        directive(el, semanticNode);
      }
    }
    if (local.ref) local.ref(el);
  };
  return (
    <SemanticNode node={semanticNode}>
      <Dynamic ref={onRef} component={semanticNode.type} {...others} />
    </SemanticNode>
  );
}