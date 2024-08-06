import {
  createNode,
  Node,
  NodeChildren,
  NodeData,
  NodeProvider,
  NodeTypeContextValue,
  NodeTypeProvider,
} from "../tree";

export type KitaeRendererProps = {
  data: NodeData | NodeData[];
  blocks: NodeTypeContextValue;
};

export function KitaeRenderer(props: KitaeRendererProps) {
  const root = createNode({
    type: "root",
    children: Array.isArray(props.data) ? props.data : [props.data],
  });
  return (
    <NodeTypeProvider context={props.blocks}>
      <NodeProvider context={root}>
        <NodeChildren>{() => <Node />}</NodeChildren>
      </NodeProvider>
    </NodeTypeProvider>
  );
}
