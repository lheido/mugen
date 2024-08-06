import {
  EditableTextBlock as HeadlessEditableTextBlock,
  TextBlock as HeadlessTextBlock,
  useNode,
  useText,
} from "@kitae/core";
import { Box, createPopover, Popover } from "@mugen/core";
import { createFloatingUI, flip, offset, shift } from "@mugen/core/floating-ui";
import { createEffect, on } from "solid-js";
import { Dynamic } from "solid-js/web";
import { BlockAdd } from "./ui/BlockAdd";

export function TextBlock() {
  return (
    <HeadlessTextBlock>
      {(props, setRef) => <Dynamic {...props} ref={setRef} class="px-4 py-2" />}
    </HeadlessTextBlock>
  );
}

export function EditableTextBlock() {
  return (
    <Box as="section" class="group flex relative">
      <Box
        as="aside"
        class="flex pt-1 gap-1 transition-all duration-200 opacity-0 group-hover:opacity-100 focus-within:opacity-100 group-focus-within:opacity-100"
      >
        <BlockAdd />
      </Box>
      <HeadlessEditableTextBlock>
        {(props, setRef) => (
          <>
            <Dynamic
              {...props}
              ref={setRef}
              class="flex-1 px-2 py-2 outline-none"
            />
            <Toolbar />
          </>
        )}
      </HeadlessEditableTextBlock>
    </Box>
  );
}

function Toolbar() {
  const text = useText();
  const popover = createPopover();
  const node = useNode();
  const position = createFloatingUI(
    () => node?.ref!,
    () => popover.state.ref!,
    {
      placement: "top",
      middleware: [offset(8), flip(), shift()],
    }
  );
  createEffect(
    on(
      () => [text?.selection, text?.mouseUp] as const,
      ([selection, mouseUp]) => {
        const shouldShow = selection && !selection.isCollapsed && mouseUp;
        const shouldHide = !selection && popover.state.opened;
        if (shouldShow) popover.show();
        else if (shouldHide) popover.hide();
      }
    )
  );
  return (
    <Popover store={popover}>
      {(props, setRef) => (
        <Box {...props} onRef={setRef} class="m-0 relative">
          Toolbar
          <Box onClick={() => console.log("action!")}>Action</Box>
        </Box>
      )}
    </Popover>
  );
}
