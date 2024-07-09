import {
  Accessor,
  createContext,
  createSignal,
  FlowProps,
  JSX,
  onCleanup,
  useContext,
} from "solid-js";

export type HTML_TAGS = keyof JSX.IntrinsicElements;

export const SEMANTIC_REQUIRED_CHILD_TAG: Partial<
  Record<HTML_TAGS, HTML_TAGS>
> = {
  ul: "li",
  ol: "li",
};
export const SEMANTIC_SELF_NON_NESTABLE_TAG: HTML_TAGS[] = [
  "button",
  "a",
  "picture",
  "img",
  "input",
  "textarea",
  "canvas",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "footer",
  "main",
];
export const SEMANTIC_NON_NESTABLE_TAG: Partial<
  Record<HTML_TAGS, HTML_TAGS[]>
> = {
  button: ["button", "a"],
  a: ["button", "a"],
  h1: ["h1", "h2", "h3", "h4", "h5", "h6"],
  h2: ["h1", "h2", "h3", "h4", "h5", "h6"],
  h3: ["h1", "h2", "h3", "h4", "h5", "h6"],
  h4: ["h1", "h2", "h3", "h4", "h5", "h6"],
  h5: ["h1", "h2", "h3", "h4", "h5", "h6"],
  h6: ["h1", "h2", "h3", "h4", "h5", "h6"],
};

export enum SEMANTIC_ERROR {
  REQUIRED_CHILD = "required-child",
  NON_NESTABLE = "non-nestable",
}

export type SemanticNode = {
  readonly type: HTML_TAGS;
  readonly parent: SemanticNode | undefined;
  readonly error?: SEMANTIC_ERROR;
  children: SemanticNode[];
  addChild: (child: SemanticNode) => void;
  removeChild: (child: SemanticNode) => void;
};

const SemanticContext = createContext<SemanticNode>();

export function useSemantic() {
  return useContext(SemanticContext);
}

export function validateType(
  type: HTML_TAGS,
  parent?: SemanticNode
): null | { reason: string } {
  if (!parent) return null;
  if (
    SEMANTIC_REQUIRED_CHILD_TAG[parent.type] !== undefined &&
    SEMANTIC_REQUIRED_CHILD_TAG[parent.type] !== type
  )
    return { reason: SEMANTIC_ERROR.REQUIRED_CHILD };
  if (SEMANTIC_SELF_NON_NESTABLE_TAG.includes(type)) {
    let currentParent: SemanticNode | undefined = parent;
    while (currentParent) {
      if (currentParent.type === type) {
        return { reason: SEMANTIC_ERROR.NON_NESTABLE };
      }
      currentParent = currentParent.parent;
    }
  }
  if (SEMANTIC_NON_NESTABLE_TAG[type] !== undefined) {
    let currentParent: SemanticNode | undefined = parent;
    while (currentParent) {
      if (SEMANTIC_NON_NESTABLE_TAG[type]!.includes(currentParent.type)) {
        return { reason: SEMANTIC_ERROR.NON_NESTABLE };
      }
      currentParent = currentParent.parent;
    }
  }
  return null;
}

export function createSemanticNode(
  type: HTML_TAGS | Accessor<HTML_TAGS | undefined> | undefined,
  props: any
): SemanticNode {
  const parent = useSemantic();
  const [children, setChildren] = createSignal<SemanticNode[]>([]);
  const node: SemanticNode = {
    get type() {
      const _type = typeof type === "function" ? type() : type;
      const error = validateType(_type ?? "div", parent);
      if (!error) return _type ?? "div";
      (this as any).error = error.reason;
      if (error.reason === SEMANTIC_ERROR.REQUIRED_CHILD) {
        if (_type === undefined) {
          (this as any).error = undefined;
          return SEMANTIC_REQUIRED_CHILD_TAG[parent!.type!]!;
        }
        return _type;
      }
      if (error.reason === SEMANTIC_ERROR.NON_NESTABLE) {
        return _type ?? "div";
      }
      return _type ?? "div";
    },
    get parent() {
      return parent;
    },
    get children() {
      return children();
    },
    addChild(child: SemanticNode) {
      setChildren((prev) => [...prev, child]);
    },
    removeChild(child: SemanticNode) {
      setChildren((prev) => prev.filter((c) => c !== child));
    },
  };
  if (parent) {
    parent.addChild(node);
  }
  onCleanup(() => {
    if (parent) {
      parent.removeChild(node);
    }
  });
  return node;
}

export function SemanticNode(props: FlowProps<{ node: SemanticNode }>) {
  return (
    <SemanticContext.Provider value={props.node}>
      {props.children}
    </SemanticContext.Provider>
  );
}
