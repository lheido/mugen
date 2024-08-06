import { createEffect, mergeProps } from "solid-js";
import {
  createNode,
  Node,
  NodeChildren,
  NodeData,
  NodeProvider,
  NodeTypeContextValue,
  NodeTypeProvider,
} from "../tree";
import { EditorConfig, EditorConfigProvider } from "./Config";
import { createHistory, HistoryProvider } from "./History";
import { defaultEditorConfig } from "./defaultConfig";

export type KitaeEditorProps = {
  data: NodeData | NodeData[];
  blocks: NodeTypeContextValue;
  config?: EditorConfig;
};

export function KitaeEditor(props: KitaeEditorProps) {
  const _props = mergeProps({ config: defaultEditorConfig }, props);
  const root = createNode({
    type: "root",
    children: Array.isArray(props.data) ? props.data : [props.data],
  });
  const history = createHistory();
  createEffect(() => {
    Object.keys(_props.blocks).forEach((key) => {
      if (_props.config && _props.config.commands) {
        // Register "meta" commands according to block types.
        _props.config.commands[key] = {
          execute: () => {
            _props.config.commands?.transformBlock?.execute(key);
          },
        };
      }
    });
  });
  return (
    <EditorConfigProvider config={_props.config}>
      <HistoryProvider value={history}>
        <NodeTypeProvider context={props.blocks}>
          <NodeProvider context={root}>
            <NodeChildren>{() => <Node />}</NodeChildren>
          </NodeProvider>
        </NodeTypeProvider>
      </HistoryProvider>
    </EditorConfigProvider>
  );
}
